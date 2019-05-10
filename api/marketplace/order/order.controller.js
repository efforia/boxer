/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Order controller.
 */

// --------------- Module Imports
const Order = require("./order.model");
const User = require("../../user/user.model");
const ReceivingMode = require("./receiving-mode.model");
const PaymentMode = require("./payment-mode.model");
const Notification = require("../../notification/notification.model");
const notificationCtrl = require("../../notification/notification.controller.js");
const socket = require("../../utils/socket.utils")();
const email = require("../../email/email.controller");
const currencyFormatter = require("currency-formatter");
const env = require("../../../.env/index");
const project = require("../../../.mars/project");
const locales = require("../../../.mars/locales/pt");
const MerchantCtrl = require("../merchant/merchant.controller.js");

// --------------- Module functions
const pad = (num) => {
    num = parseInt(num);
    return (num < 10) ? "0" + num.toString() : num.toString();
};

// --------------- Module controller
const OrderCtrl = module.exports = {
    create: async function (user, order) {
        order.customer = user; // Adds the user to the order
        order = (await Order.create(order)); // Assigns the amount calculated to the order
        return order;// Returns the created order to the front end
    },

    readyOrders: async function () {
      orders = (await Order.find({ 'status': 'created' }));
      return orders;
    },

    notifyUsersAbout: async function (order) {
        order = await OrderCtrl.format(order.toObject()); // Formats order properly
        let merchant = await User.findOne({ _id: order.merchant }); // Gets order merchant
        let customer = await User.findOne({ _id: order.customer }); // Gets order customer
        let options = { order: order, customer: customer, merchant: merchant }; // Sets order information for the notification
        switch (order.status) { // Based on the order status
            case "created": // In case the order has just been created
                options.orderStatus = locales.created_order; // Sends the order status locale
                options.title = locales.you_have_received_a_new_order; // With the order status title
                options.message = locales.you_have_received_a_new_order_message.replace("CUSTOMER_NAME", customer.name.split(" ")[0]); // And the information about the order status update
                options.orderEvent = "new order"; // And the push notification/socket event
                options.to = merchant; // To the merchant
                options.user = customer; // From the customer
                break;
            case "accepted": // In case the order has been accepted by the merchant
                options.orderStatus = locales.accepted_order; // Sends the order status locale
                options.title = locales.your_order_has_been_confirmed; // With the order status title
                options.message = locales.your_order_has_been_confirmed_message.replace("MERCHANT_NAME", merchant.name); // And the information about the order status update
                options.orderEvent = "order review"; // And the push notification/socket event
                options.to = customer; // To the customer
                options.user = merchant; // From the merchant
                break;
            case "started": // In case the order has been accepted by the merchant
                options.orderStatus = locales.accepted_order; // Sends the order status locale
                options.title = locales.your_order_has_started; // With the order status title
                options.message = locales.your_order_has_started_message.replace("MERCHANT_NAME", merchant.name); // And the information about the order status update
                options.orderEvent = "order review"; // And the push notification/socket event
                options.to = customer; // To the customer
                options.user = merchant; // From the merchant
                break;
            case "canceled": // In case the order has been cancelled by the merchant
                options.orderStatus = locales.canceled_order; // Sends the order status locale
                options.title = locales.your_order_has_been_canceled;  // With the order status title
                options.message = locales.your_order_has_been_canceled_message.replace("MERCHANT_NAME", merchant.name); // And the information about the order status update
                options.orderEvent = "order review"; // And the push notification/socket event
                options.to = customer; // To the customer
                options.user = merchant; // From the merchant
                break;
        };
        let notification = await (Notification.create({ // Creates the notification
            title: options.title, // With the provided title
            to: options.to._id, // With the provided destinatary
            pictureUrl: `${env.SERVER_ADDRESS}/picture/${options.to._id}`, // With the user picture
            data: { type: env.ORDER_NOTIFICATION, order: order._id } // And the order information
        }));
        socket.emit(options.orderEvent, Object.assign({ room: options.to._id }, notification)); // Sends the notification
        return OrderCtrl.sendOrderMail(order, options); // And the order e-mail
    },
    sendOrderMail: async function (order, options) {
        let mail = { // Intializes the e-mail
            from: `${project.display_name} <${project.contact_email}>`, // From the project mailer account
            subject: `${options.title}`, // With the order update proper title
            template: "order-update", // Using the generic order update template
            to: [options.to.email, project.accounts_email], // To the destinatary and the project admin
            context: Object.assign(options, { // With the context variables
                items: options.order.items, // Inclusding the items
                user: options.user, // The user that triggered the action
                viewerIsMerchant: options.to.__t == "Merchant", // In case the e-mail receiver will be a merchant
                viewerIsCustomer: options.to.__t == "Customer", // In case the e-mail receiver will be a customer
                orderLink: `${env.SERVER_ADDRESS}/job-details/${order._id}` // And, of course, the order link
            })
        };
        return email.send(mail); // Sends the e-mail and returns it
    },
    cancel: async function (id) {
        let order = await Order.findOneAndUpdate({ _id: id }, { $set: { status: "canceled" } }).populate("customer merchant items.information"); // Sets the status as cancelled
        await (OrderCtrl.notifyUsersAbout(order)); // Notifties the users
        return order; // Returns the cancelled order
    },
    accept: async function (user, id) {
        let order = await Order.findOneAndUpdate({ _id: id }, { $set: { status: "accepted", merchant: merchant._id, acceptedAt: new Date() } }, { new: true }).populate("customer merchant items.information");   // Updates order
        await (OrderCtrl.notifyUsersAbout(order)); // Notifies users
        return order; // Returns order
    },
    finish: async function (user, id) {
        let order = await Order.findOneAndUpdate({ _id: id }, { $set: { status: "finished", merchant: merchant._id, finishedAt: new Date() } }, { new: true }).populate("customer merchant items.information");   // Updates order
        await (OrderCtrl.notifyUsersAbout(order)); // Notifies users
        return order; // Returns order
    },
    setAmount: async (orderId, amount) => {
        let updated = await Order.findOneAndUpdate({ _id: orderId }, { amount: amount }); // Sets order amount
        return updated; // Returns updated order
    },
    rate: async function (user, id, rate) {
        let ratings = {}; // Initializes ratings object
        let role = user.__t; // Checks user role
        if (role == "Merchant") ratings.merchantRate = rate; // Merchant rating the user
        else ratings.customerRate = rate; // User rating the merchant
        let order = await Order.findOneAndUpdate({ _id: id }, { $set: { ratings: ratings } }); // Customer rating update
        if (role == "Customer") MerchantCtrl.updateRating(order.merchant); // Merchant rating update
        return order; // Returns confirmation
    },
    getOrdersByUserId: async function (user, status) {
        let criteria = { $or: [{ customer: user }, { merchant: user }] }; // Gets orders for customers and merchants conditionally
        if (status) Object.assign(criteria, { status: status }); // Filter for order status if required
        let orders = await Order.find(criteria).sort({ createdAt: -1 }).populate("customer merchant items.information").lean(); // Gets orders list
        return orders; // Returns orders list
    },
    getOrdersByDatesAndUserId: async function (user, startDate, endDate, status) {
        user = user._id; // Gets session user
        let criteria = { $or: [{ customer: user }, { merchant: user }] }; // Initializes query criteria
        if (status) Object.assign(criteria, { status: status }); //  Filter for order status if required
        let dates = {}, date, key, value; // Initializes dates loop variables
        let orders = (await Order.aggregate({ // Group orders by date
            $group: {
                _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" }, day: { $dayOfMonth: "$createdAt" } }, // For every id, get year, month and day
                count: { $sum: 1 } // And add an count variable to it
            }
        })).map((x) => { // For every date
            date = x._id; // Gets the date with year, month and day properties
            dates.push({
                date: `${pad(date.day)}/${pad(date.month)}`, // Generates the label as (DD-MM)
                count: x.count  // Gets the date orders count
            }); //  Sets it on the dates object
        });
        return dates; // Returns the formatted dates
    },
    getById: async function (user, id) {
        let requesterIsCustomer = user.__t == "Customer"; // Checks which is the user role
        let order = await Order.findOne({ _id: id }).populate("customer merchant items.information").lean(); // Gets the order
        order.ratings = order.ratings || {}; // Gets the order ratings
        order.rating = requesterIsCustomer ? order.ratings.customerRate : order.ratings.merchantRate; // Filters the rating by user role
        delete order.ratings; // Deletes original ratings property
        return order; // Returns order
    },
    getOrdersByDates: async function (merchant, startDate, endDate) {
        let orders = await Order.find({ merchant: merchant._id, status: "created", $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }] }) // Gets orders within specified time range
            .sort({ createdAt: -1 }).populate("customer merchant items.information").lean(); // And sorted by date
        return orders; // Returns the orders
    },
    listReceivingModes: async function () {
        return await ReceivingMode.find({}); // Returns order receiving modes
    },
    listPaymentModes: async function () {
        return await PaymentMode.find({}).lean();
    },
    calculateAmount: async function (data) {
        let subtotal = 0.00; // Declares subtotal variable
        (data.items || []).map((item) => { // For each order item
            item.total = (item.discountPrice || item.price) * item.quantity; // Adds the item price multiplied by the item quantity
            subtotal += item.total; // And adds it to the subtotal (items price only, not including taxes, delivery, etc.)
        });
        let amount = { subtotal: subtotal }; // Declares amount object
        if (data.receivingMode == "DELIVERY") { // In case the order have delivery taxes
            let merchant = (await User.findOne({ _id: data.merchant })); // Gets the merchant data
            amount.deliveryTax = merchant.delivery.tax; // Sets the delivery tax
        };
        amount.total = subtotal + (amount.deliveryTax || 0.00); // Sums up the subtotals
        return amount; // Return amount
    },
    format: async function (order) {
        order.items.map((item) => { // For every item
            item.discountPrice = currencyFormatter.format(item.discountPrice, { locale: "pt-BR" }); // Formats as locale currency
            item.price = currencyFormatter.format(item.price, { locale: "pt-BR" }); // Formats as locale currency
            item.total = currencyFormatter.format(item.total, { locale: "pt-BR" }); // Formats as locale currency
        });
        order.total = currencyFormatter.format(order.total, { locale: "pt-BR" }); // Formats as locale currency
        order.subtotal = currencyFormatter.format(order.subtotal, { locale: "pt-BR" }); // Formats as locale currency
        order.deliveryTax = currencyFormatter.format(order.deliveryTax, { locale: "pt-BR" }); // Formats as locale currency
        order.updated = order.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }); // Formats as locale time
        order.receivingMode = locales[order.receivingMode]; // Sets the proper locale
        order.paymentInstrument = order.paymentInstrument.brand ? locales.via_app : locales[order.paymentInstrument.label]; // Sets the proper locale
        return order; // Returns formatted order
    },
    requestNearby: async function (user, job, latitude, longitude, radius, keyword) {
        let merchants = await MerchantCtrl.nearby(service, latitude, longitude, radius, keyword); // Retrieves the nearby merchants

        if (!(merchants.length > 0)) throw new Error("Whoops! We were unable to find any merchants based on the provided criteria :("); // In case there ano avaialable merchants, returns error

        let order = await Order.create({ // Creates the order
            customer: user, // With the customer
            merchant: merchant, // The merchant
            items: [job], // The service requested
            service: job // And the proper payload information
        });

        return { order: order, merchants: merchant }; // Returns the created order
    },
    setMerchant: async function (order, merchant) {
        let updated = await Order.findOneAndUpdate({ _id: order }, { merchant: merchant, status: "awaiting_for_confirmation" }).lean(); // Sets order merchant
        return updated; // Returns updated order
    },
    getMerchantSchedule: async function (merchant) {
        return await Schedule.find({ "merchant": merchant._id }); // Returns the scheduled events
    },
    getNearby: async function (latitude, longitude, radius, keyword) {
        let jobs = []; // Initializes the jobs array
        let point = { coordinates: [longitude, latitude], type: 'Point' }; // Formats the coordinates object
        let query = { query: { "status": "created", "job.scheduledTo": { "$gte": new Date() } }, distanceMultiplier: 0.001, spherical: true, lean: true }; // Sets the query parameters
        // if (radius) query.maxDistance = radius; // Sets the radius for the query
        let results = await Order.geoNear(point, query) || []; // Searches for the nearby jobs
        results.map((result) => jobs.push(Object.assign(result.obj, { distance: result.dis ? result.dis.toFixed(1) : undefined }))); // Adds the distance to the results
        return { jobs: jobs }; // Returns nearby jobs list
    },
    startOrder: async function (id) {
        let order = await Order.findOneAndUpdate({ _id: id }, { $set: { status: "started" } }).populate("customer merchant items.information"); // Sets the status as cancelled
        await (OrderCtrl.notifyUsersAbout(order)); // Notifties the users about it
        return order; // Returns the cancelled order
    }
};

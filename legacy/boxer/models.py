import datetime, uuid, hmac, hashlib
from decimal import Decimal

from django.contrib import admin
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from localflavor.us.models import USStateField, PhoneNumberField

from constants import AUCTION_ITEM_CATEGORY_CHOICES, AUCTION_ITEM_STATUS_CHOICES, AUCTION_ITEM_CATEGORY_GENERAL, AUCTION_ITEM_STATUS_IDLE, AUCTION_ITEM_CONDITION_CHOICES, AUCTION_EVENT_SHIPPING_CHOICES, SALES_PAYMENT_STATUS_CHOICES, SALES_PAYMENT_STATUS_PROCESSING, AUCTION_ITEM_STATUS_RUNNING, AUCTION_EVENT_SHIPPING_USPS

import datetime
from django.db import models

class BaseModel(models.Model):
    active = models.BooleanField(default=True)
    created = models.DateTimeField(default=datetime.datetime.now)
    modified = models.DateTimeField(default=datetime.datetime.now)

    def save(self, force_insert=False, force_update=False):
        self.modified = datetime.datetime.now()
        super(BaseModel, self).save(force_insert=False, force_update=False)

    class Meta:
        abstract = True

""" Models for application project """

from django.db import models

class Profile(User):
    address_line_1 = models.CharField(max_length=100)
    address_line_2 = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=50)
    state = USStateField()
    region = models.CharField(max_length=64)
    zipcode = models.CharField(max_length=10)
    phone = PhoneNumberField()
    ranking = models.IntegerField()
    description = models.TextField()
    logo = models.ImageField()
    side = models.IntegerField()
    token = models.CharField(max_length=40, null=True)

    def __unicode__(self):
        return u'%s %s' % (self.first_name, self.last_name)

    def is_seller(self):
        try:
            seller = self.seller
            return True
        except ObjectDoesNotExist, e:
            return False

    @classmethod
    def generate_token(cls):
        binary = uuid.uuid4().bytes
        c = hmac.new(binary, digestmod=hashlib.sha1)
        return c.hexdigest()

class Delivery(BaseModel):
    """ Main delivery model """
    freighter = models.ForeignKey(User, related_name="delivery_freighter", null=True)
    departure_lat = models.FloatField(default=0.0)
    departure_lon = models.FloatField(default=0.0)
    arrival_lat = models.FloatField(default=0.0)
    arrival_lon = models.FloatField(default=0.0)
    deadline = models.DateTimeField(auto_now=True)
    volume = models.FloatField(default=models.NOT_PROVIDED)
    weight = models.FloatField(default=models.NOT_PROVIDED)
    image = models.ImageField(max_length=128)
    title = models.CharField(max_length=128)
    description = models.TextField(default='', blank=True)
    client = models.ForeignKey(User, related_name="delivery_client", null=True)
    value = models.FloatField(default=0.0)
    in_auction = models.BooleanField(default=True)
    def __str__(self):
        return self.title

class Offer(BaseModel):
    # auction_event = models.ForeignKey(AuctionEvent, related_name='bids')
    bidder = models.ForeignKey(User, related_name='offer_bidder')
    delivery = models.ForeignKey(Delivery, related_name='offer_delivery')
    amount = models.DecimalField(default=Decimal('0.00'), max_digits=5, decimal_places=2, help_text=u'All bids are final. Price in US dollars.')

    # def __unicode__(self):
        # return u'Placed on %s by %s' % (self.auction_event.item.title, self.bidder.username)

class Schedule(BaseModel):
    delivery = models.ForeignKey(Delivery, related_name='auction_events')
    schedule_detail = models.CharField(max_length=100, blank=True)
    payment_detail = models.CharField(max_length=200, blank=True)
    start_time = models.DateTimeField(help_text=u'Format (Hour & Minute are optional): 10/25/2006 14:30')
    end_time = models.DateTimeField(help_text=u'Format (Hour & Minute are optional): 10/25/2006 14:30')

    def __unicode__(self):
        return u'%s listed on %s' % (self.item.title, self.start_time)

    def has_started(self):
        return datetime.datetime.now() >= self.start_time

    def has_ended(self):
        return datetime.datetime.now() >= self.end_time

    def is_running(self):
        return self.has_started() and not self.has_ended() and self.item.status == AUCTION_ITEM_STATUS_RUNNING

    def get_shipping_method(self):
        return dict(AUCTION_EVENT_SHIPPING_CHOICES).get(int(self.shipping_method), 'N/A')

    def get_current_price(self):
        current_price = self.starting_price
        bid_count = self.bids.count()
        if bid_count:
            highest_bid = self.bids.order_by('-amount')[0]
            current_price = highest_bid.amount
        return current_price

    def get_time_until_end(self):
        delta = self.end_time - datetime.datetime.now()
        if delta.days < 0:
            return '0 seconds'
        else:
            weeks = delta.days / 7
            days = delta.days % 7
            hours = delta.seconds / 3600
            minutes = (delta.seconds % 3600) / 60
            seconds = (delta.seconds % 3600) % 60

            time_string = ''
            if weeks:
                time_string += '%s weeks ' % weeks
            if days:
                time_string += '%s days ' % days
            if hours:
                time_string += '%s hours ' % hours
            if minutes:
                time_string += '%s minutes ' % minutes
            if seconds:
                time_string += '%s seconds' % seconds

            return time_string

    def is_paid(self):
        return self.sales.count() > 0

    def get_payment_status(self):
        if self.is_paid():
            return dict(SALES_PAYMENT_STATUS_CHOICES).get(self.sales.order_by('-time_created')[0].payment_status)
        else:
            return 'Unpaid'

class Picture(BaseModel):
    delivery = models.ForeignKey(Delivery, related_name='delivery')
    owner = models.ForeignKey(User, related_name='picture')
    image = models.ImageField()

    def __unicode__(self):
        return u'%s' % self.title

# class Seller(BaseModel):
#     user = models.OneToOneField(User, related_name='seller')
#     paypal_email = models.EmailField()
#     default_shipping_method = models.IntegerField(choices=AUCTION_EVENT_SHIPPING_CHOICES, default=AUCTION_EVENT_SHIPPING_USPS)
#     default_shipping_detail = models.CharField(max_length=100, blank=True, null=True)
#     default_payment_detail = models.CharField(max_length=200, blank=True, null=True)
#
#     def __unicode__(self):
#         return u'Seller profile of %s' % self.user.username
#
# class Item(BaseModel):
#     title = models.CharField(max_length=200)
#     description = models.TextField(blank=True)
#     condition = models.IntegerField(choices=AUCTION_ITEM_CONDITION_CHOICES)
#     seller = models.ForeignKey(User, related_name='auction_items')
#     category = models.ForeignKey(ItemCategory, related_name='auction_items')
#     status = models.IntegerField(choices=AUCTION_ITEM_STATUS_CHOICES, default=AUCTION_ITEM_STATUS_IDLE)
#
#     def __unicode__(self):
#         return u'%s' % self.title
#
#     def get_condition(self):
#         return dict(AUCTION_ITEM_CONDITION_CHOICES).get(self.condition, 'N/A')
#
#     def get_status(self):
#         return dict(AUCTION_ITEM_STATUS_CHOICES).get(self.status, 'N/A')
#
# class AuctionEventManager(models.Manager):
#     def get_current_auctions(self):
#         current_time = datetime.datetime.now()
#         return self.filter(item__status=AUCTION_ITEM_STATUS_RUNNING, start_time__lt=current_time, end_time__gt=current_time)
#
# class Sales(BaseModel):
#     auction_event = models.ForeignKey(AuctionEvent, related_name='sales')
#     payment_status = models.IntegerField(choices=SALES_PAYMENT_STATUS_CHOICES, default=SALES_PAYMENT_STATUS_PROCESSING)
#     invoice_number = models.CharField(max_length=200, unique=True)
#
#     def __unicode__(self):
#         return u'Invoice for %s' % self.auction_event

# admin.site.register(AuctionEvent)
# admin.site.register(Bid)
# admin.site.register(Item)
# admin.site.register(ItemCategory)
# admin.site.register(Seller)
# admin.site.register(Sales)
# admin.site.register(User)

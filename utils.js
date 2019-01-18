/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Application utils.
 */

Array.prototype.indexOfObject = function (property, value) {
    if (property.indexOf(".") > -1) console.log(property.split("."));
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][property] === value) return i;
    }
    return -1;
};

String.prototype.getHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

String.prototype.toCPF = function() {
    return this.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
};

String.prototype.numbersOnly = function() {
    return this.replace(/[^\d]/g, "");
};

Date.prototype.fromNow = function () {
    return moment(this).locale('pt-br').fromNow();
}

Array.prototype.indexOfObject = function (property, value) {
    for (let i = 0, len = this.length; i < len; i++) {
        if (this[i] !== null && this[i][property] === value) return i;
    }
    return -1;
}

Array.prototype.containsObjectWith = function (property, value) {
    return this.indexOfObject(property, value) > -1;
}

Number.prototype.toRad = function () {
    return this * Math.PI / 180;
}

String.prototype.contaisNumbers = function () {
    let numbersOnString = this.match(/\d+/g);
    let stringHasNumbers = numbersOnString != null;
    return stringHasNumbers;
}

String.prototype.contains = function (keyword) {
    let stringContainsKeyword = this.indexOf(keyword) > -1;
    return stringContainsKeyword;
}

String.prototype.isValidEmail = function () {
    let emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return emailRegex.test(this);
}

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
        if (txt)
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        else
            return this;
    });
}

String.prototype.removeAccents = function (text) {
    const accentFull = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ';
    const accentFree = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
    let stripped = '';
    for (i = 0; i < text.length; i++) {
        if (accentFull.search(text.substr(i, 1)) >= 0) {
            stripped += accentFree.substr(accentFull.search(text.substr(i, 1)), 1);
        } else {
            stripped += text.substr(i, 1);
        }
    }
    return stripped;
}

String.prototype.toUnderscoreCase = function () {
    return this.replace(/\.?([A-Z]+)/g, function (x, y) { return "_" + y.toLowerCase() }).replace(/^_/, "");
}

String.prototype.toDashCase = function () {
    return this.replace(/\.?([A-Z]+)/g, function (x, y) { return "-" + y.toLowerCase() }).replace(/^-/, "");
}

String.prototype.limitTo = function (limit) {
    return this.substring(0, limit) + ((this.length > limit) ? "..." : "");
}
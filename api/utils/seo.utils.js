const slug = require('slug');

const SEOUtils = module.exports = {

    getSlugFrom: function(name) {
        return name ? slug(name.toLowerCase()) : "";
    }

}
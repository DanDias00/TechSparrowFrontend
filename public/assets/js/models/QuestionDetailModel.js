
var QuestionDetailModel = Backbone.Model.extend({
    urlRoot: 'http://localhost/TechSparrow/api/question/', 

    initialize: function(options) {
        this.id = options.id;
    },

    url: function() {
        return this.urlRoot + this.id;
    }
});

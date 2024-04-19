var QuestionView = Backbone.View.extend({
    template: null, // Template will be loaded on initialize
    
    initialize: function() {
        
    
        var self = this;
        // Load the template
        $.get('assets/html/Question.html', function(templateData) {
            self.template = _.template(templateData);

            self.render();
        });
        
    },
    
    render: function() {
       
        // Ensure the template is loaded
        if (this.template) {
            // Use the model data
            this.$el.html(this.template(this.model.toJSON()));
        }
        return this;
    }
});


var QuestionsView = Backbone.View.extend({
    el: '#app', 

    initialize: function(options) {
        
        document.title = "Tech Sparrow - Questions";
        this.navbarView = options.navbarView|| new NavbarView();
        this.collection = options.collection || new QuestionsCollection();
        this.listenTo(this.collection, 'sync', this.render); // Listen to the sync event to render
        this.listenTo(this.collection, 'reset', this.render); // Listen to the collection's reset event    
        this.listenTo(this.collection, 'error', this.handleError); // Listen to the collection's error event
        this.questionListView = new QuestionsCommonView(); // Create a new instance of the common view
        
        if(this.collection.length === 0) { // If the collection is empty Fetch the collection
        this.collection.fetch();
        }else {
            this.render();
        }

         // Render the navbarView
         if (this.navbarView) {
            this.navbarView.render();
        }
    },

    render: function() {
        this.$el.empty(); // Clear the container
        this.questionListView.render();
        this.$el.append(this.questionListView.el); // Append the common view
        this.collection.each(function(question) { // Render each question
            var questionEl = $('<div class="question-content"></div>').appendTo(this.$el);
            var questionView = new QuestionView({ model: question, el: questionEl });
            questionView.render();
       
        }, this);
        return this;
    },

    handleError: function(collection, response, options) {
        if(response.status === 401) {
            Backbone.history.navigate('login', { trigger: true });
        } else if (response.status === 404) {
            var commonView = new QuestionsCommonView();
            this.$el.append(commonView.render().el);
   
        }else {
            this.showErrorModal("An error occurred while fetching questions.");
    }
    }
});


// QuestionListView.js
var QuestionsCommonView = Backbone.View.extend({
    el: '#app', // Set the container element for the view

    events: {
        'submit .search-form': 'onSearchSubmit',
        'click #all-questions-btn': 'fetchAllQuestions' 
    },

    initialize: function () {
        this.collection = new QuestionsCollection();
      
        this.listenTo(this.collection, 'reset', this.renderQuestionsView);
    },

    render: function () {
        this.$el.html(`
            <div class="common-view">
                <div class="container mt-4">
                    <div class="row align-items-center">
                            <div class="question-header col-6 d-flex justify-content-center">
                                <button id="all-questions-btn" class="btn btn-link">All Questions</button>
                        </div>
                        <div class="ask-header col-6 d-flex justify-content-center">
                            <!-- Search form - updated to have class for event binding -->
                            <form class="search-form d-flex me-2" action="javascript:void(0);">
                                <input type="search" class="form-control search-input" placeholder="Search questions...">
                                <button type="submit" class="btn btn-outline-success ml-2">Search</button>
                            </form>
                            <a href="#ask" class="btn btn-warning">Ask a Question</a>
                        </div>
                    </div>
                </div>
            </div>
        `);
        
        return this;
    },

    onSearchSubmit: function (e) {
        console.log('searching button')
        e.preventDefault(); // Prevent the default form submission behavior
        var query = this.$('.search-input').val().trim(); // Get the search input value
        if (query) {
            this.searchQuestions(query);
            this.$('.search-input').val(''); // Clear the search input
            console.log('rendering done')
            this.render();
            
        }
        
    },
    fetchAllQuestions: function() { //Not working
        // Check for existence before calling render
            if (this.questionsView) {
                this.questionsView.render();
            } else {
                console.error("questionsView is not initialized.");
            }
    },

    searchQuestions: function (query) {
        console.log('Searching for questions:', query);
        this.collection.search(query);
    },
    renderQuestionsView: function() {
        // Render QuestionsView whenever the collection is reset
        // Ensure QuestionsView replaces its content in the DOM correctly
        this.questionsView = new QuestionsView({ collection: this.collection });
        this.questionsView.render();
        
       
        this.$('#question').html(this.questionsView.el); 

    }
});


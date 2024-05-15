// QuestionListView.js
var QuestionsCommonView = Backbone.View.extend({
    el: '#app', // Set the container element for the view

    events: {
        'submit .search-form': 'onSearchSubmit',
        'click #all-questions-btn': 'fetchAllQuestions',
        'click .modal .close': 'hideErrorModal' // Event handler for close button
    },

    initialize: function () {
        this.collection = new QuestionsCollection();
        this.listenTo(this.collection, 'reset', this.renderQuestionsView);
        this.listenTo(this.collection, 'noResultsFound', this.renderNoResultsMessage);
        this.rootEl = $('#app'); // Store the root element for the view
        this.$('#all-questions-btn').hide(); // Hide the clear button
    },

    removeBindedEvents: function () {
        this.rootEl.off(); // Remove all event listeners bound to the root element
    },

    render: function () {
        this.$el.html(`
            <div class="common-view">
            <!-- Bootstrap Modal for Error Messages -->
            <div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-labelledby="errorModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="errorModalLabel">Error</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" id="errorModalBody">
                            <!-- Error message will be rendered here -->
                        </div>
                        <div class="modal-footer">
                        <button id="all-questions-btn" class="close btn btn-warning" data-dismiss="modal" aria-label="Close">Clear Filter</button>
                        </div>
                    </div>
                </div>
            </div>
                <div class="container mt-4">
                    <div class="row align-items-center">
                            <div class="question-header col-6 d-flex justify-content-center">
                            <button id="all-questions-btn" class="btn btn-warning" ">All Questions</button>

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
        e.preventDefault(); // Prevent the default form submission behavior
        var query = this.$('.search-input').val().trim(); // Get the search input value
        if (query) {
            this.searchQuestions(query);
            this.$('.search-input').val(''); // Clear the search input

        }
    },

    fetchAllQuestions: function () {
        var self = this;
        this.collection.fetch({
            reset: true,
            success: function (collection, response) {
                self.renderQuestionsView();
            },
            error: function (collection, response) {
                self.showErrorModal("An error occurred while fetching questions.");
            }
        });
    },

    searchQuestions: function (query) {
        var self = this;
        this.collection.search(query);
    },


    renderQuestionsView: function () {
        // Clear the previous view content
        this.removeBindedEvents();
        this.$el.empty();
        this.QuestionsCommonView = new QuestionsCommonView();
        this.render();
        // Render each question
        this.collection.each(function (question) {
            var questionEl = $('<div class="question-content"></div>').appendTo(this.$el);
            var questionView = new QuestionView({ model: question, el: questionEl });
            questionView.render();
        }, this);
    },


    renderNoResultsMessage: function () {
        errorMessage = 'No results found. Please try another search query.';
        this.collection.reset(); // Reset the collection
        this.showErrorModal(errorMessage);


    },

    showErrorModal: function (errorMessage) {
        // Update modal body with error message
        console.log("Error message: " + errorMessage);
        this.$('#errorModalBody').text(errorMessage);
        // Show the modal
        this.$('#errorModal').modal('show');
    },

    hideErrorModal: function () {
        // Hide the modal
        this.$('#errorModal').modal('hide');
    }
});


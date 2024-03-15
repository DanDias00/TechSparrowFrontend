// QuestionListView.js
var QuestionsCommonView = Backbone.View.extend({
    className: 'question-list-view',

    initialize: function () {
 
    },

    render: function () {

        this.$el.html(`
            <div class="common-view">
                <div class="container mt-4">
                    <div class="row align-items-center">
                        <div class="question-header col-6 d-flex justify-content-center">
                            <h1>All Questions</h1>
                        </div>
                        <div class="ask-header col-6 d-flex justify-content-center">
                            <!-- Search form -->
                            <form action="search" method="get" class="d-flex me-2">
                                <input type="search" name="q" class="form-control" placeholder="Search questions...">
                                <button type="submit" class="btn btn-outline-success ml-2">Search</button>
                            </form>
                            <a href="#ask" class="btn btn-warning">Ask a Question</a>
                        </div>
                    </div>
                </div>
            </div>
        `);
        return this;
    }
});

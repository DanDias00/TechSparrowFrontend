var QuestionModel = Backbone.Model.extend({
    defaults: {
        id: null,
        title: '',
        body: '',
        answer_count: 0,
        username: ''
    }
});
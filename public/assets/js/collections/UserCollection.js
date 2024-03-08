// collections/UserCollection.js
var UserCollection = Backbone.Collection.extend({
    model: UserModel,
    url: 'http://yourdomain.com/api/users'  // The URL to your backend API for users
});

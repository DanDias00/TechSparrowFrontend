var NavbarView = Backbone.View.extend({
    el: '#navbarContainer',

    template: _.template(`
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#questions">Questions</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#contact">Contact</a>
                        </li>
                        <% if (loggedIn) { %>
                            <li class="nav-item">
                                <a class="nav-link" href="#myProfile"><i class="fa fa-user" aria-hidden="true"></i> My Profile</a>
                            </li>
                        <% } %>
                    </ul>
                </div>
                <a class="navbar-brand ms-auto" href="/"><img src="assets/images/sparrow.jpg" alt="logo" height="30"></a>
            </div>
        </nav>
    `),

    initialize: function() {
        // Retrieve session data from local storage or create a new session
        var sessionData = JSON.parse(localStorage.getItem('session')) || { loggedIn: false };
        this.session = new SessionModel(sessionData);
        this.listenTo(this.session, 'change:loggedIn', this.render);
        this.listenTo(this.session, 'change', this.render);
        this.render();
    
        // Listen for changes in local storage
        $(window).on('storage', this.handleStorageChange.bind(this));
    },
    
    handleStorageChange: function(event) {
        if (event.originalEvent.key === 'session') {
            var sessionData = JSON.parse(event.originalEvent.newValue);
            if (!sessionData || !sessionData.loggedIn) {
                // If session data is not present or user is not logged in, update session model
                this.session.set({ loggedIn: false });
            }
        }
    },
    render: function() {
        console.log('NavbarView rendered');
        this.$el.empty().html(this.template({ loggedIn: this.session.get('loggedIn') }));
        return this;
    }
});



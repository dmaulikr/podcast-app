var Player = {};

var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "queue"				: "queue",
        "podcasts"		: "myPodcasts",
        "podcasts/404":'404',
        "podcasts/301":'301',
        "podcasts/:feedUrl" : "podcasts",
        "podcasts/:feedUrl/:episodeName" : "podcasts",
        "add-feed"          : "addFeed",
        "settings/device-sync"      : "deviceSync",
        "settings/clear-data"		: "clearData"
    },

    initialize: function () {
    	// The currently playing item. It's set golobally for easier reference.
        this.Player = new PlayerView();
        $("#player").html(this.Player.el);
    },

    home: function () {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        //this.headerView.selectMenuItem('home-menu');
    },
    queue: function () {
        //if (!this.QueueView) {
            this.QueueView = new QueueView();
        //}
        $('#content').html(this.QueueView.el);
        //this.headerView.selectMenuItem('home-menu');
    },
    addFeed: function () {
        if (!this.AddFeed) {
            this.AddFeedView = new AddFeedView();
        }
        $('#content').html(this.AddFeedView.el);
        //this.headerView.selectMenuItem('home-menu');
    },
    myPodcasts: function(){
        //if (!this.MyPodcastsView) {
            this.MyPodcastsView = new MyPodcastsView();
        //}

        $('#content').html(this.MyPodcastsView.el);
    },

    404: function(){},
    301: function(){},
    podcasts: function(feedUrl, episodeName){
        
        // Load up the podcast we are looking for.
        try{
            var podcastModel = podcastItems.getByFeedURL(feedUrl);
            if(podcastModel == undefined){
                try{
                    podcastItems.addFeed(feedUrl, true);
                }catch(err){
                    // Do Something
                    throw 'Podcast Not Found';
                }
                return;
            }
            if(episodeName == undefined){
                this.PodcastView = new PodcastView({model: podcastModel});
            } else {
                var episodeModel = podcastModel.getEpisodesByName(episodeName);
                if(episodeModel == undefined){
                    throw 'Episode Not Found'
                }
                this.PodcastView = new PodcastEpisodeView({model: episodeModel});
            }
        }catch(err){
            // Do Something
            alert(err)
        }

        if(this.PodcastView != undefined){
            $('#content').html(this.PodcastView.el);
        }        
    },

    deviceSync: function(){
        this.DeviceSyncView = new DeviceSyncView();
        $('#content').html(this.DeviceSyncView.el);
    },
    clearData: function(){
        if (!this.ClearDataView) {
            this.ClearDataView = new ClearDataView();
        }
        $('#content').html(this.ClearDataView.el);
    }
});
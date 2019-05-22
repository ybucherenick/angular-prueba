(function() {
    this.app.config(function($routeProvider, $locationProvider, $httpProvider) {
        $locationProvider.hashPrefix("");
        $httpProvider.useApplyAsync(true);


        $routeProvider
            .when("/", {
                templateUrl: "view/view.html",
                    controller: "ViewCtrl"
            })


        .otherwise({
            redirect: "/error"
        });
    });
}.call(this));
'use strict';

(function() {
    this.app.factory('$NodoClient', ['$http', '$q',
        function($http, $q) {


            return {
                getTodosServidores: function() {
                    let defer = $q.defer();
                    
                    $http({
                        url: `http://localhost:3000/getTodosServidores`,
                        method: 'GET',
                        cache: false
                    }).then(function(_response) {
                        defer.resolve(_response);

                    }, function(_error) {
                        defer.reject(_error);
                    });
                    return defer.promise;
                }


            };
        }
    ]);
}).call(this);
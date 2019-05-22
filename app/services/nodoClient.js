'use strict';

(function() {
    this.app.factory('$NodoClient', ['$http', '$q',
        function($http, $q) {


            return {
                // Obtiene todos los servidores -- sin relación --
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
                },
                // Obtiene las relaciones que tiene un servidor en especifico
                getRelacion: function(_id) {
                    let defer = $q.defer();
                    
                    $http({
                        url: `http://localhost:3000/getRelacion/${_id}`,
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
"use strict";

(function() {
    app.controller("ViewCtrl", [
    "$scope",
    "$q",
    "$log",
    "$rootScope",
    "$NodoClient",
    function(
        $scope,
        $q,
        $log,
        $rootScope,
        $NodoClient,
    ) {
      
      $scope.servidores = [];
      loadData();

      function loadData() {
          // Obtengo todos los servidores
          $NodoClient.getTodosServidores().then(
              function(_resolves) {
                $scope.servidores = _resolves.data.servidores;
                // Busco las relaciones de cada servidor
                $scope.servidores.forEach(function(item){
                  $NodoClient.getRelacion(item.id).then(
                    function(_resolves2){
                      item.conectado = _resolves2.data.conectados;
                    },
                    function(_error) {
                        $log.error(_error);
                    }
                  );

                });
                console.log(_resolves.data.servidores);
              },
              function(_error) {
                  $log.error(_error);
              }
          );

      }


        }
    ]);
}.call());
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
          
      console.log('inicio la pag');
      loadData();

      function loadData() {
        console.log('loadData');
          $NodoClient.getTodosServidores().then(
              function(_resolves) {
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
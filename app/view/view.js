"use strict";

(function () {
  app.controller("ViewCtrl", [
    "$scope",
    "$q",
    "$log",
    "$NodoClient",
    function (
      $scope,
      $q,
      $log,
      $NodoClient
    ) {
      $scope.servidores = [];
      loadData();

      function loadData() {
        // var defered = $q.defer();
        var chain = $q.when();


        // Obtengo todos los servidores
        $NodoClient.getTodosServidores().then(
          function (_resolves) {
            $scope.servidores = _resolves.data.servidores;
            // Busco las relaciones de cada servidor
            for (const item of $scope.servidores) {
              chain = chain.then(function () {
                $NodoClient.getRelacion(item.id).then(
                  function (_resolves2) {
                    item.conectado = _resolves2.data.conectados;
                  },
                  function (_error) {
                    $log.error(_error);
                  })
              });
            }

            chain.then(function () {
              setTimeout(() => {
                mostrarGrafica();
              }, 100);
            });

          },
          function (_error) {
            $log.error(_error);
          }
        );
      }

      function mostrarGrafica() {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        var chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);

        var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
        networkSeries.dataFields.linkWith = "conectado";
        networkSeries.dataFields.id = "id";
        networkSeries.dataFields.pais = "pais";
        networkSeries.dataFields.grupo = "grupo";
        networkSeries.dataFields.host = "host";
        networkSeries.dataFields.servicio = "servicio";

        networkSeries.nodes.template.label.text = "{id}";
        networkSeries.fontSize = 10;

        var nodeTemplate = networkSeries.nodes.template;
        nodeTemplate.tooltipText = "{id}" + "\n" + "{pais}";
        nodeTemplate.fillOpacity = 1;
        nodeTemplate.label.hideOversized = false;
        nodeTemplate.label.truncate = false;

        var linkTemplate = networkSeries.links.template;
        linkTemplate.strokeWidth = 1;
        var linkHoverState = linkTemplate.states.create("hover");
        linkHoverState.properties.strokeOpacity = 1;
        linkHoverState.properties.strokeWidth = 2;

        nodeTemplate.events.on("over", function (event) {
          var dataItem = event.target.dataItem;
          dataItem.childLinks.each(function (link) {
            link.isHover = true;
          })
        })

        nodeTemplate.events.on("out", function (event) {
          var dataItem = event.target.dataItem;
          dataItem.childLinks.each(function (link) {
            link.isHover = false;
          })
        })

        // Evento del Modal
        nodeTemplate.events.on("hit", function (event) {
          setTimeout(() => {
            $("#modalNodo").modal({show: true});
          }, 100);

          $scope.$apply(function () {
            $scope.dataItem = event.target.dataItem;
          });
        })
        
        networkSeries.data = $scope.servidores;

      }


    }
  ]);
}.call());
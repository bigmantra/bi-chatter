define(["index.module"],function() {
  'use strict';


  angular
  .module('bm.platform')
  .factory('Users', function () {

    var userServiceInstance =
    {
      getUsers: function ($query) {
        return [
          'Girish Lakshmanan'
          , 'Nancy Seaton'
          , 'Darren Breiner'
          , 'Dominic Magner'
          , 'Marc Mcgurk'
        ];
      }
    }
    return userServiceInstance;
  })

  .factory('Topics', function ($firebaseArray, fbURL) {

    var topicsInstance = {
      getTopics: function (contextId) {
        return $firebaseArray(new Firebase(fbURL + contextId))
      },
      getTopicsRef: function (contextId) {
        return new Firebase(fbURL + contextId);
      }
    }
    return topicsInstance; // jshint ignore:line
  })

  .factory('BIGate', function () {
    var gateInstance = {


      sawSessionId: obips_scid,
      currentDashPath: saw.session.SessionInfos().portalPath,
      currentUser: saw.session.SessionInfos().user,
      baseURL: saw.getBaseURL(),

      getContextHash: function (elementID) {

        var contextHash = {};
        var edgeCoords = obips.EdgeCoords.findCoords($('#' + (elementID)).children()[0]);

        var sawViewModelID = edgeCoords.getId();
        var sawColumn = obips.ViewModel.getCurrentColumn(edgeCoords);

        var sawViewModel = obips.ViewModel.getViewModelById(sawViewModelID);
        var columnID = sawColumn.getAttribute('columnID');
        var stateInstance = obips.ReportMetadata.GetInstanceByStatePath(sawViewModel.reportStatePath);
        var numLayers = sawViewModel.getEdgeDefinition(sawViewModelID).getLayerCount(obips.JSDataLayout.ROW_EDGE);

        var currentRowColumns = [];

        //Loop through all columns in the same row as the current Element
        for (var i = 0; i < numLayers; i++) {

          var currentColumnElementId = 'e_' + sawViewModelID + '_1_' + i + '_' + edgeCoords.getSlice();

          var currentColEdgeCoords = obips.EdgeCoords.findCoords($('#' + currentColumnElementId).children()[0]);

          var currentCol = obips.ViewModel.getCurrentColumn(currentColEdgeCoords);

          currentRowColumns.push({
            //Get the Column Formula for the element
            formula: currentCol.querySelector('columnFormula expr').innerHTML,
            //Get the Heading of current element
            heading: ((currentCol.querySelector('columnHeading caption text') && currentCol.querySelector('columnHeading caption text').innerHTML) || (currentCol.querySelector('columnFormula expr').innerHTML)),
            //Get the Column Value of the Current element
            value: currentColEdgeCoords.element.textContent

          })
        }

        contextHash = {

          //isMeasure: stateInstance.getColumnInfoByID(columnID).isMeasure(),
          columnID: columnID,
          //baseFormula: stateInstance.getColumnInfoByID(columnID).getBaseFormula(),
          heading: ((sawColumn.querySelector('columnHeading caption text') && sawColumn.querySelector('columnHeading caption text').innerHTML) || (sawColumn.querySelector('columnFormula expr').innerHTML)),
          currentRowColumns: currentRowColumns,
          value: edgeCoords.element.textContent

        }
        contextHash.SHA1 = CryptoJS.SHA1(JSON.stringify(contextHash)).toString();

        return contextHash
      }//End Function getcontextHash


    };


    return gateInstance;
  })


});

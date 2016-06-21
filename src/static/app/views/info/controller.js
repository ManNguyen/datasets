angular.module('mol.controllers')
    .controller('molDatasetsInfoCtrl', ['$scope', '$rootScope', '$state', 'molApi',
        function($scope, $rootScope, $state, molApi) {
            $scope.loading = true;
            $scope.dsinfo = {};
            var dsparams = {
                'dataset_id': $state.params.dataset
            };
            molApi({
                "service": "datasets/info",
                "version": "1.0",
                "params": dsparams,
                "loading": true
            }).then(function(result) {
                $scope.dsinfo = result.data;
                $scope.loading = false;
            });
        }
    ]);

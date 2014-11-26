angular.module('charts', []).directive('chart', function() {
    return {
        restrict: 'E',
        template: '<div>hello</div>',
        scope: {
            chartData: "=value",
            chartObj: "=?"
        },
        transclude: true,
        replace: true,
        link: function($scope, $element, $attrs) {

            //Update when charts data changes
            $scope.$watch('chartData', function(value) {
            	console.log(value)
                if (value!=undefined)
                	{
                	allok();
                	return
                	}
                else
                	{

                // use default values if nothing is specified in the given settings
            	$scope.chartData={};
                $scope.chartData.chart={};
                $scope.chartData.title={};
                $scope.chartData.xAxis={};
                $scope.chartData.yAxis={};
                $scope.chartData.tooltip={};
                $scope.chartData.legend={};
                $scope.chartData.series={};
               
                
                $scope.chartData.chart.renderTo = $scope.chartData.chart.renderTo || $element[0];
                if ($attrs.type)
                    $scope.chartData.chart.type = $scope.chartData.chart.type || $attrs.type;
                if ($attrs.height)
                    $scope.chartData.chart.height = $scope.chartData.chart.height || $attrs.height;
                if ($attrs.width)
                    $scope.chartData.chart.width = $scope.chartData.chart.width || $attrs.width;
                
                $scope.chartData.title.text='Performance Heath';
             
                $scope.chartData.xAxis.categories=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                
                $scope.chartData.yAxis.title={};
                $scope.chartData.yAxis.text='Temperature (°C)';
                $scope.chartData.tooltip.valueSuffix='°C';
                $scope.chartData.legend.layout='vertical';
                $scope.chartData.legend.align='right';
                $scope.chartData.legend.verticalAlign='middle';
                $scope.chartData.legend.borderWidth=0;
                $scope.chartData.series=[{
                    name: 'Tokyo',
                    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }, {
                    name: 'New York',
                    data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
                }, {
                    name: 'Berlin',
                    data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
                }, {
                    name: 'London',
                    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                }];
                console.log($scope.chartData);
                $scope.chartObj = new Highcharts.Chart($scope.chartData);
                console.log( $scope.chartObj);
             }
            });
        }
    };

});


function allok()
{
	alert("ok");
	}

angular.module('charts', []).directive('chart', function() {
    return {
        restrict: 'E',
        template: '<div>hello</div>',
        scope: {
            chartValue: "=value",
            chartObj: "=?"
        },
        transclude: true,
        replace: true,
        link: function($scope, $element, $attrs) {

            //Update when charts data changes
            $scope.$watch('chartData', function(value) {
            	console.log(value)
//                if (value!=undefined)
//                	{
//                	allok();
//                	return
//                	}
//                else
//                	{

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
                $scope.chartData.yAxis.text='Temperature (C)';
                $scope.chartData.tooltip.valueSuffix='C';
                $scope.chartData.legend.layout='vertical';
                $scope.chartData.legend.align='right';
                $scope.chartData.legend.verticalAlign='middle';
                $scope.chartData.legend.borderWidth=0;
              
                $scope.chartData.series=$scope.chartValue.value;
                console.log( $scope.chartData.series);
                if($scope.chartData.series!=undefined)
                $scope.chartObj = new Highcharts.Chart($scope.chartData);
                console.log( $scope.chartObj);
//             }
            });
        }
    };

});


function allok()
{
	alert("ok");
	}

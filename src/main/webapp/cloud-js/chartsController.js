angular.module('charts.controllers',[])

.controller('chartController', chartController);

function chartController($scope,$http)
 {
	 $scope.chartObj; 
	 $scope.basicAreaChart={};
//	 $scope.basicAreaChart.value=[{
//         name: 'Tokyo',
//         data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
//     }, {
//         name: 'New York',
//         data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
//     }, {
//         name: 'Berlin',
//         data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
//     }];
	 var query = "select responseTime from AggregateMetrics where time > now() - 3000h limit 20";
	 var url = "http://ec2-54-68-149-90.us-west-2.compute.amazonaws.com:8086/db/performance/series?u=root&p=root&q="+ query;

	 var highchartJson;
	 var sortedJson;

		console.log("url is:" + url);

		highchartJson =[];
		var promise = $.getJSON(url);
		
		console.log(promise);
		
		promise.done(function(jsondata) {
		
		console.log(jsondata);

			if(jsondata.length>0){

				for (var i = 0; i < jsondata[0].columns.length; i++) {

						if(jsondata[0].columns[i].localeCompare('sequence_number') == 0 || jsondata[0].columns[i].localeCompare('time') == 0)
							flag=false;
						else
							flag=true;
					
						var seriesToPlot = {
						name : jsondata[0].columns[i],
						data : [],
						visible: flag,
						showInLegend: flag
					};
					for (var j = 0; j < jsondata[0].points.length; j++) {
						seriesToPlot.data.push(jsondata[0].points[j][i]);
					}
					
					highchartJson.push(seriesToPlot);
				}
				
			_.pluck(highchartJson, 'sequence_number');

		    sortedJson = _.sortBy(highchartJson, 'name');
		    console.log($scope.basicAreaChart.value);
		    $scope.basicAreaChart.value = sortedJson;	
		    console.log($scope.basicAreaChart.value);
		
			}
			
		});
		promise.fail(function() {
  			$scope.jsonData = {status:error_nodata};
		});
		
		
 }
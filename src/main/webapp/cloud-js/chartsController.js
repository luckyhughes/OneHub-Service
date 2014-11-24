angular.module('charts.controllers',[])

.controller('chartController', chartController);

function chartController($scope,$http)
 {
	 $scope.chartObj; 
	 
	 var query = "select responseTime from AggregateMetrics where time > now() - 1000h limit 20";
	 var url = "http://ec2-54-68-149-90.us-west-2.compute.amazonaws.com:8086/db/performance/series?u=root&p=root&q="+ query;

	 var highchartJson;
	 var sortedJson;

		console.log("url is:" + url);

		setInterval(function() {
		
		highchartJson =[];
		var promise = $.getJSON(url);
		
		
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
		    $scope.basicAreaChart = sortedJson;	
		    console.log($scope.basicAreaChart);
			}
			
		});
		
		promise.fail(function() {
  			$scope.basicAreaChart = {status:error};
		});
		},1000);

		
 }
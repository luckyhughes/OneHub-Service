angular.module('charts.controllers',[])

.controller('chartController', ['$scope','$http', 
	function($scope,$http) {
	    $scope.chartObj; // this will contain a reference to the highcharts' chart object
 		
    		data = getJsonData("select responseTime from AggregateMetrics where time > now() - 1000h limit 20");
    		
    		console.log(data);
		
}]);

function getJsonData(query)
 {
	 var url = "http://ec2-54-68-149-90.us-west-2.compute.amazonaws.com:8086/db/performance/series?u=root&p=root&q="+ query;

	 var highchartJson =[];
	 var sortedJson;

		console.log("ulr is:" + url);

		$.getJSON(url, function(jsondata) {

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
			}	

		});
		
		console.log("ulr is:" + url);

		_.pluck(highchartJson, 'sequence_number');

		sortedJson = _.sortBy(highchartJson, 'name');
		console.log(sortedJson);
		return sortedJson;
 }
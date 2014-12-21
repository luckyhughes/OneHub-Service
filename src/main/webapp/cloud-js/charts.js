var app=angular.module('charts', []);
app.directive('chart', function() {
    return {
        restrict: 'E',
        template: "<div style='float:left'>hello</div>",
        scope: {
            chartValue: "=value",
            chartObj: "=?"
        },
        transclude: true,
        replace: true,
        link: function($scope, $element, $attrs) {
            //Update when charts data changes
        	$attrs.$observe("chartValue", function(value) {
            	var activate=0;
            	 var query = "select responseTime from AggregateMetrics where time > now() - 3000h limit 10";
            	console.log(value)
            var s=	allok(query);
            	console.log(s);
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
             
                $scope.chartData.series=s;
                console.log( $scope.chartData.series.length);
                if($scope.chartData.series.length!=0)
                	{
                $scope.chartObj = new Highcharts.Chart($scope.chartData);
                 console.log( $scope.chartObj);
                 activate=1;
                	 }
//                }
            	
                counter=0;
                setInterval(function(){
                	  var s=	allok(query);
                  	if(activate==0)
                  		{
                  	    $scope.chartData.series=s;
                  	   $scope.chartObj = new Highcharts.Chart($scope.chartData);
                       activate=1;
                  		}
                  	else
                  		{
                  	//                 		 var xseries=$scope.chartObj.xAxis.categories;
                 	//	console.log(xseries);
                 		 	                      var yseries =$scope.chartObj.series;
//	                      console.log($scope.chartData.series);
						  
                         timeSeries=parseEpochTime(s[2].data);
   				         console.log($scope.chartData.series);
					      //logic to update xaxis timeseries data on chart every minute considering interval is 5 sec (5*12)
						  counter++;
//                         if(counter%12==0)
//							xseries.push(timeSeries[0]);
//						  else
//						xseries.push("");
//						
//						  //append series data with data points for respective series
						  for ( i=0; i<s.length; i++) {
//						
                               datapoints =  s[i].data[0];
//
//								//shift y series if dataponits are more than a value (20)
//                           	shift = yseries[i].data.length > 20;
//

                               yseries[i].addPoint(datapoints, true, true);
                   	  }	
                  		}
                	},1000);
            });
        }
    };

});

app.directive('charty', function() {
    return {
        restrict: 'E',
        template: "<div style='float:left;margin-left:20px;'>hello</div>",
        scope: {
            chartValue: "=value",
            chartObjj: "=?"
        },
        transclude: true,
        replace: true,
        link: function($scope, $element, $attrs) {
            //Update when charts data changes
        	$attrs.$observe("chartValue", function(value) {
       
            	var activate=0;
            	console.log(value)
            	var query = "select countTotalThread from AggregateMetrics where time > now() - 3000h limit 10";
            var s=	allok(query);
            	console.log(s);
            
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
             
                $scope.chartData.series=s;
                console.log( $scope.chartData.series.length);
                if($scope.chartData.series.length!=0)
                	{
                $scope.chartObjj = new Highcharts.Chart($scope.chartData);
                 console.log( $scope.chartObjj);
                 activate=1;
                	 }
//                }
            	
                counter=0;
                setInterval(function(){
//                	console.log("innn");
                	var s=	allok(query);
                  	if(activate==0)
                  		{
                  	    $scope.chartData.series=s;
                  	   $scope.chartObjj = new Highcharts.Chart($scope.chartData);
                       activate=1;
                  		}
                  	else
                  		{
                  	//                 		 var xseries=$scope.chartObj.xAxis.categories;
                 	//	console.log(xseries);
                 		 	                      var yseries =$scope.chartObjj.series;
//	                      console.log($scope.chartData.series);
						  
                         timeSeries=parseEpochTime(s[2].data);
   				         console.log($scope.chartData.series);
					      //logic to update xaxis timeseries data on chart every minute considering interval is 5 sec (5*12)
						  counter++;
//                         if(counter%12==0)
//							xseries.push(timeSeries[0]);
//						  else
//						xseries.push("");
//						
//						  //append series data with data points for respective series
						  for ( i=0; i<s.length; i++) {
//						
                               datapoints =  s[i].data[0];
//
//								//shift y series if dataponits are more than a value (20)
//                           	shift = yseries[i].data.length > 20;
//

                               yseries[i].addPoint(datapoints, true, true);
                   	  }	
                  		}
                	},1000);
            });
        }
    };

});


app.directive('chartyy', function() {
    return {
        restrict: 'E',
        template: "<div style='float:left; margin-top:20px'>hello</div>",
        scope: {
            chartValue: "=value",
            chartObjjj: "=?"
        },
        transclude: true,
        replace: true,
        link: function($scope, $element, $attrs) {
            //Update when charts data changes
        	$attrs.$observe("chartValue", function(value) {
       
            	var activate=0;
            	console.log(value)
            	var query = "select bytesReceived from AggregateMetrics where time > now() - 3000h limit 10";
            var s=	allok(query);
            	console.log(s);
            
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
             
                $scope.chartData.series=s;
                console.log( $scope.chartData.series.length);
                if($scope.chartData.series.length!=0)
                	{
                $scope.chartObjjj = new Highcharts.Chart($scope.chartData);
                 console.log( $scope.chartObjjj);
                 activate=1;
                	 }
//                }
            	
                counter=0;
                setInterval(function(){
//                	console.log("innn");
                	var s=	allok(query);
                  	if(activate==0)
                  		{
                  	    $scope.chartData.series=s;
                  	   $scope.chartObjjj = new Highcharts.Chart($scope.chartData);
                       activate=1;
                  		}
                  	else
                  		{
                  	//                 		 var xseries=$scope.chartObj.xAxis.categories;
                 	//	console.log(xseries);
                 		 	                      var yseries =$scope.chartObjjj.series;
//	                      console.log($scope.chartData.series);
						  
                         timeSeries=parseEpochTime(s[2].data);
   				         console.log($scope.chartData.series);
					      //logic to update xaxis timeseries data on chart every minute considering interval is 5 sec (5*12)
						  counter++;
//                         if(counter%12==0)
//							xseries.push(timeSeries[0]);
//						  else
//						xseries.push("");
//						
//						  //append series data with data points for respective series
						  for ( i=0; i<s.length; i++) {
//						
                               datapoints =  s[i].data[0];
//
//								//shift y series if dataponits are more than a value (20)
//                           	shift = yseries[i].data.length > 20;
//

                               yseries[i].addPoint(datapoints, true, true);
                   	  }	
                  		}
                	},1000);
            });
        }
    };

});





function parseEpochTime(epoch)
{
	   var time=[];
	   var offset = (new Date).getTimezoneOffset()*60000;

		for(var i=0;i<epoch.length;i++)
		{
	      var date=new Date(epoch[i] - offset); //get offset for local timezone and convert epoch time to localtime zone

	      time.push(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
	  	}
	return time;
}


function allok(query)
{
	$.ajaxSetup( { "async": false } );
	
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
			  
//			    console.log($scope.basicAreaChart.value);
//			    $scope.basicAreaChart.value = sortedJson;	
//			    console.log($scope.basicAreaChart.value);
//			
				}
		});
			promise.fail(function() {
	  			$scope.jsonData = {status:error_nodata};
			});
   return  sortedJson;
}
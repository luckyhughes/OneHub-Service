
		$('#30m').click(function() {
			$live=false;
			clearInterval(myVar);
			$("#avg_response").empty();
	    	$.ajaxSetup( { "async": false } );
	    	plotchart("select responseTime from AggregateMetrics where time > now() - 30m limit 20","avg_response",$live);
	    	plotchart("select bytesReceived from AggregateMetrics where time > now() - 30m limit 20","network_throughput",$live);
	    	plotchart("select countTotalThread,countSuccessSample,countNonSuccessSample from AggregateMetrics where time > now() - 30m limit 20","sample_summary",$live);
	    	$.ajaxSetup( { "async": true } );
		});

		$('#1h').click(function() {
			$live=false;
			clearInterval(myVar);
			$("#avg_response").empty();
	    	$.ajaxSetup( { "async": false } );
	    	plotchart("select responseTime from AggregateMetrics where time > now() - 1h limit 20","avg_response",$live);
		    plotchart("select bytesReceived from AggregateMetrics where time > now() - 1h limit 20","network_throughput",$live);
		    plotchart("select countTotalThread,countSuccessSample,countNonSuccessSample from AggregateMetrics where time > now() - 1h limit 20","sample_summary",$live);
    	$.ajaxSetup( { "async": true } );
		});
		
		$('#5h').click(function() {
			$live=false;
			clearInterval(myVar);
			$("#avg_response").empty();
	    	$.ajaxSetup( { "async": false } );
	    	plotchart("select responseTime from AggregateMetrics where time > now() - 5h limit 20","avg_response",$live);
		    plotchart("select bytesReceived from AggregateMetrics where time > now() - 5h limit 20","network_throughput",$live);
		    plotchart("select countTotalThread,countSuccessSample,countNonSuccessSample from AggregateMetrics where time > now() - 5h limit 20","sample_summary",$live);
	    	$.ajaxSetup( { "async": true } );
		});
		
		$('#1d').click(function() {
			$live=false;
			clearInterval(myVar);
			$("#avg_response").empty();
	    	$.ajaxSetup( { "async": false } );
	    	plotchart("select responseTime from AggregateMetrics where time > now() - 1d limit 20","avg_response",$live);
		    plotchart("select bytesReceived from AggregateMetrics where time > now() - 1d limit 20","network_throughput",$live);
		    plotchart("select countTotalThread,countSuccessSample,countNonSuccessSample from AggregateMetrics where time > now() - 1d limit 20","sample_summary",$live);
	    	$.ajaxSetup( { "async": true } );
		});
		
		$('#current').click(function() {
			$live=true;
			$("#avg_response").empty();
	    	$.ajaxSetup( { "async": false } );
	    	plotchart("select responseTime from AggregateMetrics where time > now() - 3000h limit 20","avg_response",$live);
		  //  plotchart("select bytesReceived from AggregateMetrics where time > now() - 3000h limit 20","network_throughput",$live);
		   // plotchart("select countTotalThread,countSuccessSample,countNonSuccessSample from AggregateMetrics where time > now() - 300h limit 20","sample_summary",$live);
	    	$.ajaxSetup( { "async": true } );
		});
  

 

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

		_.pluck(highchartJson, 'sequence_number');

		sortedJson = _.sortBy(highchartJson, 'name');
		//console.log(sortedJson);
		return sortedJson;
 }
 

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

	var myVar;
	function plotchart(query,divid,live){

		$.ajaxSetup( { "async": false } );

		//divid = '#'+divid;
		console.log(divid);
		var chart;

		//get highchart json data in name and data format from server to initialize seriesdata
	    var seriesdata = getJsonData(query);
		
		
	    var options = {
           chart: {
					renderTo: divid,
	                type: 'area',
	                animation: Highcharts.svg,
	                marginRight: 10,
              },
           title: {
            text: 'Performance Heath'
              }, 
           xAxis: {
               		type: 'datetime',        		
				    categories:[],
            	},
      	   yAxis: {
                		title: {
                    	text: 'Value'
                },
           plotLines: [{
                    	value: 0,
                    	width: 1,
                    	color: '#808080'
                		}]
            	},
    	   tooltip : {
						valueSuffix : ''
				},
		   legend : {
						//layout : 'vertical',
						//align : 'right',
						//verticalAlign : 'middle',
						borderWidth : 0
				},
    	   series : seriesdata
        };
	//activate variable use to check the highchart is activated or not
	activate=0;  
	var chart;
	// check the HighChart have Series or not
	if(options.series.length!=0)               
		{
			timeStamp=parseEpochTime(seriesdata[2].data);   
			// asign the time in xAxis 
			options.xAxis.categories=timeStamp;  
			// create the object  
		    chart = new Highcharts.Chart(options);  
		   //update Activate for that chart is activated
		    activate=1;
		
		}
		  
	var counter=0;
	myVar=	setInterval(function () {
								
							$.ajaxSetup( { "async": false } );

						    //get highchart json data in name and data format from server
							seriesdata = getJsonData(query);
                           	if(seriesdata.length>0){
									
							   // check the chart is activate or not
                                   if(activate==0)   
											  {  
												  //Asign the Time to Xaxis 
												  timeStamp=parseEpochTime(seriesdata[2].data);
			                                      options.xAxis.categories=timeStamp;
												  // Asign the Series to Chart
												  options.series=seriesdata;
													 
												  chart = new Highcharts.Chart(options);
												  activate=1;
												
											  }
											  else
											  {
								                  //In this else part we append series data with data points for respective series
												
	                                              var xseries=chart.xAxis[0].categories;
	                    	                      var yseries = chart.series;
	                    	                      console.log(yseries);
												  
                                                  timeSeries=parseEpochTime(seriesdata[2].data);
				            				   
											      //logic to update xaxis timeseries data on chart every minute considering interval is 5 sec (5*12)
												  counter++;
					                              if(counter%12==0)
													xseries.push(timeSeries[0]);
												  else
													xseries.push("");
												
												  //append series data with data points for respective series
												  for ( i=0; i<seriesdata.length; i++) {
												
						                                datapoints =  seriesdata[i].data[0];

														//shift y series if dataponits are more than a value (20)
						                            	shift = yseries[i].data.length > 20;

						                            	yseries[i].addPoint(datapoints, true, shift);
					                        	  }
					  						   }	
		                       }	
							
	                       },5000);

		    //This condition use to stop the setInterval method.					
			if(live==false)
			{
				 clearInterval(myVar);
			}

		}

var chartData;
var chartInstance;
var dataRowSeparator="\n";
var dataColumnSeparator="|";
var chartTitle="";
var chartsubTitle="";
var totalSeriesSize=1;
var chart; 
var prev;
var min;

if(!Array.indexOf){
	    Array.prototype.indexOf = function(obj){
	        for(var i=0; i<this.length; i++){
	            if(this[i]==obj){
	                return i;
	            }
	        }
	        return -1;
	    }
	}
	
function addCommas(nStr)
			{
				nStr += '';
				x = nStr.split('.');
				x1 = x[0];
				x2 = x.length > 1 ? '.' + x[1] : '';
				var rgx = /(\d+)(\d{3})/;
				while (rgx.test(x1)) {
					x1 = x1.replace(rgx, '$1' + ',' + '$2');
				}
				return x1 + x2;
			}

function addDays(DateValue)
{
    var myDate = new Date(DateValue);
    myDate.setDate(myDate.getDate() + 1);
    return myDate;

}

function getUTCDate(DateValue)
{
    var day;
    var month;
    var year;
    
    day=DateValue.getDate();
    month=DateValue.getMonth();
    year=DateValue.getFullYear();
    
    return Date.UTC( year,month,day);
    
}


function getSeriesObject(chartType)
{
    var seriesObject;
    
    if(chartType == "line" || chartType == "column" || chartType == "" || chartType == undefined)
    {
     var newSeries = {  type: 'line',
                        name: '',
                        data: [],
                        dataLabels: {
							enabled: false,
							x: 0,
							y: 20,
							formatter: function() {
							   return this.y + '%<br>' + this.point.category[1]; 
							    }
							}
							
                      };
      return  newSeries;
      
    }

    if(chartType == "datetime")
    {
     var newSeries = { type: 'line',
                        name: '',
                        data: [],
                        pointInterval: 24 * 3600 * 1000,
												pointStart: Date.UTC(1972, 0, 1),
                        dataLabels: {
							enabled: false,
							x: 0,
							y: 20,
							formatter: function() {
							   return this.y + '%<br>' + this.point.category[1]; 
							    }
							}
							
                      };
      return newSeries;
    }
    
    if(chartType == "scatter")
    {
     var newSeries = { type: 'scatter',
                        name: '',
                        data: [],
                        tempValue: [],
                        marker: {
                            	    symbol: 'square',
				                    radius: 8,
				                    enabled: true
			                    }
                      };
      return newSeries;
    }
    

    return seriesObject;
}



 function getLineChartInstance() 
  {
     
  	var lineChartOptions = {
    chart: {
        renderTo: 'mgtchart01',
        type: 'line',
        height: 350,
        margin: [60, 0, 30, 0]
    },
    colors: [
        '#004f5c',
        '#9ea900',
        '#88232b',
        '#cc9933',
        '#4b4870',
        '#ffcc33'
    ],
    title: {
        useHTML: true,
        text: 'Total Return over 5 years',
        align: 'left',
        style: {
            fontFamily: 'Interstate MG Light',
            fontWeight: 'bold',
            fontSize: '20px',
            color: '#CCCCCC'
        },
        margin: 35,
        floating: false
    },
    subtitle: {
        useHTML: true,
        text: 'Indexed to 100',
        align: 'left',
        style: {
            fontFamily: 'Interstate MG Light',
            fontWeight: 'bold',
            fontSize: '12px',
            color: '#CCCCCC'
        },
        y: 28,
        floating: false
    },
    xAxis: {
        title: '',
        type: 'datetime',
        maxZoom: 1 * 24 * 3600000, // 1 day
        pointStart: Date.UTC(2005, 0, 1),
        minPadding: 0.015,
        maxPadding: 0.015,
        showFirstLabel: true,
        showLastLabel: true,
        startOnTick: false,
        endOnTick: false,
        labels: {
            overflow: 'justify',
            y: 25,
            formatter: function() {
                return Highcharts.dateFormat('%b\'%y', new Date(this.value)); // format numbers
            }
        },
    },
    yAxis: {
        title: '',
        showFirstLabel: false,
        showLastLabel: true,
        labels: {
            x: 25,
            y: 15,
            formatter: function() {
                return Highcharts.numberFormat(this.value, 0); // format numbers
            }
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#f2f2f2'
        }],
        minPadding: 0.05,
        maxPadding: 0.05
    },
    tooltip: {
        useHTML: true,
        backgroundColor: null,
        borderWidth: 0,
        shadow: false,
        formatter: function() {
            //  return '<div style="background-color:' + this.series.color + '" class="mgt-1__chart--tooltip"> ' + this.series.name + '<br>X axis value: ' + this.key + '<br>Y axis value: ' + this.y + '</div>';
            //  return '<div style="background-color:' + this.series.color + '" class="mgt-1__chart--tooltip"><b>'+this.series.options.ext_name+'</b><br>' + formatData(this.x) + '</b>, ' + Highcharts.numberFormat(this.y, 2) + '</div>';
            //return '<div style="background-color:' + this.series.color + '" class="mgt-1__chart--tooltip"><b>' + this.series.options.ext_name + '</b><br>' + Highcharts.dateFormat('%e-%b-%Y', new Date(this.x)) + ', ' + Highcharts.numberFormat(this.y, 2) + '%</div>';
            return '<div style="background-color:' + this.series.color + '" class="mgt-1__chart--tooltip"><b>' + this.series.options.name + '</b><br>' + Highcharts.dateFormat('%e-%b-%Y', new Date(this.x)) + ', ' + Highcharts.numberFormat(this.y, 2) + '%</div>';
        }
    },
    legend: {
    	enabled: false,
        align: 'center',
        borderWidth: 0
    },
    series: [],
    credits: {
        enabled: false
    },
    plotOptions: {
        line: {
            lineWidth: 3,
            marker: {
                enabled: false,
                symbol: 'circle'
            }
        }
    }
};
/*
    var lineChartOptions = {
    
                chart: {
                                backgroundColor: null,
			        renderTo: 'IDOfDivToDrawChartInIt',
			        defaultSeriesType: 'area',
					zoomType: 'xy'
					//,marginLeft: 40
					,marginRight: 40
				},
				title: {
				text: 'TitleOfTheChart'
				},
				subtitle: {
				text: 'SubTitleOfTheChart'
				},
				xAxis: {
					type: 'datetime',
					maxZoom: 14 * 24 * 3600000, // fourteen days
          			pointStart: Date.UTC(2006, 0, 1),
					showFirstLabel:true,
					showLastLabel:true,
					minPadding:0,
					startOnTick:false,
					endOnTick:false,
					tickmarkPlacement: 'on',
					title: {
						enabled: true
					},
					labels: {
						formatter: function() {
							return String(Highcharts.dateFormat('%e/%m/%Y', this.value));
						}
					}
				},
				yAxis: {
					title: {
						text: ' '
					},
					tickmarkPlacement: 'on',
					labels: {
						formatter: function() {
							return addCommas(this.value) ;
						}
					},
					opposite:false,
					startOnTick: false,
					showFirstLabel: true
				},
				tooltip: {
					formatter: function() {
						//return '<b>'+ this.series.name +'</b><br/>' +
						//	String(Highcharts.dateFormat('%e/%m/%Y', this.x))+', '+ Highcharts.numberFormat(this.y, 2) ;
						return '<span style="line-height:1.5em"><b>'+ this.series.name +'</b><br />' + String(Highcharts.dateFormat('%e/%m/%Y', this.x))+', '+ Highcharts.numberFormat(this.y, 2)+'</span>' ;
					}
				},
				legend: {
					enabled: true
				},
				
				plotOptions: {
						area: {
						fillColor: 'none',
						lineWidth: 2,
						marker: {
							enabled: false,
							states: {
								hover: {
									enabled: true,
									radius: 5
								}
							}
						},
						shadow: false,
						states: {
							hover: {
								lineWidth: 4						
							}
						}
					} 
				},
			
				series: [],
				colors: ['#009DDC', '#D95121', '#7E8082', '#6F984B']

    
    };
 */
    return lineChartOptions; 
  }
 
function drawLineChartFromObj(nameOfDiv,lineChartData,chartTitle,fundNames, fundVendors, showError, chartConfig)
{
	if(chartConfig == undefined)
	{
		chartConfig = getLineChartInstance();
		chartConfig.chart.renderTo=nameOfDiv;

	}

	if(lineChartData== "" || lineChartData ==undefined)
	{
		if(!showError){
			return;
		}
		warnMessage("Error","One or more of the funds selected has less than a years performance and will not display any data on the chart"); 

		return;
	}

	chartConfig = buildSpecificChartFromObj(chartConfig,'line',lineChartData, fundNames,fundVendors,showError);
		//chartConfig.series.pointInterval= 24 * 3600 * 1000;
		if(chartConfig != null){
			chartConfig.title.text = chartTitle;//chartTitle;
			chartConfig.subtitle.text = "Indexed to 100";
			
			var minVal = 99999999999999999;
			var maxVal = 0;
			for(var i=0; i<lineChartData.length; i++){
				var val = parseInt(lineChartData[i].Value);
				if (val > maxVal){
					maxVal = val;
				}
				if (val < minVal){
					minVal = val;
				}
			}
			
			chartConfig.yAxis.min=minVal-1;
			chartConfig.yAxis.max=maxVal+1;

			chart = new Highcharts.Chart(chartConfig);
			return chart;
		}
		else{
			return null;
		}       
}
 
 
 function buildSpecificChartFromObj(chartConfig,chartType,thisChartData, fundNames,fundVendors,showError)
 {
		var hardcodedseries = [];
        var serieses = { series: []};
        var categoriesLabelColumn = -1;
        var categoriesLabelColor = -1;
		var checkNames =[];
		var previous;
		var totalValuesCount=1000;
		var values = [];
		var dates = [];
		
		for(var it=0, itm;itm = thisChartData[it];it++){
			//for(var k in itm){
				var vend = itm["VendorId"]
				if(it==0){ 
					previous = vend;
					checkNames.push(vend);
					
				}
				//  itemNo != 0
				
				if(previous!=vend){
					checkNames.push(vend);
					previous = vend;
				}
				
			//	}
		}
		//compare series against seriesnames
		var fundNamesTemp = [];
		var fundVendorsTemp = [];
		if(fundVendors.length != checkNames.length){
				for(var f = 0; f< fundVendors.length; f++){
						if(fundVendors[f]!=checkNames[f] && (f!=fundVendors.length - 1) ){
							 //warnMessage("Warning",fundNames[f]+" has no charting data but it will still show Performance below the chart");
							//return null;
							fundNamesTemp.push(fundNames[f]);
							fundVendorsTemp.push(fundVendors[f]);
							fundVendors.splice(f,1);
							fundNames.splice(f,1);
							--f;
						}
					}
		}
		
		if(fundVendors!=null && fundNames!= null){
			for(j=0;j<fundVendors.length;j++)
			{
				if(checkNames.indexOf(fundVendors[j])==j)
				{
					hardcodedseries.push(fundNames[j]);
				}
			
			}
		
			for(var i=0;i<hardcodedseries.length;i++){
				var newSeries =getSeriesObject (chartType);
				newSeries.name=hardcodedseries[i];
				newSeries.type =chartType;
				serieses.series.push(newSeries);
				
			}	
		}else{
			for(var i=0;i<checkNames.length;i++){
				var newSeries =getSeriesObject (chartType);
				newSeries.name=checkNames[i];
				newSeries.type =chartType;
				serieses.series.push(newSeries);
				
			}	
		}		
   
		
		var j = 0;
		var stopLabeling = false;
		var dateComparison = [];
		var plot = true;
		var maxDate = 0;
		
		
		for(var itemNo=0, item;item = thisChartData[itemNo];itemNo++){
			
			//for(var key in item){
				if(j<hardcodedseries.length){
					if(itemNo==0){ 
						previous = item["VendorId"];
						dateComparison.push(item["Date"]);
					}
					//  itemNo != 0
					
					if(previous!=item["VendorId"]){
						dateComparison.push(item["Date"]);
						j++;
						if(j==hardcodedseries.length+1) break;
						previous = item["VendorId"];
						stopLabeling = true;
						if(j==1)totalValuesCount=itemNo;
					}
					if(!stopLabeling && itemNo<=totalValuesCount){
						if(item["Value"] != "" )
						{
							var month = item["Date"].substring(3,5);
							if(month.substring(0,1) == '0') month = parseInt(month.substring(1,2));
							else month = parseInt(month);
							var d = new Date(item["Date"].substring(6,10),(month-1),item["Date"].substring(0,2));
							//d.setMonth(d.getMonth()-1);
							d = getUTCDate(d); 
							dates.push(d);
						}
					}
					if(itemNo<=((j+1)*totalValuesCount)-1){
						if(item["Value"] != "" )
						{
							floatval=parseFloat(item["Value"]);
							prev = item["Value"];
							serieses.series[j].data.push([null,floatval]);
						}
						else
						{
							prev = parseFloat(prev);
							serieses.series[j].data.push([null,prev]);
						}
																						
						 
				
						if(prev!=0 && prev!=min){
							min = (parseFloat(min)<parseFloat(prev)?min:prev);
						}
					}
					
					//alert(key);
					//alert(item[key][0]);
	
				}
			//}
		}
		
		var len = dateComparison.length -1;
		for(var d=0; d<len; d++){
			if(dateComparison[d+1]!=dateComparison[d]){
				var a = new Date(parseInt(dateComparison[d+1].substring(6,10)),parseInt(dateComparison[d+1].substring(3,5))-1,parseInt(dateComparison[d+1].substring(0,2)));
				var b = new Date(parseInt(dateComparison[d].substring(6,10)),parseInt(dateComparison[d].substring(3,5))-1,parseInt(dateComparison[d].substring(0,2)));
				if(a>b) maxDate = a;
				else maxDate = b;
				plot = false;
			}
		}
		/*var divide;
		if(dateComparison.length>=3)
			divide = dateComparison.length;
		else 
			divide =3;
			chartConfig.xAxis.tickInterval = parseInt(it/divide/i/2);*/
		
   if(plot){
   
			//pushing the series into the chartConfig	
			for(var i=0; i<serieses.series.length; i++){
					for(var j=0;j<serieses.series[i].data.length; j++){
							serieses.series[i].data[j][0] = dates[j];
						}
					chartConfig.series.push(serieses.series[i]);
				}	
				 
		chartConfig.xAxis.tickPositions = tickPointsCalculation(serieses.series[0]);
	   	chartConfig.yAxis.min = parseInt(min);
	   	for(var o=0; o<fundVendorsTemp.length; o++){fundVendors.push(fundVendorsTemp[o]);}
	   	for(var k=0; k<fundNamesTemp.length; k++){fundNames.push(fundNamesTemp[k]);}
	   	return chartConfig;
   }
   else{	
   			var daToShow;
			var ye = new Date();
			var tmp = parseInt(ye - maxDate);
			var da = Math.round(parseFloat(tmp)/(1000*60*60*24*30.34));
			if(da > 24 && da%12!=0){
				daToShow = parseInt(da/12)+"Y";
			}
			else if(da > 12){
				daToShow = "1Y";
			}
			else if(da == 12){
				daToShow = "6M";
			}
			else{
				daToShow = da + "M";
				}
				if(!showError){
        		return null;
        	}

			warnMessage("Error","The fund inception date is less than the period selected.  Please select a maximum of "+daToShow);
        
			
			return null;
   }
   	
	
}		 
      
 
//* ( tickPointsCalculation )
function tickPointsCalculation ( poSer ) {
//	console.log('poSer', poSer)
	// ---  Draws tickpoints if series length is recognized in 13,37,61 entries
	var tickPoints = [];
	var tickJumps = {
		"13" : 3, 
		"37" : 12, 
		"61" : 12,
		"121": 24
	};
	var sLength = poSer.data.length;
	var jump = tickJumps[sLength] || null;
	if (jump) {
		for(var i=0; (i*jump)<(sLength); i++){
			tickPoints.push(poSer.data[i*jump][0]);
		}
	}
	else {
		// ---  Draws tickpoints dynamically if series length is not recognized in 4,7,13,37,61 entries
		var maxTicks = 7;
		if (sLength <= maxTicks) {
			for (var i=0; i<sLength; i++) {
				tickPoints.push(poSer.data[i][0]);
			}
		}
		else {
		  tickJump = (sLength-1)/(maxTicks-1);
		  tickPoints.push(poSer.data[0][0]);
			for ( var i = 1; i < maxTicks; i++ ) {
				tickPoints.push(poSer.data[Math.round(tickJump*i)][0]);
			}
		}
	}
	
	return tickPoints;
}

 
 
// JavaScript Document


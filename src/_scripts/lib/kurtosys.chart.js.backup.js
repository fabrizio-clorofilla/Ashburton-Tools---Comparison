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

var chartPlotOptions=function()
{
	this.showLegend =true;
	this.showToolTip =true;

}

function getSeriesObject(chartType)
{
	var seriesObject;
	
	if(chartType == "area" || chartType == "column" || chartType == "" || chartType == undefined)
	{
	 var newSeries = { type: 'area',
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
	 var newSeries = { type: 'area',
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

function getLineChartInstance() {
	 
	var lineChartOptions = {
	
		credits: {
			enabled: false
		},	
		chart: {
			renderTo: 'IDOfDivToDrawChartInIt',

			defaultSeriesType: 'area',
				  //zoomType: 'xy',
					marginLeft: 40,
					marginRight: 40,
					height: 300
				},
				colors: [
					'#532F1A',
					'#E98100'
				],
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
					startOnTick:true,
					endOnTick:true,
					tickmarkPlacement: 'on',
					title: {
						enabled: true
					},
					labels: {
						formatter: function() {
							//return String(Highcharts.dateFormat('%e/%m/%Y', this.value));
							return String(Highcharts.dateFormat("%b '%y", this.value));
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
						return '<b>'+ this.series.name +'</b><br/>' +
							String(Highcharts.dateFormat('%e/%m/%Y', this.x))+', '+ Highcharts.numberFormat(this.y, 2) ;
					}
				},
				legend: {
					enabled: true,
					borderColor: '#ffffff',
					itemStyle: {
						cursor: 'pointer',
						color: '#6d6e71',
						fontFamily: '"Amplitude Light"',
						fontSize: '14px',
						padding: '0 10px'
					}
				},
				style: {
					fontFamily: '"Amplitude Light"',
					fontSize: '14px',
					color: '#6d6e71'
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
				series: []
	};
 
	return lineChartOptions;
  }

function drawLineChartFromObj(nameOfDiv,lineChartData,chartTitle,fundNames, fundVendors, showError, chartConfig, poChartOptions) {

	//console.log('drawLineChartFromObj', fundNames);
	if(chartConfig == undefined) {
		chartConfig = getLineChartInstance();
		chartConfig.chart.renderTo=nameOfDiv;
	}
	
	if(lineChartData== "" || lineChartData ==undefined) {
		if(!showError){
			return;
		}
		warnMessage("Error","One or more of the funds selected has less than a years performance and will not display any data on the chart"); 
		
		return;
	}
//    console.log('chartConfig', chartConfig)
	chartConfig = buildSpecificChartFromObj(chartConfig,'area',lineChartData, fundNames,fundVendors,showError);
	//chartConfig.series.pointInterval= 24 * 3600 * 1000;
	
	if (chartConfig != null){
		chartConfig.title.text = "";//chartTitle;
		chartConfig.subtitle.text = "";
			
		if (!KS$.isEmptyObject(poChartOptions)) {
			chartConfig = KS$.extend(true, chartConfig, poChartOptions);
		}
		
		chart = new Highcharts.Chart(chartConfig);
		
		return true;
		
	} else{
		return null;
	}       
 }
 
function buildSpecificChartFromObj(chartConfig,chartType,thisChartData, fundNames,fundVendors,showError)
{
		//console.log('buildSpecificChartFromObj', chartConfig,chartType,thisChartData, fundNames,fundVendors,showError)
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
				var vend = itm["ISIN"]
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
						previous = item["ISIN"];
						dateComparison.push(item["Date"]);
					}
					//  itemNo != 0
					
					if(previous!=item["ISIN"]){
						dateComparison.push(item["Date"]);
						j++;
						if(j==hardcodedseries.length+1) break;
						previous = item["ISIN"];
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
		
	if (plot) {
		//pushing the series into the chartConfig	
		for(var i=0; i<serieses.series.length; i++){
			for(var j=0;j<serieses.series[i].data.length; j++){
					serieses.series[i].data[j][0] = dates[j];
			}
			chartConfig.series.push(serieses.series[i]);
		}	
		
//		console.log('serieses', serieses)
		chartConfig.xAxis.tickPositions = tickPointsCalculation(serieses.series[0]);
		chartConfig.yAxis.min = parseInt(min);
		for(var o=0; o<fundVendorsTemp.length; o++){fundVendors.push(fundVendorsTemp[o]);}
		for(var k=0; k<fundNamesTemp.length; k++){fundNames.push(fundNamesTemp[k]);}
		return chartConfig;
	}
	else {	
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


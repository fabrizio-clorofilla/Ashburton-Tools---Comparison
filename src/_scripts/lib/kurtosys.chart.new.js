var KSCHART = (function() {

	var Cls = function() {};

	Cls.getSerieses = function(res,obj,unscaled) {
	
		var oChartData = {dropped: []};
		var aChartValues = res.Tables[0].Rows;
		var aChartDetails = res.Tables[1].Rows;
		var aDroppedSerieses = res.Tables[2].Rows;
		var aMinMax = res.Tables[3].Rows;
		var valueLabel = null;
		var minValue = aMinMax[0].MinValue;
		var maxValue = aMinMax[0].MaxValue;

		(unscaled == true) ? valueLabel = 'UnscaledValue': valueLabel = 'Value';

		for(var i=0; i<aChartDetails.length; i++){
			var elm = aChartDetails[i];
			if(!oChartData.hasOwnProperty(elm.ItemId)){
				oChartData[elm.ItemId] = new Series();
			}
		}

		for(var i=0; i<aChartValues.length; i++){
			var elm = aChartValues[i];
			var elm_ = [];
			// if(i==0) { elm_.push(moment(elm.Date,"DD/MM/YYYY").add(1,'day').valueOf()); }
			// else { elm_.push(moment(elm.Date,"DD/MM/YYYY").valueOf()); }
			elm_.push(moment(elm.Date,"DD/MM/YYYY").valueOf());
			elm_.push(parseFloat(elm[valueLabel]));
			oChartData[elm.VendorId].data.push(elm_);
		}

		for(series in oChartData){
			if(oChartData.hasOwnProperty(series)){
				
			}
		}

		function Series() {
			this.id = null;
			this.identifier = null;
			this.name = null;
			this.ext_name = null;
			this.color = null;
			this.zIndex = 0;
			this.data = [];
			this.showInLegend = true;
			this.currency = null;
		}

		for(var i=0; i<aChartDetails.length; i++){
			oChartData[aChartDetails[i].ItemId].identifier = aChartDetails[i].ItemId || '';
			oChartData[aChartDetails[i].ItemId].name = aChartDetails[i].Name || '';
			oChartData[aChartDetails[i].ItemId].currency = aChartDetails[i].CurrencyId || '';
		}

		if(obj == false){
			var aChartData = [];
			for(series in oChartData){
				aChartData.push(oChartData[series]);
			}
			return aChartData;
		}

		for(var i=0; i<aDroppedSerieses.length; i++){
			oChartData.dropped.push(aDroppedSerieses[i].ShortName);
		}

		oChartData.minValue = minValue;
		oChartData.maxValue = maxValue;

		// Stores names of dropped serieses


		return oChartData;
	}

	Cls.drawLineChart = function(target,chartConfig,title,subtitle,serieses) {
	
		var config = jQuery.extend(true, {}, chartConfig);
		for (var i=0; i<serieses.length; i++) {
			if(serieses[i].identifier) config.xAxis.tickPositions = tickPointsCalculation(serieses[i]);
		}
		config.chart.renderTo = target;
		config.title.text = title;
		config.subtitle.text = subtitle;
		for(var i=0; i<serieses.length; i++) config.series.push(serieses[i]);

		return new Highcharts.Chart(config);
	}

	Cls.drawBarChart = function(target,chartConfig,title,subtitle,categories,serieses) {
	
		var config = jQuery.extend(true, {}, chartConfig);
		config.chart.renderTo = target;
		config.title.text = title;
		config.subtitle.text = subtitle;
		config.xAxis.categories = categories;
		config.series = serieses;

		return new Highcharts4.Chart(config);

	}

	function tickPointsCalculation (poSer) {
		// ---  Draws tickpoints if series length is recognized in 13,37,61 entries
		var tickPoints = [];
		var tickJumps = {
			"13" : 2,
			"36" : 6,
			"37" : 6, 
			"60" : 12,
			"61" : 12,
			"120": 24,
			"121": 24
		};
		var sLength = poSer.data.length;
		var jump = tickJumps[sLength] || null;
		if (jump) {
			for(var i=0; (i*jump)<(sLength+1); i++){
				if(poSer.data[i*jump]!=undefined){
					tickPoints.push(poSer.data[i*jump][0]);
				}
				else{
					tickPoints.push(poSer.data[i*jump-1][0]);
				}
			}
		}
		else {
			// ---  Draws tickpoints dynamically if series length is not recognized in 4,7,13,37,61 entries
			var maxTicks = 9;
			var adaptiveTicks = 6;
			if (sLength <= maxTicks) {
				for (var i=0; i<sLength; i++) {
					tickPoints.push(poSer.data[i][0]);
				}
			}
			else {
			  tickJump = (sLength-1)/(adaptiveTicks-1);
			  tickPoints.push(poSer.data[0][0]);
				for ( var i = 1; i < adaptiveTicks; i++ ) {
					tickPoints.push(poSer.data[Math.round(tickJump*i)][0]);
				}
			}
			if(moment(tickPoints[tickPoints.length-1]).diff(moment(tickPoints[tickPoints.length-2]),'days')<15) tickPoints.splice(tickPoints.length-2, 1);
		}
		
		return tickPoints;
	}

	return Cls;
})();


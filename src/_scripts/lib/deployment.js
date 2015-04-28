// PROD Deployment config 
var Deployment = {
	SITE_URL: 'mandg.co.uk',
	FUNDS_LIST_COMMA_SEPARATED: 'F0GBR04FIS,F0GBR04FIU',
	DataSource: {
		lunchDate: 'WAITING_FOR',
		performanceChart: '558a02e4-43a3-47f2-a2ff-9927070058d3',
		performanceTabs: '930c0c0b-3b0b-42e5-909f-f7a39432b67f'
	},
	// default widget config
	Config: {
		CompanyID: "255",
		Country: "232",
		Language: "1"
	}
}

Deployment.URL = {
	launchDate: function() {
		return '';
	},
	tabsData: function() {
		return '//ashburtontools.kurtosysweb.com/KAPI/Wrapper.aspx?provider=156live&datasource='+Deployment.DataSource.performanceTabs+'&params=<Parameters><Parameter Name="IdList" Type="StringLong" Value="'+Deployment.FUNDS_LIST_COMMA_SEPARATED+'"/><Parameter Name="Universe" Type="StringShort" Value=""/><Parameter Name="CompanyID" Type="StringShort" Value="255"/>';	
	},
	chartData: function(years, isin) {
		var now = moment().format('YYYYMMDD');
		var years = 5;
		var fromDate = moment().subtract('years', years).subtract('months', 1).format('YYYYMMDD');
		return '//ashburtontools.kurtosysweb.com/KAPI/Wrapper.aspx?provider=156live&datasource='+Deployment.DataSource.performanceChart+'&params=<Parameters><Parameter Name="IdList" Type="StringLong" Value="'+Deployment.FUNDS_LIST_COMMA_SEPARATED+'"/><Parameter Name="Universe" Type="StringShort" Value=""/><Parameter Name="FromDate" Type="StringShort" Value="'+fromDate+'"/><Parameter Name="ToDate" Type="StringShort" Value="'+now+'"/><Parameter Name="rebasedvalue" Type="StringShort" Value="100"/></Parameters>';
	}
}
// Config
var MANDG_X1 = {}; 
MANDG_X1.Config = {
	SITE_URL: '//preview.devel-01.sol.kurtosys.com',
	ServiceURL: '//fe2.jpmorgan.com',
	FUNDS_LIST_COMMA_SEPARATED: 'F0GBR04FIS,F0GBR04FIU',
	DataSource: {
		lunchDate: 'WAITING_FOR',
		performanceChart: '558a02e4-43a3-47f2-a2ff-9927070058d3',
		performanceTabs: '930c0c0b-3b0b-42e5-909f-f7a39432b67f'
	},
	// default widget config
	Params: {
		Country: "",
		Website: "",
		Language: "",
		ISIN: "",
		Benchmark: "",
		Sector: "",
		Category: "",
		PerfType: ""
	}
}

MANDG_X1.Config.URL = {
	launchDate: function() {
		return '';
	},
	tabsData: function() {
		return MANDG_X1.Config.ServiceURL+'/KAPI/Wrapper.aspx?provider=156live&datasource='+MANDG_X1.Config.DataSource.performanceTabs+'&params=<Parameters><Parameter Name="IdList" Type="StringLong" Value="'+MANDG_X1.Config.Params.ISIN+'"/><Parameter Name="Universe" Type="StringShort" Value=""/><Parameter Name="CompanyID" Type="StringShort" Value="255"/>';	
	},
	chartData: function(years, isin) {
		var now = moment().format('YYYYMMDD');
		var years = 5;
		var fromDate = moment().subtract('years', years).subtract('months', 1).format('YYYYMMDD');
		return MANDG_X1.Config.ServiceURL+'/KAPI/Wrapper.aspx?provider=156live&datasource='+MANDG_X1.Config.DataSource.performanceChart+'&params=<Parameters><Parameter Name="IdList" Type="StringLong" Value="'+MANDG_X1.Config.Params.ISIN+'"/><Parameter Name="Universe" Type="StringShort" Value=""/><Parameter Name="FromDate" Type="StringShort" Value="'+fromDate+'"/><Parameter Name="ToDate" Type="StringShort" Value="'+now+'"/><Parameter Name="rebasedvalue" Type="StringShort" Value="100"/></Parameters>';
	}
}
//console.time('FE2Widget');

// FE2 Widget config
var JQ_VERSION = '1.10.1';
// var JQ_VERSION = '2.0.3';
var WL_APPNAME = 'MANDG-X1';
var WL_HOST = '//preview.devel-01.sol.kurtosys.com'

var WL_CSSFILES = [
	WL_HOST+"/build/ks.ff.style.css"
];

var WL_JSFILES = [
	'//cdnjs.cloudflare.com/ajax/libs/es5-shim/2.1.0/es5-shim.min.js',
	WL_HOST+'/build/mandx.x1.app.js'
];


// Load widget.loader
var WIDGET_LOADER = WL_HOST+'/_scripts/lib/widget.loader.min.js';
var wl=document.createElement("script");wl.type="text/javascript";wl.src=WIDGET_LOADER;document.body.appendChild(wl)

/**
 * @namespace Utils
 *
 * @description
 * Helper functions for FF
 *
 */

// global object for FF
window.KS = {};
var KS$ = jQuery.noConflict();
var $ = jQuery.noConflict();

Array.prototype.clone = function() {
	return this.slice(0);
};
/*
Array.prototype.sort = function(a, b) {
  var splitter = /^(\d+)([A-Z]*)/;
  a = a.id.match(splitter); b = b.id.match(splitter);
  var anum = parseInt(a[1], 10), bnum = parseInt(b[1], 10);
  if (anum === bnum)
    return a[2] < b[2] ? -1 : a[2] > b[2] ? 1 : 0;
  return anum - bnum;     
};
*/
// range - returns array with length of i
// see: http://www.cappuccino-project.org/blog/2010/03/internet-explorer-global-variables-and-stack-overflows.html
(function(){
	
	var range = function(i) {
		return parseInt(i)?range(i-1).concat(parseInt(i)):[];
	};
	window.KS.range = range;
	
})();

window.KS.parseDate = function(d) {
	if(d!=''){
		return Date.parse(d);
	}
};

window.KS.isIE = function() {
	var myNav = navigator.userAgent.toLowerCase();
	return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
};

window.KS.isTouch = function() {
	return KS$('html').hasClass('touch');
};

var indexOf = function(needle) {
	if(typeof Array.prototype.indexOf === 'function') {
		indexOf = Array.prototype.indexOf;
	} else {
		indexOf = function(needle) {
			var i = -1, index = -1;

			for(i = 0; i < this.length; i++) {
				if(this[i] === needle) {
					index = i;
					break;
				}
			}

			return index;
		};
	}

	return indexOf.call(this, needle);
};

window.KS.onUserClick = function(el) {
	if(window.KS.isTouch()){

		// TODO test on iOS6
		// http://stackoverflow.com/questions/3272089/programmatically-selecting-text-in-an-input-field-on-ios-devices-mobile-safari
		setTimeout(function() {
			el.setSelectionRange(0, 9999);
		}, 1);
		
	} else {
		KS$(el).select();	
	}
};

window.KS.needXDomain = function(siteURL) {
	return siteURL.replace("//","").replace("https:","").replace("http:","") != window.location.hostname;
};


// Create elements for IE8
document.createElement('TEXT');
document.createElement('TYPEAHEAD-POPUP');
document.createElement('LEGEND');
document.createElement('NG-PROGRESS');

loadCSS = function(files) {
	for (var i = files.length - 1; i >= 0; i--) {
		var fileref=document.createElement("LINK");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", files[i]);
		document.body.appendChild(fileref);
	};
}
loadCSS(WL_CSSFILES);

window.LoadAngular = function() {
	setTimeout(function() {
		//console.log('ang')
		var angularTag = document.createElement('SCRIPT');
		angularTag.type = 'text/javascript';
		
		//angularTag.src = '//ajax.googleapis.com/ajax/libs/angularjs/'+NG_VERSION+'/angular.js';
		// angular 1.2.1 cannot handle XD ajax requests on IE8/9. Created a new fork from that version and updated with XDR request
		// https://github.com/angular/angular.js/pull/1047#issuecomment-25023290

		//angularTag.src = '//__DEPLOYMENTURL__/_scripts/lib/angular-xdomain-fixed.js'; // for local
		angularTag.src = '//__DEPLOYMENTURL__/_scripts/angular-xdomain-fixed.js'; // for ts03, uat, prod

		document.body.appendChild(angularTag);
		if(angularTag.addEventListener) {
			angularTag.addEventListener("load",function() {
					LoadWidget();
				},false);
			} 
		else if(angularTag.readyState) {
			angularTag.onreadystatechange = function() {
				if (this.readyState == 'complete' || this.readyState == 'loaded') {
					LoadWidget();
				}
			};
		}
	}, 0);
}

var mandg_x1_widget = document.querySelector('.mandg-x1-widget');

if(typeof jQuery=='undefined') {

	setTimeout(function() {

		/*
		if(mandg_x1_widget != null){
			mandg_x1_widget.innerHTML = 'Loading...';
			mandg_x1_widget.style.cssText = 'min-width: 200px; min-height: 25px; background: #fff url(//__DEPLOYMENTURL__/_files/ajax-loader.gif) no-repeat center center; text-align: center; font-family: Amplitude-Light, "Amplitude Light", arial; font-size: 16px; padding-top: 100px';
		}
		*/

		var jqTag = document.createElement('SCRIPT');
		jqTag.type = 'text/javascript';
		jqTag.src = '//ajax.googleapis.com/ajax/libs/jquery/'+JQ_VERSION+'/jquery.js';
		if(jqTag.addEventListener) {
			jqTag.addEventListener("load",function() {
				//console.log('loadang')
				window.LoadAngular();
			},false);
		} 
		else if(jqTag.readyState) {
			//console.log('readyState')
			jqTag.onreadystatechange = function() {
				if (this.readyState == 'complete' || this.readyState == 'loaded') {
					//console.log('loadang')
					window.LoadAngular();
				}
			};
		}
		document.body.appendChild(jqTag);
	}, 0);

} else {

	/*
	if(mandg_x1_widget != null){
		mandg_x1_widget.innerHTML = 'Loading...';
		mandg_x1_widget.style.cssText = 'min-width: 200px; min-height: 25px; background: #fff url(//__DEPLOYMENTURL__/_files/ajax-loader.gif) no-repeat center center; text-align: center; font-family: Amplitude-Light, "Amplitude Light", arial; font-size: 16px; padding-top: 100px';
	}
	*/

	window.LoadAngular();
}

LoadWidget = function() {

	//console.log('widget')
	
	var loadJS = {
		idx: -1,
		success: function() {
			if(mandg_x1_widget != null){
				mandg_x1_widget.style.cssText='';
			}
			if(angular.element('.mandg-x1-widget').length != 0){
				angular.bootstrap(angular.element('.mandg-x1-widget'), [WL_APPNAME]);
			} else {
				angular.bootstrap(document, [WL_APPNAME]);
			}
			
		},
		load: function(jsfiles){

			loadJS.idx++;

			//console.log('loading', jsfiles);
			if(typeof jsfiles == 'string') {
				

				if(loadJS.idx <= loadJS.jsfiles.length) {

					var jqTag = document.createElement('SCRIPT');
					jqTag.type = 'text/javascript';
					jqTag.src = jsfiles;
					if(jqTag.addEventListener) {
						jqTag.addEventListener("load",function() {
							////console.log('loaded', jsfiles);
							////console.log('---------------- Loading ', loadJS.idx, '/',  loadJS.jsfiles.length, '---------------------')
							if(loadJS.idx == loadJS.jsfiles.length){
								loadJS.success();
							} else {
								loadJS.load(loadJS.jsfiles[loadJS.idx]);
							}
						},false);
					} 
					else if(jqTag.readyState) {
						jqTag.onreadystatechange = function() {
							if (this.readyState == 'complete' || this.readyState == 'loaded') {
								////console.log('loaded', jsfiles);
								////console.log('----------------', loadJS.idx, loadJS.jsfiles.length, '---------------------')
								if(loadJS.idx == loadJS.jsfiles.length){
									loadJS.success();
								} else {
									loadJS.load(loadJS.jsfiles[loadJS.idx]);
								}
							}
						};
					}
					document.body.appendChild(jqTag);
				}



				if(loadJS.idx >= loadJS.jsfiles.length){

				}

				
			} else {
				////console.log('arr')
				loadJS.jsfiles = jsfiles;
				loadJS.load(jsfiles[loadJS.idx]);
			}
		}
	}


	loadJS.load(WL_JSFILES)

}


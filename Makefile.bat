@echo off
set deployment=%1
ECHO Building files for %deployment%...
REM Delete all previously built files
del /Q build\*

REM ---------------- Concat CSS files to build\sdchart.styles.css ----------------
echo BUILDING STATIC DYNAMIC CHART CSS...
echo /* Built with Makefile.bat. If possible, do not change this file directly. */ > build\_styles\sdchart.styles.css
type _styles\font-awesome.min.css >> build\_styles\sdchart.styles.css
type _styles\select2.css >> build\_styles\sdchart.styles.css
type _styles\sdchart.common.styles.css >> build\_styles\sdchart.styles.css
type _styles\sdchart.static.styles.css >> build\_styles\sdchart.styles.css
type _styles\sdchart.dynamic.styles.css >> build\_styles\sdchart.styles.css

echo BUILDING STATIC DYNAMIC CHART WIDGET...
REM ---------------- Concat JS files to build\_scripts\sdchart.app.js ----------------
echo /* Built with Makefile.bat. If possible, do not change this file directly. */ > build\_scripts\sdchart.app.js
REM type _scripts\jquery-ui-1.10.4.custom.min.js >> build\_scripts\sdchart.app.js
type _scripts\ks_utils.js >> build\_scripts\sdchart.app.js
type _scripts\jshighcharts.js >> build\_scripts\sdchart.app.js
REM type _scripts\kurtosys.chart.js >> build\_scripts\sdchart.app.js
type _scripts\moment.js >> build\_scripts\sdchart.app.js
type _scripts\numeral_1.5.3.min.js >> build\_scripts\sdchart.app.js
type _scripts\kurtosys.chart.new.js >> build\_scripts\sdchart.app.js
type _scripts\kurtosys.chart.periodselector.js >> build\_scripts\sdchart.app.js
type _scripts\angular-route.js >> build\_scripts\sdchart.app.js
type _scripts\select2.js >> build\_scripts\sdchart.app.js

type sdchart.app.config.js >> build\_scripts\sdchart.app.js

type sdchart.app.angular-translation.js >> build\_scripts\sdchart.app.js
type sdchart.app.js >> build\_scripts\sdchart.app.js
type sdchart.app.templates.js >> build\_scripts\sdchart.app.js
type sdchart.app.filters.js >> build\_scripts\sdchart.app.js
type sdchart.app.directives.js >> build\_scripts\sdchart.app.js
type sdchart.app.services.js >> build\_scripts\sdchart.app.js
type sdchart.app.controllers.js >> build\_scripts\sdchart.app.js

copy sdchart.widget.js build\_scripts\sdchart.widget.js >nul

echo // -- Deployment: %deployment% -- >> build\_scripts\sdchart.app.js


REM ---------------- Updating aspx fixes with deployment URL --------------------
if "%deployment%" == "local" (
	set DEPLOYMENTURL=https://localhost
)
if "%deployment%" == "localKS" (
	set DEPLOYMENTURL=https://192.168.4.142:8800
)
if "%deployment%" == "devel-01" (
	set DEPLOYMENTURL=http://preview.devel-01.sol.kurtosys.com
)
if "%deployment%" == "uat" (
	set DEPLOYMENTURL=
)
if "%deployment%" == "preview-prod" (
	set DEPLOYMENTURL=https://preview-mandgtools.kurtosysweb.com
)
if "%deployment%" == "prod" (
	set DEPLOYMENTURL=https://mandgtools.kurtosysweb.com
)



utils\fart -q build\_scripts\sdchart.widget.js __DEPLOYMENTURL__ %DEPLOYMENTURL%
utils\fart -q build\_scripts\sdchart.app.js __DEPLOYMENTURL__ %DEPLOYMENTURL%
utils\fart -q build\_styles\sdchart.styles.css __DEPLOYMENTURL__ %DEPLOYMENTURL%



REM ---------------- Widget App/CSS/Loader Minifying --------------------
ECHO Minifying App/CSS/Loader...
if "%deployment%" == "prod" (
	utils\curl -# -d compilation_level=SIMPLE_OPTIMIZATIONS -d output_format=text -d output_info=compiled_code --data-urlencode "js_code@build\_scripts\sdchart.app.js" http://closure-compiler.appspot.com/compile > build\_scripts\sdchart.app.min.js

)
if "%deployment%" == "preview-prod" (
	REM utils\curl -# -d compilation_level=WHITESPACE_ONLY -d output_format=text -d output_info=compiled_code --data-urlencode "js_code@build\_scripts\sdchart.app.js" http://closure-compiler.appspot.com/compile > build\_scripts\mandg.x1.app.min.js
)


REM ---------------- Copying files to DEVEL-01 --------------------
if "%deployment%" == "devel-01" (
	ECHO Copying files to devel-01...
	copy _scripts\angular-xdomain-fixed.js \\devel-01\wdrive\preview\_scripts\angular-xdomain-fixed.js >nul
	copy build\_scripts\sdchart.app.js \\devel-01\wdrive\preview\_scripts\sdchart.app.js >nul
	copy build\_scripts\sdchart.widget.js \\devel-01\wdrive\preview\_scripts\sdchart.widget.js >nul
	copy build\_styles\sdchart.styles.css \\devel-01\wdrive\preview\_styles\sdchart.styles.css >nul

	copy sdchart.static.aspx \\devel-01\wdrive\preview\sdchart.static.aspx >nul
	copy sdchart.static.ytoy-tab.aspx \\devel-01\wdrive\preview\sdchart.static.ytoy-tab.aspx >nul
	copy sdchart.static.calyr-tab.aspx \\devel-01\wdrive\preview\sdchart.static.calyr-tab.aspx >nul
	copy sdchart.static.html \\devel-01\wdrive\preview\sdchart.static.html >nul

	copy sdchart.dynamic.aspx \\devel-01\wdrive\preview\sdchart.dynamic.aspx >nul
	copy sdchart.dynamic.ytoy-tab.aspx \\devel-01\wdrive\preview\sdchart.dynamic.ytoy-tab.aspx >nul
	copy sdchart.dynamic.calyr-tab.aspx \\devel-01\wdrive\preview\sdchart.dynamic.calyr-tab.aspx >nul
	copy sdchart.dynamic.cum-tab.aspx \\devel-01\wdrive\preview\sdchart.dynamic.cum-tab.aspx >nul
	copy sdchart.dynamic.risk-tab.aspx \\devel-01\wdrive\preview\sdchart.dynamic.risk-tab.aspx >nul
	copy sdchart.dynamic.typeahead.aspx \\devel-01\wdrive\preview\sdchart.dynamic.typeahead.aspx >nul
	copy sdchart.dynamic.typeahead-match.aspx \\devel-01\wdrive\preview\sdchart.dynamic.typeahead-match.aspx >nul
	copy sdchart.dynamic.html \\devel-01\wdrive\preview\sdchart.dynamic.html >nul

	copy index.html \\devel-01\wdrive\preview\index.html >nul
) else if "%deployment%" == "uat" if "%deployment%" == "prod" (
ECHO off)


ECHO Build complete for %deployment%

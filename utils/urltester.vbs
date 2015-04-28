Set HttpRequest = CreateObject("Msxml2.XMLHTTP")
HttpRequest.open "HEAD", WScript.Arguments(0), False
On Error Resume Next
HttpRequest.send
If Err.Number <> 0 Then
	WScript.Echo "Error : " & Err.Number & ": " & Err.Description
Else
	WScript.Echo "HTTP status: " & WScript.Arguments(0) & " " & HttpRequest.status & " " & HttpRequest.statusText
End If
REM cscript /nologo urltester.vbs http://google.com

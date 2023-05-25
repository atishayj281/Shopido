if(sessionStorage['isAdmin'] === 0 || !sessionStorage['isAdmin']) {
	alert('Not Authorised')
	window.location = "http://127.0.0.1:5500/FrontEnd/view/auth.html"
}
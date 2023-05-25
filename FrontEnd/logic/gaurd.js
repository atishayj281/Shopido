console.log(localStorage['id']);
if(localStorage['id'] == null || localStorage['id'] == undefined) {
	window.location = "http://127.0.0.1:5500/FrontEnd/view/auth.html"
}
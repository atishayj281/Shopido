
const submit = document.getElementById("submit");
var images = []
var imageUrls = []
var BASE_URL = "http://localhost:1234"
const firebaseConfig = {
	apiKey: "AIzaSyCT7rCu7DH9GycXRQSHrKUY8mkkNskdTJg",
	authDomain: "shopido-b4134.firebaseapp.com",
	databaseURL: "https://shopido-b4134-default-rtdb.firebaseio.com",
	projectId: "shopido-b4134",
	storageBucket: "shopido-b4134.appspot.com",
	messagingSenderId: "901678716880",
	appId: "1:901678716880:web:a6b36e83ff8667c5244bd5",
	measurementId: "G-FT3D27GEJW"
};
    
firebase.initializeApp(firebaseConfig);

var imagesButton = document.getElementById("prod-image")
const name = document.getElementById("prod-name")
var description = document.getElementById("description")
var price = document.getElementById("prod-price")
var discount = document.getElementById("prod-discount")
var highlights = document.getElementById("prod-heighlights")
var category = document.getElementById("prod-category");
submit.addEventListener("click", () => {
	console.log("Started");
	// var features = document.getElementById("prod-features")

	imageUrls = []
	console.log(images);
	for(var i = 0; i < images.length; i++) {
		uploadImageAsPromise(images[i])	
	}
	// console.log(name.value);
	console.log(`Image Uploaded At: ${imageUrls[i]}`);
			if(i == images.length - 1) {
				// addProduct(name.value, description.value, price.value, discount.value, highlights.value, category.value);
			}
})

function addProduct(name, description, price, discount, highlights, category){
	// console.log("name");
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	// console.log("raw");

	var raw = JSON.stringify({
		"name": name,
		"description": description,
		"price": "₹"+price,
		"dicount": "₹"+discount,
		"rating": "4.5",
		"highlights": highlights,
		"images": imageUrls,
		"features": "",
		"category": category
	});


	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	console.log(raw);
	fetch(`${BASE_URL}/addProduct`, requestOptions)
		.then(response => response.json())
		.then(result => {
			console.log(result);
			alert("Product Added Succefully")
			// alert(result.data.message);
			// window.open(`http://127.0.0.1:5500/FrontEnd/view/invoice.html?o=${result.data.data}`);
		})
		.catch(error => alert("Something went wrong"));
}

//Listen for file selection
imagesButton.addEventListener('change', function (e) {
	//Get files
	// images = []
	for (var i = 0; i < e.target.files.length; i++) {
		// var imageFile = e.target.files[i];
		console.log(i);
		// uploadImageAsPromise(imageFile);
		images.push(e.target.files[i]);
	}
});

//Handle waiting to upload each file using promise
function uploadImageAsPromise(imageFile) {
	return new Promise(function (resolve, reject) {
		console.log("Image upload started");
		var storageRef = firebase.storage().ref("images" + "/" + imageFile.name);

		//Upload file
		var task = storageRef.put(imageFile);

		//Update progress bar
		task.on('state_changed',
			function progress(snapshot) {
				var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
				console.log(percentage);
			},
			function error(err) {
				console.log(err);
			},
			function complete() {
				console.log(task);
				task.snapshot.ref.getDownloadURL().then((downloadURL) => {
					console.log('File available at', downloadURL);
					imageUrls.push(downloadURL);
					console.log(imageUrls);
					if(imageUrls.length === images.length) {
						addProduct(name.value, description.value, price.value, discount.value, highlights.value, category.value);
					}
				});
				
			}
		);
	});
}
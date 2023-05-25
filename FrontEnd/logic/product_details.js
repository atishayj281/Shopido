if(sessionStorage['id'] == null || sessionStorage['id'] == undefined) {
	window.location = "http://127.0.0.1:5500/FrontEnd/view/auth.html"
}

const BASE_URL = "http://localhost:1234"
const custId = localStorage['id']
const category = sessionStorage['category']
const prodId = sessionStorage['productId']
init()

function init() {
	setFeaturedProducts();
	getProductDetails();
	startHamburgerMenu();
	handleAddToCart();
}


function handleAddToCart(){
	document.getElementById("add-to-cart-btn").addEventListener("click", ()=>{
		var options = {
			prodId: prodId,
			custId: custId,
			quantity: parseInt(document.getElementById("quantity").value),
			Category: category,
		}
		fetch(`${BASE_URL}/addToCart`, {
			method: "POST",
			body: JSON.stringify(options),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			.then(response => response.json())
			.then(response => {
				alert(response.data.message)
				console.log(response);
			})
			.catch(error => console.log(error)) ;
	})
}

function startHamburgerMenu() {
	const bar = document.getElementById('bar')
	const nav = document.getElementById('navbar')
	const close = document.getElementById('close')
	if (bar) {
		bar.addEventListener('click', () => {
			nav.classList.add('active');
		})
	}

	if (close) {
		close.addEventListener('click', () => {
			nav.classList.remove('active')
		})
	}
}

function setProductImages(img) {
	let imageGroup = document.getElementsByClassName("carousel-inner")[0]
	for (let i = 1; i <= img.length && i <= 4; i++) {
		console.log(img[i])
		let curImg = (img[i].url).replace("128/128", "832/832");
		let image = document.createElement("div")
		image.classList.add("carousel-item");
		if (i == 1) {
			image.classList.add("active")
		}
		image.innerHTML = `<img class="d-block w-100" src=${curImg} alt="First slide" height="700vh" style="object-fit: contain">`
		imageGroup.appendChild(image)
		console.log(imageGroup)
	}
}

function setProductFeatures(feature) {

	console.log(`${feature}`)
	let features = JSON.parse(`${feature.replaceAll(`'`, `"`).replaceAll(`\n`, ``)}`)
	if (features != undefined) {
		let featureTable = document.getElementById("product-features")
		for (let i = 0; i < features.length - 1; i++) {
			var row = document.createElement("tr")
			row.className = "row"
			let h1 = ""
			let h2 = ""
			let v1 = ""
			let v2 = ""
			// console.log(features[i])
			h1 = features[i].key
			console.log(features[i].key)
			console.log(features[i].value)
			for (let j = 0; j < features[i].value.length; j++) {
				v1 = v1 + features[i].value[j];
			}
			row.innerHTML = `<th>${h1}</th>
						<td>${features[i].value}</td>`
			featureTable.appendChild(row)
		}

	}
}

function setProductDetails(product) {
	let product_name = document.getElementById("product-name")
	let price = document.getElementById("price")
	let productDetailsText = document.getElementById("product-details-text")
	let stockText = document.getElementById("stock");
	stockText.textContent = product.stock_count
	product_name.textContent = product.name
	price.textContent = product.price
	productDetailsText.textContent = product.about;
	setProductImages(product.images);
	setProductFeatures(product.features);
}

async function getProductDetails() {
	var url = `http://localhost:1234/getProductById?uid=${custId}&category=${category}&product_id=${prodId}`
	console.log(url)
	try {
		fetch(url)
			.then(res => res.json())
			.then(res => {
				console.log(res);
				var product = res.data;
				setProductDetails(product);
			});
	} catch (err) {
		console.log(err)
	}
}


function setFeaturedProducts() {
	let pro_container = document.getElementById("prod-container");
	for (let i = 0; i <= 3; i++) {
		let child = document.createElement("div");
		child.className = "pro";
		child.id = `product-${i}`;
		let img = "/assets/img/products/f1.jpg"
		child.innerHTML = `<div><img src="${img}" alt=""></div>
					      <div class="des">
						      <span>addidas</span>
						      <h5>Cartoon Astronaut T-shirts</h5>
						      <div class="star">
						      <i class='bx bxs-star'></i>
						      <i class='bx bxs-star'></i>
						      <i class='bx bxs-star'></i>
						      <i class='bx bxs-star'></i>
						      <i class='bx bxs-star'></i>
						      </div>
						      <h4>$78</h4>
					      </div>
					      <a href="#"><box-icon name='cart' type='solid' color='#08ea94' class="add-to-cart-btn" ></box-icon></a>
				      `;
		pro_container.appendChild(child);
		child.addEventListener("click", () => {
			alert(`${child.id}`);
			console.log(`${child.id}`);
		});
	}
}

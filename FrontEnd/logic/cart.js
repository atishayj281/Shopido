if(sessionStorage['id'] == null || sessionStorage['id'] == undefined) {
	window.location = "http://127.0.0.1:5500/FrontEnd/view/auth.html"
}


let custId = localStorage['id']
let cart = []
let products = []
var totalPrice = 0;

window.onload = function () {
	init();
}

function getAPIKEY() {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		"uid": custId
	});

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	return fetch(`${BASE_URL}/getKEY`, requestOptions)
}

function createOrder(amount, currency, receipt, notes) {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		"uid": custId,
		"amount": amount,
		"currency": currency,
		"receipt": receipt,
		"notes": notes
	});

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	return fetch(`${BASE_URL}/createOrder`, requestOptions)
}

function setOrder(paymentId, signature, orderId) {
	var paymentId = paymentId;
	var signature = signature;
	var productIdList = []
	var quantityList = []
	var categoryList = []
	cart.forEach(item => {
		productIdList.push(item.prod_id);
		quantityList.push(item.quantity);
		categoryList.push(item.category);
		// console.log(item)
	})
	console.log(productIdList);
	console.log(quantityList);
	console.log(categoryList);
	orderProduct(custId, productIdList, paymentId, signature, quantityList, categoryList);
}

function init() {
	startHamburgerMenu();
	getCartProducts(custId);
	document.getElementById("checkout").addEventListener("click", () => {
		setTotal();
		getAPIKEY()
			.then(response => response.json())
			.then(result => {
				var apiKEY = result.data;
				console.log(apiKEY)
				createOrder(totalPrice * 100, "INR", ``, "")
					.then(response => response.json())
					.then(result => {
						console.log(result);
						var OrderResult = result.data;
						var orderID = OrderResult.id;
						var options = {
							"key": apiKEY, // Enter the Key ID generated from the Dashboard
							"amount": totalPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
							"currency": "INR",
							"name": "Shopido", //your business name
							"description": "Test Transaction",
							"image": "/assets/img/shopido-logo.png",
							"order_id": orderID, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
							"prefill": {
								"name": sessionStorage['name'], //your customer's name
								"email": sessionStorage['email'],
								"contact": sessionStorage['phone']
							},
							"notes": {
								"address": "Razorpay Corporate Office"
							},
							"theme": {
								"color": "#663737"
							},
							"handler": function (response) {
								setOrder(response.razorpay_payment_id, response.razorpay_signature, response.razorpay_order_id);
								// alert(response.razorpay_payment_id);
								// alert(response.razorpay_order_id);
								// alert(response.razorpay_signature);
							}
						};
						var rzp1 = new Razorpay(options);
						rzp1.on('payment.failed', function (response) {
							// alert(response.error.code);
							alert(response.error.description);
							// alert(response.error.source);
							// alert(response.error.step);
							// alert(response.error.reason);
							// alert(response.error.metadata.order_id);
							// alert(response.error.metadata.payment_id);
						});
						rzp1.open();
						e.preventDefault();
					})
					.catch(error => console.log('error', error));
			})
			.catch(error => console.log('error', error));

	})
}

function getCartProducts(custId) {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		"custId": custId
	});

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	fetch(`${BASE_URL}/getCartProducts`, requestOptions)
		.then(response => response.json())
		.then(result => {
			console.log(result);
			cart = result.data.data;
			setCartForView(cart);
		})
		.catch(error => console.log('error', error));
}


function setCartForView(cart) {
	cart.forEach(item => {
		getProduct(custId, item.prod_id, item.category).then(result => {
			console.log(result)
			products.push(result.data);

			console.log(cart)
			if (products.length == cart.length) {
				setProducts(products);
			}
		})
			.catch(error => console.log(error));
	})
}

function getProduct(uid, productId, category) {
	var url = `${BASE_URL}/getProductById?uid=${uid}&product_id=${productId}&category=${category}`;
	return fetch(url).then(res => res.json())
}


function setTotal() {
	var total = 0;
	for (let i = 0; i <= products.length - 1; i++) {
		console.log(products[i]);
		if (products[i] != undefined)
			total = total + (parseInt(products[i].price.replace("₹", "").replace(",", "")) * cart[i].quantity)
	}
	document.getElementById("cart-subtotal").textContent = total
	document.getElementById("cart-total").textContent = (total + 40)
	totalPrice = total + 40
}

function setProducts(products) {
	console.log(products)
	let pro_container = document.getElementById("new-product-container");
	for (let i = 0; i <= products.length - 1; i++) {
		var curProduct = products[i];
		if (curProduct == undefined) continue;
		var image = ""
		if (curProduct.images != undefined) {
			var image = curProduct.images[0].url.replace("128/128", "832/832")
			console.log(image)
		}
		let child = document.createElement("div");
		child.className = "pro";
		child.id = `${cart[i].prod_id}${cart[i].category}`;
		child.innerHTML = `
							<div style="height:160px">
							<img src="${image}" alt="">
							</div>
							<div class="des">
								<span>${curProduct.name.split(" ")[0]}</span>
								<h5>${curProduct.name}</h5>
								<div class="star">
								<i class='bx bxs-star'></i>
								<i class='bx bxs-star'></i>
								<i class='bx bxs-star'></i>
								<i class='bx bxs-star'></i>
								<i class='bx bxs-star'></i>
								</div>
								<h4>${curProduct.price}</h4>
							</div>
							<div class="options">
							<div>
							<button id="plus-${cart[i].prod_id}${cart[i].category}"><box-icon name='plus' color='#ffffff' ></box-icon></button>
							<button id="minus-${cart[i].prod_id}${cart[i].category}"><box-icon name='minus' color='#ffffff' ></box-icon></button>
							<button id="check-${cart[i].prod_id}${cart[i].category}"><box-icon name='check' color='#fff8f8' ></box-icon></button>
							</div>
							<label>Count: <span id="count-${cart[i].prod_id}${cart[i].category}">${cart[i].quantity}</span></label>
							</div>`;
		pro_container.appendChild(child);
		let count = document.getElementById(`count-${child.id}`)
		document.getElementById(`plus-${cart[i].prod_id}${cart[i].category}`).addEventListener("click", () => {
			cart[i].quantity = cart[i].quantity + 1
			count.textContent = `${cart[i].quantity}`
		});
		document.getElementById(`minus-${cart[i].prod_id}${cart[i].category}`).addEventListener("click", () => {
			console.log(`${cart[i]} : ${cart[i].category}`);
			if (cart[i].quantity >= 0) {
				cart[i].quantity = cart[i].quantity - 1
			}
			count.textContent = `${cart[i].quantity}`
		});
		document.getElementById(`check-${cart[i].prod_id}${cart[i].category}`).addEventListener("click", () => {
			setTotal();
			console.log(`${cart[i].quantity}`);
		});
	}
	setTotal();
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

function orderProduct(custId, productIdList, paymentId, signature, quantityList, categoryList) {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		"cust_id": custId,
		"prod_ids": productIdList,
		"payment_id": paymentId,
		"signature": signature,
		"quantity": quantityList,
		"categories": categoryList
	});

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	fetch(`${BASE_URL}/orderProduct`, requestOptions)
		.then(response => response.json())
		.then(result => {
			console.log(result);
			// alert(result.data.message);
			window.open(`http://127.0.0.1:5500/FrontEnd/view/invoice.html?o=${result.data.data}`);
		})
		.catch(error => alert("Something went wrong"));
}
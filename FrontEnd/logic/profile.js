
let custId = localStorage['id']
let BASE_URL = "http://localhost:1234"
init();
function init() {
	handleLogout();
	handleSubmit();
	getCustomerData(custId);
	handleTabs();
	getOrderedProducts().then(response => response.json())
		.then(response => {
			console.log(response.data);
			let data = response.data;
			let products = []
			let n = data.length;
			for (let i = 0; i < data.length; i++) {
				if (data[i].category != null) {
					console.log(data[i].category)
					getProductbyId(data[i].prod_id, data[i].category).then(response => response.json())
						.then(response => {
							products.push(response.data);
							if (i == n - 1) {
								setOrderedProducts(products);
							}
						}).catch(error => console.log(error))
				} else {
					n = n - 1;
				}

			}
		}).catch(error => console.log(error))
}

function handleLogout() {
	let logoutBtn = document.getElementById("logout")
	logoutBtn.addEventListener("click", () => {
		localStorage.clear();
		sessionStorage.clear();
		window.location = "http://127.0.0.1:5500/FrontEnd/view/auth.html"
	})
}

function getFormData() {
	var name = document.getElementById("fullName").value
	var contact = document.getElementById("phone").value
	var email = document.getElementById("eMail").value
	var address_line_1 = document.getElementById("address-line-1").value
	var address_line_2 = document.getElementById("address-line-2").value
	var city = document.getElementById("ciTy").value
	var state = document.getElementById("sTate").value
	var pincode = document.getElementById("zIp").value
	var country = document.getElementById("country").value
	var uid = 9
	var is_default = 1
	var isAdmin = 0
	return { uid, name, contact, email, address_line_1, address_line_2, city, state, pincode, country, is_default, isAdmin };
}

function setCustomerData(user) {
	console.log(user)
	var address = user.data.address[0];
	user = user.data.user[0]
	console.log(user)
	console.log(address);
	document.getElementById("fullName").value = user.cust_name
	document.getElementById("phone").value = user.cust_contact
	document.getElementById("eMail").value = user.cust_email
	document.getElementById("address-line-1").value = address.address_line_1
	document.getElementById("address-line-2").value = address.address_line_2
	document.getElementById("ciTy").value = address.city
	document.getElementById("sTate").value = address.state
	document.getElementById("zIp").value = address.pincode
	document.getElementById("country").value = address.country
}

function handleSubmit() {
	document.getElementById("submit").addEventListener("click", () => {
		var data = getFormData();
		fetch("http://localhost:1234/updateProfile", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
			.then(response => response.json())
			.then(json => {
				alert(json.message)
			});
	})
}

function getCustomerData(uid) {
	fetch(`http://localhost:1234/getCustomerById?id=${uid}`).then(response => response.json())
		.then(json => {
			setCustomerData(json)
		})
}

function handleTabs() {
	var profileTab = document.getElementById("profile-tab");
	var orderTab = document.getElementById("orders-tab")
	var profileInputSection = document.getElementById("profile-input-section");
	var orderShowSection = document.getElementById("orders-show-section")
	profileTab.addEventListener("click", () => {
		orderShowSection.classList.add("d-none")
		profileInputSection.classList.remove("d-none");
	})
	orderTab.addEventListener("click", () => {
		orderShowSection.classList.remove("d-none")
		profileInputSection.classList.add("d-none");
	})
}

function getOrderedProducts() {
	var url = `${BASE_URL}/getOrderedProducts`
	var options = {
		cust_id: custId
	}
	return fetch(url, {
		method: "POST",
		body: JSON.stringify(options),
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	});
}

function getProductbyId(id, category) {
	return fetch(`${BASE_URL}/getProductById?uid=${custId}&product_id=${id}&category=${category}`)
}

function setOrderedProducts(products) {
	console.log(products)
	var row = document.getElementById("row");
	for (let i = 0; i < products.length; i++) {
		var product = products[i];
		console.log(product.images)
		let image = ""
		if (product.images.length == 0) {
			image = "../../assets/img/products/f6.jpg"
		} else {
			image = product.images[0].url.replace("128/128", "832/832")
		}
		var child = document.createElement("div")
		child.classList.add("col")
		child.classList.add("d-flex")
		child.classList.add("justify-content-center")
		child.innerHTML = `<div class="card" style="width: 18rem;">
					<img src="${image}" class="card-img-top" alt="...">
					<div class="card-body">
					<h5 class="card-title">${product.name}</h5>
					</div>`
		row.appendChild(child);
		// document.getElementById(`order-${i}`).addEventListener("click", () => {
		// 	alert(`Invoice-${i}`);
		// })
	}

}
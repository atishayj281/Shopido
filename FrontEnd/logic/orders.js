const custId = localStorage['id']

window.onload = function () {
	init();
}

let cart = {}
let products = []

function init() {
	startHamburgerMenu();
	setOrderedProducts();
}

function setOrderedProducts() {
	let pro_container = document.getElementById("new-product-container");
	var url = `http://localhost:1234/getProductByPage?uid=${custId}&page=1&category=television`
	try {
		fetch(url)
			.then(res => res.json())
			.then(res => {
				products = res.data.data;
				for (let i = 0; i <= products.length - 1; i++) {
					var curProduct = products[i];
					var image = curProduct.image_url.replace("128/128", "832/832")
					console.log(curProduct.id)
					let child = document.createElement("div");
					child.className = "pro";
					child.id = `${curProduct.id}`;
					cart[child.id] = 3
					let img = "/assets/img/products/f1.jpg"
					child.innerHTML = `
							<div style="height:160px">
							<img src="${curProduct.image_url}" alt="">
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
							<button id="invoice-${child.id}"><box-icon type='solid' color="#fff" name='report'></box-icon></button>
							</div>
							<label>Count: <span id="count-${child.id}">${cart[child.id]}</span></label>
							</div>`;
					pro_container.appendChild(child);
				}
			});
	} catch (err) {
		console.log(err)
	}
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
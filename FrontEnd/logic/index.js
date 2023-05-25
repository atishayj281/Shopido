const custId = localStorage['id']
const page = 1
const category = "airconditionar"
	init();

	function init() {
		setFeaturedProducts(page, category);
		setNewProducts(page);
		startHamburgerMenu();

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

	function setFeaturedProducts(page, category) {
		console.log(custId + page + category);
		let pro_container = document.getElementById("product-container");
		var url = `http://localhost:1234/getProductByPage?uid=${custId}&page=${page}&category=${category}`
		console.log(url);
		try {
			fetch(url)
			.then(res => res.json())
			.then(res => {
					var products = res.data.data;
					console.log(res);
					for (let i = 0; i <= 3; i++) {
						var curProduct = products[i];
						var image = curProduct.image_url.replace("128/128", "832/832")
						console.log(curProduct.name)
						let child = document.createElement("div");
						child.className = "pro";
						child.id = `${curProduct.id}`;
						let img = "/assets/img/products/f1.jpg"
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
								<a href="#"><box-icon name='cart' type='solid' color='#08ea94' class="add-to-cart-btn" ></box-icon></a>`;
								pro_container.appendChild(child);
								child.addEventListener("click", () => {
									window.location=`http://127.0.0.1:5500/FrontEnd/view/product_details.html?id=${child.id}&category=${category}`
									console.log(`${child.id}`);
								});
					}
			});
		} catch (err) {
			console.log(err)
		}
	}
	

	async function setNewProducts(page) {
		let pro_container = document.getElementById("new-product-container");
		var url = `http://localhost:1234/getProductByPage?uid=${custId}&page=${page}&category=${category}`
		try {
			fetch(url)
			.then(res => res.json())
			.then(res => {
					var products = res.data.data;
					for (let i = 0; i <= 3; i++) {
						var curProduct = products[i];
						var image = curProduct.image_url.replace("128/128", "832/832")
						console.log(curProduct.name)
						let child = document.createElement("div");
						child.className = "pro";
						child.id = `${curProduct.id}`;
						let img = "/assets/img/products/f1.jpg"
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
								<a href="#"><box-icon name='cart' type='solid' color='#08ea94' class="add-to-cart-btn" ></box-icon></a>`;
								pro_container.appendChild(child);
								child.addEventListener("click", () => {
									window.location=`http://127.0.0.1:5500/FrontEnd/view/product_details.html?id=${child.id}&category=${category}`
									console.log(`${child.id}`);
								});
					}
			});
		} catch (err) {
			console.log(err)
		}
	}

const custId = localStorage['id']

init();
function init(){
	// setFeaturedProducts();
	
	startHamburgerMenu();
	setACProducts()
	setClothProducts()
	setMobilesProducts();
	setTelevision();
	setFootwear();
	setFurniture()
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

async function setACProducts() {
	let pro_container = document.getElementById("product-container");
	var url = `http://localhost:1234/getProductByPage?uid=${custId}&page=1&category=airConditionar`
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
								sessionStorage['category'] = "airconditionar"
								sessionStorage['productId'] = child.id;
								console.log(child.id);
								window.location=`http://127.0.0.1:5500/FrontEnd/view/product_details.html?id=${child.id}&category=airConditionar`
								console.log(`${child.id}`);
							});
				}
		});
	} catch (err) {
		console.log(err)
	}
}

async function setClothProducts() {
	let pro_container = document.getElementsByClassName("cloths")[0];
	var url = `http://localhost:1234/getProductByPage?uid=${custId}&page=1&category=cloth`
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
							<div style="height:280px">
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
								sessionStorage['category'] = "cloth"
								sessionStorage['productId'] = child.id;
								window.location=`http://127.0.0.1:5500/FrontEnd/view/product_details.html?id=${child.id}&category=cloth`
								console.log(`${child.id}`);
							});
				}
		});
	} catch (err) {
		console.log(err)
	}
}

async function setMobilesProducts() {
	let pro_container = document.getElementsByClassName("mobile")[0];
	var url = `http://localhost:1234/getProductByPage?uid=${custId}&page=1&category=mobile`
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
							<div style="height:280px">
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
								sessionStorage['category'] = "mobiles"
								sessionStorage['productId'] = child.id;
								window.location=`http://127.0.0.1:5500/FrontEnd/view/product_details.html?id=${child.id}&category=mobiles`
								console.log(`${child.id}`);
							});
				}
		});
	} catch (err) {
		console.log(err)
	}
}

async function setTelevision() {
	let pro_container = document.getElementsByClassName("tv")[0];
	var url = `http://localhost:1234/getProductByPage?uid=${custId}&page=1&category=television`
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
							<div>
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
								sessionStorage['category'] = "television"
								sessionStorage['productId'] = child.id;
								window.location=`http://127.0.0.1:5500/FrontEnd/view/product_details.html?id=${child.id}&category=television`
								console.log(`${child.id}`);
							});
				}
		});
	} catch (err) {
		console.log(err)
	}
}

async function setFootwear() {
	let pro_container = document.getElementsByClassName("footwear")[0];
	var url = `http://localhost:1234/getProductByPage?uid=${custId}&page=1&category=footwear`
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
							<div style="height:280px">
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
								sessionStorage['category'] = "footwear"
								sessionStorage['productId'] = child.id;
								window.location=`http://127.0.0.1:5500/FrontEnd/view/product_details.html?id=${child.id}&category=footwear`
								console.log(`${child.id}`);
							});
				}
		});
	} catch (err) {
		console.log(err)
	}
}

async function setFurniture() {
	let pro_container = document.getElementsByClassName("furniture")[0];
	var url = `http://localhost:1234/getProductByPage?uid=${custId}&page=1&category=furniture`
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
							<div style="height:280px">
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
								sessionStorage['category'] = "furniture"
								sessionStorage['productId'] = child.id;
								window.location=`http://127.0.0.1:5500/FrontEnd/view/product_details.html?id=${child.id}&category=furniture`
								console.log(`${child.id}`);
							});
				}
		});
	} catch (err) {
		console.log(err)
	}
}
var buttons = document.getElementsByTagName('button');
for(let i = 0; i<6;i++){
	buttons[i].addEventListener('click', createRipple);
}

function createRipple(e)
{
  if(this.getElementsByClassName('ripple').length > 0)
    {
      this.removeChild(this.childNodes[1]);
    }
  
  var circle = document.createElement('div');
  this.appendChild(circle);
  
  var d = Math.max(this.clientWidth, this.clientHeight);
  circle.style.width = circle.style.height = d + 'px';
  
  circle.style.left = e.clientX - this.offsetLeft - d / 2 + 'px';
  circle.style.top = e.clientY - this.offsetTop - d / 2 + 'px';
  
  circle.classList.add('ripple');
}

document.getElementById("cloth-btn").addEventListener('click', ()=> {
	sessionStorage['category'] = "cloth"
	window.location = "http://127.0.0.1:5500/FrontEnd/view/product.html"
})

document.getElementById("ac-btn").addEventListener('click', ()=> {
	sessionStorage['category'] = "airconditionar"
	window.location = "http://127.0.0.1:5500/FrontEnd/view/product.html"
})
document.getElementById("mobile-btn").addEventListener('click', ()=> {
	sessionStorage['category'] = "mobile"
	window.location = "http://127.0.0.1:5500/FrontEnd/view/product.html"
})
document.getElementById("tv-btn").addEventListener('click', ()=> {
	sessionStorage['category'] = "television"
	window.location = "http://127.0.0.1:5500/FrontEnd/view/product.html"
})
document.getElementById("footwear-btn").addEventListener('click', ()=> {
	sessionStorage['category'] = "footwear"
	window.location = "http://127.0.0.1:5500/FrontEnd/view/product.html"
})
document.getElementById("furniture-btn").addEventListener('click', ()=> {
	sessionStorage['category'] = "furniture"
	window.location = "http://127.0.0.1:5500/FrontEnd/view/product.html"
})
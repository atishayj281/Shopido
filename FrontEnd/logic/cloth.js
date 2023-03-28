init();
function init(){
	startHamburgerMenu();
	setClothProducts(1);
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

async function setClothProducts(page) {
	let pro_container = document.getElementsByClassName("cloths")[0];
	while (pro_container.hasChildNodes()){
		pro_container.removeChild(pro_container.firstChild)
        }
	var url = `http://localhost:1234/getProductByPage?uid=1&page=${page}&category=cloth`
	try {
		fetch(url)
		.then(res => res.json())
		.then(res => {
				var products = res.data.data;
				for (let i = 0; i <= 7; i++) {
					var curProduct = products[i];
					var image = curProduct.image_url.replace("128/128", "832/832")
					console.log(curProduct.name)
					let child = document.createElement("div");
					child.className = "pro";
					child.id = `${curProduct.id}`;
					let img = "/assets/img/products/f1.jpg"
					child.innerHTML = `
							<div style="height:300px">
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
								window.location=`http://127.0.0.1:5500/FrontEnd/view/product_details.html?id=${child.id}&category=airConditionar`
								console.log(`${child.id}`);
							});
				}
		});
	} catch (err) {
		console.log(err)
	}
}
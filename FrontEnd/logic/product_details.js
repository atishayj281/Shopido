init()

function init(){
	setFeaturedProducts();
	startImagePicker();
}


function setFeaturedProducts() {
	let pro_container = document.getElementById("prod-container");
	for (let i = 0; i <= 3; i++) {
	  let child = document.createElement("div");
	  child.className = "pro";
	  child.id = `product-${i}`;
	  let img = "/assets/img/products/f1.jpg"
	  child.innerHTML = `<img src="${img}" alt="">
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

function startImagePicker(){
	var mainImage = document.getElementById("main_img")
	var img1 = document.getElementsByClassName("prod_image")
	for(let i = 0; i<4; i++) {
		img1[i].onclick = function(){
			mainImage.src = img1[i].src;
		}
	}
}
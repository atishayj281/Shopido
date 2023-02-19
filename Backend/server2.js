const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const clothService = require('./ClothService/clothService')
const ACService = require('./AirConditionar Service/ACService')
const footwearService = require('./FootwearService/footwearService')
const furnitureService = require('./FurnitureService/furnitureService')
const mobileService = require('./MobileService/mobileService')
const tvService = require('./TelevisionService/tvService')
const profileServices = require('./ProfileServices/profileService')
const orderService = require('./OrderService/orderServices')

// Used for sending the Json Data to Node API  
app.use(bodyparser.json());


app.post('/addProduct', (req, res) => {
	var body = req.body
	var id = body.id
	var name = body.name
	var description = body.description
	var price = body.price
	var discount = body.discount
	var rating = body.rating
	var highlights = body.highlights
	var images = body.images
	var features = body.features
	var product = body.Product
	switch(product) {
		case 'airConditioner':
			ACService.addProduct(id, name, description, price, discount, rating, highlights, images, features, req, res)
			return;
		case 'cloth':
			clothService.addProduct(id, name, description, price, discount, rating, highlights, images, features, req, res);
			return;
		case 'tv':
			tvService.addProduct(id, name, description, price, discount, rating, highlights, images, features, req, res)
			return;
		case 'footwear':
			footwearService.addProduct(id, name, description, price, discount, rating, highlights, images, features, req, res)
			return
		case 'furniture':
			furnitureService.addProduct(id, name, description, price, discount, rating, highlights, images, features, req, res)
			return;
		case 'mobile':
			mobileService.addProduct(id, name, description, price, discount, rating, highlights, images, features, req, res)
			return;
	}
})

app.get('/getUserById', (req, res)=>{
	var id = req.query.id;
	if(id == undefined) {
		res.status(400).json({message: "Invalid user id"})
		return;
	}
	profileServices.getUserById(id, req, res)
})

app.get('/getUserAddressById', (req, res)=>{
	var id = req.query.id;
	if(id == undefined) {
		res.status(400).json({message: "Invalid user id"})
		return;
	}
	profileServices.getUserAddressById(id, req, res)
})

app.post("/addAddress", (req, res) => {
	var body = req.body;
	if (!body) {
		res.status(400).json({ message: "Body can not be empty" })
		return;
	}
	profileServices.addAddress(body, req, res);
})

app.post("/createCustomer", (req, res) => {
	var body = req.body
	if (!body) {
		res.status(400).json({ message: "Body can not be empty" })
		return;
	}
	profileServices.addCustomer(body, req, res)
})

app.post("/addToCart", (req, res) => {
	var body = req.body;
	if (!body) {
		res.status(400).json({ message: "Body can not be empty" })
		return;
	}
	var prod_id = parseInt(body.prod_id);
	var cust_id = parseInt(body.cust_id);
	var quantity = parseInt(body.quantity);
	var category = body.category;
	profileServices.addToCart(cust_id, prod_id, quantity, category, req, res)
})

app.post("/getCartProducts", (req, res) => {
	var body = req.body;
	if (!body) {
		res.status(400).json({ message: "Body can not be empty" })
		return;
	}
	var id = body.cust_id;
	profileServices.getCartProducts(id, req, res);
})

app.post("/orderProduct", (req, res) => {
	var body = req.body;
	if (!body) {
		res.status(400).json({ message: "Body can not be empty" })
		return;
	}
	var cust_id = body.cust_id;
	var prod_ids = body.prod_id
	var payment_id = body.payment_id;
	var signature = body.signature;
	var categories = body.categories;
	var quantity = body.quantity
	orderService.orderProduct(cust_id, prod_ids, payment_id, signature, quantity, categories, req, res);
})

app.post("/getOrderedProducts", (req, res) => {
	var body = req.body;
	if (!body) {
		res.status(400).json({ message: "Body can not be empty" })
		return;
	}
	var cust_id = body.cust_id;
	orderService.getOrderedProducts(cust_id, req, res)

})

app.get('/getProductById', (req, res)=>{
	console.log(req.url)
	console.log(req.query.id)
	var id = req.query.id;
	var category = req.query.category
	switch (category) {
		case 'airconditionar':
			ACService.getAirConditionarById(id, res)
			break;
		case 'footwear':
			footwearService.getFootwearById(id, res)
			break;
		case 'furniture':
			furnitureService.getFurnitureById(id, res)
			break;
		case 'mobile':
			mobileService.getMobileById(id, res)
			break
		case 'cloth':
			clothService.getClothById(id, res)
			break
		case 'television':
			tvService.getTelevisionById(id, res);
			break
		default:
			break;
	}
})

app.get('/getProductByPage', (req, res)=>{
	var page = req.query.page;
	var category = req.query.category.toLowerCase();
	switch (category) {
		case 'airconditionar':
			ACService.getACProductsByPage(page, res)
			break;
		case 'footwear':
			footwearService.getPageProducts(page, res)
			break;
		case 'furniture':
			furnitureService.getPageProducts(page, res)
			break;
		case 'mobile':
			mobileService.getPageProducts(page, res)
			break
		case 'cloth':
			clothService.getClothsByPage(page, res)
			break
		case 'television':
			tvService.getPageTelevision(page, res);
			break
		default:
			break;
	}
})


// app.post("/getProductByBrand", (req, res) => {
// 	var body = req.body;
// 	if (!body) {
// 		res.status(400).json({ message: "Body can not be empty" })
// 		return;
// 	}
// 	var brand = body.brand
// 	if (!brand) res.status(400).json({ message: "Please Provide Brand name" });
// 	var query = `Select * from products where prod_id in (select prod_id from brands where brand_name like '${brand}')`;
// 	con.query(query, (err, resp) => {
// 		if (err) res.status(400).json({ message: err.message });
// 		console.table(resp);
// 		res.status(200).json({ data: resp });
// 	})
// })

// app.post("/getProductByCategory", (req, res) => {
// 	var body = req.body;
// 	if (!body) {
// 		res.status(400).json({ message: "Body can not be empty" })
// 		return;
// 	}
// 	var category = body.category
// 	if (!category) res.status(400).json({ message: "Please Provide category name" });
// 	var query = `Select * from products where prod_id in (select prod_id from category where cat_name like '${category}')`;
// 	con.query(query, (err, resp) => {
// 		if (err) res.status(400).json({ message: err.message });
// 		console.table(resp);
// 		res.status(200).json({ data: resp });
// 	})
// })
// 
// 
// app.post("/getProductByCategoryAndBrand", (req, res) => {
// 	var body = req.body;
// 	if (!body) {
// 		res.status(400).json({ message: "Body can not be empty" })
// 		return;
// 	}
// 	var category = body.category
// 	var brand = body.brand;
// 	if (!category) res.status(400).json({ message: "Please Provide category name" });
// 	if (!brand) res.status(400).json({ message: "Please Provide brand name" });
// 	var query = `Select * from products where prod_id in (select prod_id from category where cat_name like '${category}')
// 	and prod_id in (select prod_id from brands where brand_name like '${brand}')`;
// 	con.query(query, (err, resp) => {
// 		if (err) res.status(400).json({ message: err.message });
// 		console.table(resp);
// 		res.status(200).json({ data: resp });
// 	})
// })


app.listen(8081);
console.log('Server is listening on port 8081');
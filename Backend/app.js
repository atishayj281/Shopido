const axios = require('axios');
const { response } = require('express');
const fs = require('fs')
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.json());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.header(
	  "Access-Control-Allow-Headers",
	  "Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.post("/addProduct", (req, res) => {
	var body = req.body
	if(body == null){
		res.status(400).json({message: "Body can not be empty"});
	} else {
		addProduct(body.id, body.name, body.description, body.price, body.discount, body.rating, body.highlights, body.images, body.features, body.category).then(response => {
			console.log(response);
			res.status(response.status).json({message: "Data Added Successfully"});
		}).catch(error => {
			// console.log(error.response.data.message)
			console.log(error);
			res.status(400).json({message: "error.response.data.message"});
		})
	}
})

app.post('/createOrder', (req, res) => {
	var body = req.body;
	if(body == undefined) {
		res.status(400).json({message: "Body can not be empty"});
	} else {
		createOrder(body).then(response => {
			res.status(response.status).json(response.data)
		}).catch(error => {
			// console.log(error.response.data.message)
			res.status(error.response.status).json({message: error});
		})
	}
})

app.post('/updateProfile', (req, res) => {
	var body = req.body;
	if(body == undefined) {
		return res.status(400).json({message: "Body Should not be empty"});
	} else {
		updateCustomer(body).then(response => {
			res.status(response.status).json({message: response.data.message});
		}).catch(function (error) {
			console.log(error.response.data.message)
			res.status(404).json({message: error.response.data.message})
		      });;
	}
})

app.get('/getProductByPage', (req, res) => {
	var body = req.query;
	if(!body) {
		return res.status(400).json({message: "Body Should not be empty"});
	} else {
		getProductsByPage(body.uid, body.page, body.category).then(response => {
			res.status(200).json({data: response.data});
		}).catch(function (error) {
			res.status(error.response.status).json({message: error.response.data.message})
		      });
	}
})

app.get('/getProductById', (req, res) => {
	var body = req.query;
	if(!body) {
		return res.status(400).json({message: "Body Should not be empty"});
	} else {
		getProductById(body.uid, body.product_id, body.category).then(response => {
			res.status(200).json({data: response.data.data});
		}).catch(function (error) {
			res.status(error.response.status).json({message: error.response.data.message})
		      });
	}
})

app.get('/getCustomerById', (req, res) => {
	var body = req.query;
	if(!body) {
		return res.status(400).json({message: "Body Should not be empty"});
	} else {
		getUserById(body.id).then(response => {
			res.status(200).json({data: response.data.data});
		}).catch(function (error) {
			res.status(error.response.status).json({message: error.response.data.message})
		      });
	}
})

app.get('/getCustomerAddressById', (req, res) => {
	var body = req.query;
	if(!body) {
		return res.status(400).json({message: "Body Should not be empty"});
	} else {
		getUserAddressById(body.id).then(response => {
			res.status(200).json({data: response.data});
		}).catch(function (error) {
			res.status(error.response.status).json({message: error.response.data.message})
		      });
	}
})

app.post('/addAddress', (req, res) => {
	var body = req.body;
	if(!body) {
		return res.status(400).json({message: "Body Should not be empty"});
	} else {
		addAddress(body.uid, body.address_line_1, body.address_line_2, body.city, body.state, body.pincode, body.country, body.is_default).then(response => {
			res.status(200).json({data: response.data});
		}).catch(function (error) {
			res.status(error.response.status).json({message: error.response.data.message})
		      });
	}
})

app.post('/createCustomer', (req, res) => {
	var body = req.body;
	if(!body) {
		return res.status(400).json({message: "Body Should not be empty"});
	} else {
		createCustomer(body.cust_name, body.cust_email, body.cust_password, body.cust_contact, body.isAdmin).then(response => {
			res.status(200).json({data: response.data});
		}).catch(function (error) {
			res.status(error.response.status).json({message: error.response.data.message})
		      });
	}
})

app.post('/addToCart', (req, res) => {
	var body = req.body;
	if(!body) {
		return res.status(400).json({message: "Body Should not be empty"});
	} else {
		addToCart(body.prodId, body.custId, body.quantity, body.Category).then(response => {
			res.status(200).json({data: response.data});
		}).catch(function (error) {
			res.status(error.response.status).json({message: error.response.data.message})
		      });
	}
})

app.post('/getCartProducts', (req, res) => {
	var body = req.body;
	if(!body) {
		return res.status(400).json({message: "Body Should not be empty"});
	} else {
		getCartProducts(body.custId).then(response => {
			res.status(200).json({data: response.data});
		}).catch(function (error) {
			res.status(400).json({message: error.response})
		      });
	}
})


app.post("/getOrderedProductsByOrderId", (req, res) => {
	var body = req.body;
	if (!body) {
		res.status(400).json({ message: "Body can not be empty" })
		return;
	}
	var cust_id = body.cust_id;
	var orderId = body.order_id;
	getOrderDetailsByOrderId(cust_id, orderId).then(response => {
		console.log(response.data.data);
		res.status(200).json(response.data.data);
	}).catch(error => {
		console.log(error);
		res.status(200).json({message: error.message})
	});
})

app.post('/orderProduct', (req, res) => {
	var body = req.body;
	if(!body) {
		return res.status(400).json({message: "Body Should not be empty"});
	} else {
		orderProduct(body.cust_id, body.prod_ids, body.payment_id, body.signature, body.quantity, body.categories).then(response => {
			console.log(response);
			res.status(200).json({data: response.data});
		}).catch(function (error) {
			res.status(error.response.status).json({message: error.response.data.message})
		      });
	}
})

app.post('/getOrderedProducts', (req, res) => {
	var body = req.body;
	if(!body) {
		return res.status(400).json({message: "Body Should not be empty"});
	} else {
		getOrderedProducts(body.cust_id).then(response => {
			res.status(200).json({data: response.data.data});
		}).catch(function (error) {
			res.status(error.response.status).json({message: error.response.data.message})
		      });
	}
})

app.post('/getKEY', (req, res) => {
	if(req.body.uid == undefined) {
		res.status(400).json({message: "Invalid User"});
	} else {
		getKEY(req.body.uid).then(response => {
			res.status(response.status).json({data: response.data.key});
		}).catch(error => res.status(error.response.status).json({message: error.response.data.message}))
	}
})

app.post("/getUserIdByEmail", (req, res) => {
	if(req.body.email == undefined) {
		res.status(400).json({message: "Invalid User"});
	} else {
		getUserIdByEmail(req.body.email).then(response => {
			console.log(response.data.data[0])
			res.status(200).json(response.data.data[0]);
		}).catch(error => {
			res.status(400).json({message: error})
		})
	}
})

var BASE_URL = 'http://localhost'
var port = [8080, 8081, 8082]
var server = port.length

function getOrderDetailsByOrderId(custId, orderId) {
	var url = `${BASE_URL}:${getPort(custId)}/getOrderedProductsByOrderId`;
	var options = {
		cust_id: custId,
		order_id: orderId
	}
	return axios.post(url, options);
}


function getKEY(uid) {
	var url = `${BASE_URL}:${getPort(uid)}/getKEY`;
	var body = {}
	return axios.post(url, body);
}

function createOrder(body) {
	var url = `${BASE_URL}:${getPort(body.uid)}/createOrder`;
	var options = {
		amount: body.amount,
		currency: body.currency,
		receipt: body.receipt,
		notes: body.notes
	}
	return axios.post(url, options);
}

function getProductById(uid, id, category) {
	console.log(id);
	var url = `${BASE_URL}:${getPort(uid)}/getProductById?id=${id}&category=${category}`
	return axios.get(`${url}`)
}

function getProductsByPage(uid, page, category) {
	var url = `${BASE_URL}:${getPort(uid)}/getProductByPage?page=${page}&category=${category}`
	return axios.get(`${url}`)
}
function getUserById(id) {
	var url = `${BASE_URL}:${getPort(id)}/getUserById?id=${id}`
	return axios.get(`${url}`)
}

function getUserAddressById(id) {
	var url = `${BASE_URL}:${getPort(id)}/getUserAddressById?id=${id}`
	return axios.get(`${url}`)
}

function updateCustomer(reqBody) {
	var url = `${BASE_URL}:${getPort(reqBody.uid)}/updateProfile`;
	console.log(getPort(reqBody.uid))
	var body = {
		address_line_1: reqBody.address_line_1,
		address_line_2: reqBody.address_line_2,
		city: reqBody.city,
		state: reqBody.state,
		pincode: reqBody.pincode,
		country: reqBody.country,
		is_default: reqBody.is_default,
		uid: reqBody.uid,
		name: reqBody.name,
		email: reqBody.email,
		contact: reqBody.contact,
		isAdmin: reqBody.isAdmin,
	}
	console.log(body);
	return axios.post(url, body);
}

function addAddress(uid, address_line_1, address_line_2, city, state, pincode, country, is_default) {
	var url = `${BASE_URL}:${getPort(uid)}/addAddress`
	var body = {
		address_line_1: address_line_1,
		address_line_2: address_line_2,
		city: city,
		state: state,
		pincode: pincode,
		country: country,
		is_default: is_default,
		cust_id: uid
	}
	return axios.post(url, body);
}

function getUserIdByEmail(email) {
	var url = `${BASE_URL}:8080/getUserId`;
	var body = {
		email: email
	}
	return axios.post(url, body);
}

function createCustomer(cust_name, cust_email, cust_password, cust_contact, isAdmin) {
	var url = `${BASE_URL}:8080/createCustomer`;
	var body = {
		cust_name: cust_name,
		cust_email: cust_email,
		cust_password: cust_password,
		cust_contact: cust_contact,
		isAdmin: isAdmin,
	}
	console.log(body)
	return axios.post(url, body);
}

function addToCart(prodId, custId, quantity, Category) {
	var url = `${BASE_URL}:${getPort(custId)}/addToCart`;
	var body = {
		prod_id: prodId,
		cust_id: custId,
		quantity: quantity,
		category: Category
	}
	return axios.post(url, body);
}

function getCartProducts(custId) {
	console.log("Get Cart Products")
	var url = `${BASE_URL}:${getPort(custId)}/getCartProducts`;
	var body = {
		cust_id: custId
	}
	return axios.post(url, body);
}

function orderProduct(cust_id, prod_ids, payment_id, signature, quantity, categories) {
	var url = `${BASE_URL}:8080/orderProduct`;
	var body = {
		cust_id: cust_id,
		prod_id: prod_ids,
		payment_id: payment_id,
		signature: signature,
		quantity: quantity,
		categories: categories
	}
	return axios.post(url, body);
}

function getOrderedProducts(cust_id) {
	var url = `${BASE_URL}:${getPort(cust_id)}/getOrderedProducts`;
	var body = {
		cust_id: cust_id
	}
	return axios.post(url, body);
}

function getServer(id) {
	return id % server;
}

function getPort(id) {
	return port[getServer(id)];
}

function addProduct(id, name, description, price, discount, rating, highlights, images, features, product) {
	var url = `${BASE_URL}:8080/addProduct`;
	const d = new Date();
	let time = d.getTime();
	var body = {
		id: time,
		name: name,
		description: description,
		price: price,
		discount: "10",
		rating: rating,
		highlights: highlights,
		images: images,
		features: features,
		Product: product
	}
	console.log(time);
	return axios.post(url, body);
}

// fs.readFile("airConditionar.json", function (err, data) {

// 	// Check for errors
// 	if (err) throw err;

// 	// Converting to JSON
// 	const products = JSON.parse(data);
// 	let n = products.data.length

// 	// console.log(highlights)
// 	// addProduct(1, data.name, data.description, data.price, 35, data.rating, highlights, data.images, features, "airConditioner").then(response => {
// 	// 	console.log(data);
// 	// })
// 	for (let i = 3; i < n; i++) {
// 		var data = products.data[i];
// 		var highlights = JSON.stringify(data.highlights).replaceAll(`"`, `'`)
// 		var features = JSON.stringify(data.features).replaceAll(`"`, `'`)
// 		console.log(data);
// 		// addProduct(i, data.name, data.description, data.price, 35, data.rating, highlights, data.images, features, "airConditioner").then(response => {
// 		// 	console.log(data);
// 		// })
// 	}
// });

// fs.readFile("clothes.json", function (err, data) {

// 	// Check for errors
// 	if (err) throw err;

// 	// Converting to JSON
// 	const products = JSON.parse(data);
// 	let n = products.data.length
// 	for (let i = 1; i <= n; i++) {
// 		var data = products.data[i-1];
// 		var highlights = ""
// 		var features = ""
// 		var discount = 20
// 		if(data.highlights != undefined) {
// 			var highlights = JSON.stringify(data.highlights).replaceAll(`"`, `'`)
// 		} 
// 		if(data.features != undefined) {
// 			var features = JSON.stringify(data.features).replaceAll(`"`, `'`)
// 		}
// 		if(data.discount != undefined) {
// 			parseInt(products.data[0].discount.replace("% off", ""))
// 		}
// 		addProduct(i, data.name, data.description, data.price, discount, data.rating, highlights, data.images, features, "cloth").then(response => {
// 			console.log(data);
// 		})
// 	}
// });

// fs.readFile("footwear.json", function (err, data) {

// 	// Check for errors
// 	if (err) throw err;

// 	// Converting to JSON
// 	const products = JSON.parse(data);
// 	let n = products.length
// 	for (let i = 1; i <= n; i++) {
// 		var data = products[i-1];
// 		// console.log(data.price)
// 		var highlights = ""
// 		var features = ""
// 		var discount = 20
// 		if(data.highlights != undefined) {
// 			var highlights = JSON.stringify(data.highlights).replaceAll(`"`, `'`)
// 		} 
// 		if(data.features != undefined) {
// 			var features = JSON.stringify(data.features).replaceAll(`"`, `'`)
// 		}
// 		if(data.discount != undefined) {
// 			parseInt(data.discount.replace("% off", ""))
// 		}
// 		addProduct(i, data.name, data.description, data.price, discount, data.rating, highlights, data.images, features, "footwear").then(response => {
// 			console.log(data);
// 		})
// 	}
// });

// fs.readFile("mobiles.json", function (err, data) {

// 	// Check for errors
// 	if (err) throw err;

// 	// Converting to JSON
// 	const products = JSON.parse(data);
// 	let n = products.data.length
// 	console.log(JSON.stringify(products.data[1].description).replaceAll(`"`, ``).replaceAll(`\\`, ``))
// 	for (let i = 1; i <= n; i++) {
// 		var data = products.data[i - 1];
// 		// console.log(data.name)
// 		var highlights = ""
// 		var features = ""
// 		var discount = 20
// 		var description = ""
// 		if (data.highlights != undefined) {
// 			var highlights = JSON.stringify(data.highlights).replaceAll(`"`, `'`)
// 		}
// 		if (data.features != undefined) {
// 			var features = JSON.stringify(data.features).replaceAll(`"`, `'`)
// 		}
// 		if (data.discount != undefined) {
// 			parseInt(data.discount.replace("% off", ""))
// 		}
// 		if (data.description != undefined) {
// 			description = JSON.stringify(data.description).replaceAll(`"`, ``).replaceAll(`\\`, ``)
// 		}
// 		// console.log(description)
// 		addProduct(i, data.name, data.description, data.price, discount, data.rating, highlights, data.images, features, "mobile").then(response => {
// 			console.log(data);
// 		})
// 	}
// });

// fs.readFile("television.json", function (err, data) {

// 	// Check for errors
// 	if (err) throw err;

// 	// Converting to JSON
// 	const products = JSON.parse(data);
// 	let n = products.data.length
// 	console.log(JSON.stringify(products.data[1].description).replaceAll(`"`, ``).replaceAll(`\\`, ``))
// 	for (let i = 1; i <= n; i++) {
// 		var data = products.data[i - 1];
// 		// console.log(data.name)
// 		var highlights = ""
// 		var features = ""
// 		var discount = 20
// 		var description = ""
// 		if (data.highlights != undefined) {
// 			var highlights = JSON.stringify(data.highlights).replaceAll(`"`, `'`)
// 		}
// 		if (data.features != undefined) {
// 			var features = JSON.stringify(data.features).replaceAll(`"`, `'`)
// 		}
// 		if (data.discount != undefined) {
// 			parseInt(data.discount.replace("% off", ""))
// 		}
// 		if (data.description != undefined) {
// 			description = JSON.stringify(data.description).replaceAll(`"`, ``).replaceAll(`\\`, ``)
// 		}
// 		// console.log(description)
// 		addProduct(i, data.name.replaceAll(`"`, `'`), data.description, data.price, discount, data.rating, highlights, data.images, features, "tv").then(response => {
// 			console.log(data);
// 		})
// 	}
// });

// fs.readFile("furnitures.json", function (err, data) {

// 	// Check for errors
// 	if (err) throw err;

// 	// Converting to JSON
// 	const products = JSON.parse(data);
// 	let n = products.data.length
// 	for (let i = 1; i <= n; i++) {
// 		var data = products.data[i - 1];
// 		// console.log(data.name)
// 		var highlights = ""
// 		var features = ""
// 		var discount = 20
// 		var description = ""
// 		if (data.highlights != undefined) {
// 			var highlights = JSON.stringify(data.highlights).replaceAll(`"`, `'`)
// 		}
// 		if (data.features != undefined) {
// 			var features = JSON.stringify(data.features).replaceAll(`"`, `'`)
// 		}
// 		if (data.discount != undefined) {
// 			parseInt(products.data[0].discount.replace("% off", ""))
// 		}
// 		if (data.description != undefined) {
// 			description = JSON.stringify(data.description).replaceAll(`"\"`, ``).replaceAll(`"`, `'`)
// 		}
// 		// console.log(description)
// 		addProduct(i, data.name, data.description, data.price, discount, data.rating, highlights, data.images, features, "furniture").then(response => {
// 			console.log(data);
// 		})
// 	}
// });



// orderProduct(9, [1,2,3], "abc", "bcd", [4,5,6], ["airconditionar", "cloth", "mobile"]).then(response => {
// 	console.log(response.data);
// 	getOrderedProducts(9).then(response => {
// 		console.table(response.data.data);
// 	}).catch(err => {
// 		console.log(err);
// 	})
// }).catch(err => {
// 	console.log(err);
// })
app.listen(1234)
console.log('Gateway Connected')

module.exports = {getProductById, getProductsByPage, getUserById, getUserAddressById, addAddress, createCustomer, addToCart, getCartProducts, orderProduct, getOrderedProducts, addProduct};
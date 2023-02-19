const axios = require('axios');
const { response } = require('express');
const fs = require('fs')

var BASE_URL = 'http://localhost'
var port = [8080, 8081, 8082]
var server = port.length

function getProductById(uid, id, category) {
	var url = `${BASE_URL}:${getPort(uid)}/getProductById?id=${id}&category=${category}`
	return axios.get(`${url}`)
}

function getACProductsByPage(uid, page, category) {
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

function createCustomer(cust_name, cust_email, cust_password, cust_contact, isAdmin) {
	var url = `${BASE_URL}:8080/createCustomer`;
	var body = {
		cust_name: cust_name,
		cust_email: cust_email,
		cust_password: cust_password,
		cust_contact: cust_contact,
		isAdmin: isAdmin,
	}
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

async function addProduct(id, name, description, price, discount, rating, highlights, images, features, product) {
	var url = `${BASE_URL}:${getPort(id)}/addProduct`;
	var body = {
		id: id,
		name: name,
		description: description,
		price: price,
		discount: discount,
		rating: rating,
		highlights: highlights,
		images: images,
		features: features,
		Product: product
	}
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
// 		addProduct(i, data.name, data.description, data.price, 35, data.rating, highlights, data.images, features, "airConditioner").then(response => {
// 			console.log(data);
// 		})
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

fs.readFile("footwear.json", function (err, data) {

	// Check for errors
	if (err) throw err;

	// Converting to JSON
	const products = JSON.parse(data);
	let n = products.data.length
	for (let i = 1; i <= n; i++) {
		var data = products.data[i-1];
		var highlights = ""
		var features = ""
		var discount = 20
		if(data.highlights != undefined) {
			var highlights = JSON.stringify(data.highlights).replaceAll(`"`, `'`)
		} 
		if(data.features != undefined) {
			var features = JSON.stringify(data.features).replaceAll(`"`, `'`)
		}
		if(data.discount != undefined) {
			parseInt(products.data[0].discount.replace("% off", ""))
		}
		addProduct(i, data.name, data.description, data.price, discount, data.rating, highlights, data.images, features, "footwear").then(response => {
			console.log(data);
		})
	}
});



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

const mysql = require("mysql");
const clothService = require('../ClothService/clothService')
const ACService = require('../AirConditionar Service/ACService')
const footwearService = require('../FootwearService/footwearService')
const furnitureService = require('../FurnitureService/furnitureService')
const mobileService = require('../MobileService/mobileService')
const tvService = require('../TelevisionService/tvService')
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "shopido",
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Order Service Connected");
});

function updateStockCount(prodId, quantity, category) {
	switch(category) {
		case 'airConditioner':
			ACService.updateStock(prodId, quantity);
			return;
		case 'cloth':
			clothService.updateStock(prodId, quantity);
			return;
		case 'tv':
			tvService.updateStock(prodId, quantity);
			return;
		case 'footwear':
			footwearService.updateStock(prodId, quantity);
			return
		case 'furniture':
			furnitureService.updateStock(prodId, quantity);
			return;
		case 'mobile':
			mobileService.updateStock(prodId, quantity);
			return;
	}
}

async function orderProduct(cust_id, prod_ids, payment_id, signature, quantity, categories, req, res){
	var CustQuery = `Select * from customer where cust_id = ${cust_id}`;
	con.query(CustQuery, (err, result, fields) => {
		if (result.length == 1) {
			var orderQuery = `Insert into orders(cust_id, payment_id, signature) values (${cust_id}, '${payment_id}', '${signature}')`;
			con.query(orderQuery, (err, resp) => {
				if (err) return res.status(400).json({ message: err.message });
				var order_id = resp.insertId;
				let n = quantity.length
				for (let i = 0; i < n; i++) {
					var orderDetQuery = `Insert into order_details (order_id, prod_id, quantity, category) values (${order_id}, ${prod_ids[i]}, ${quantity[i]}, '${categories[i]}')`;
					con.query(orderDetQuery, (error, response) => {
						if (error) {
							return res.status(400).json({ message: error.message });
						} else {
							updateStockCount(prod_ids, quantity[i], categories[i]);
						}
					})
				}
				console.log(resp.insertId);
				return res.status(200).json({ data : resp.insertId});
			})
		} else {
			res.status(400).json({ message: "Not Valid Customer" });
		}
	})
}

async function getOrderedProducts(id, req, res){
	var query = `select * from orders RIGHT JOIN order_details on orders.order_id = order_details.order_id
			where orders.cust_id = ${id}
			union
			select * from orders LEFT JOIN order_details on orders.order_id = order_details.order_id
			where orders.cust_id = ${id}
	`
	con.query(query, (err, result, fields) => {
		if(err) {
			res.status(400).json({message: err.message});
			return;
		}
		res.status(200).json({data: result});
		return;
	})
}

function getOrderDetailsByOrderId(id, orderId, req, res) {
	var query = `select * from orders RIGHT JOIN order_details on orders.order_id = order_details.order_id
			where orders.cust_id = ${id} and orders.order_id = ${orderId}
			union
			select * from orders LEFT JOIN order_details on orders.order_id = order_details.order_id
			where orders.cust_id = ${id} and orders.order_id = ${orderId};
	`
	con.query(query, (err, result, fields) => {
		if(err) {
			res.status(400).json({message: err.message});
			return;
		}
		res.status(200).json({data: result});
		return;
	})
}

module.exports = {orderProduct, getOrderedProducts, getOrderDetailsByOrderId}
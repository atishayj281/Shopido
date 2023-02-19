const mysql = require("mysql");

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "shopido",
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Profile Service Connected");
});

function getUserById(id, req, res) {
	console.log(id)
	var query = `select * from customer where cust_id = ${id}`;
	con.query(query, (_, resp)=>{
		if(!resp) {
			res.status(400).json({message: "Invalid User"})
			return;
		}
		res.status(200).json({data: resp});
		return;
	})
}

function getUserAddressById(id, req, res) {
	console.log(id)
	var query = `select * from address where cust_id = ${id}`;
	con.query(query, (_, resp)=>{
		if(!resp) {
			res.status(400).json({message: "Invalid User"})
			return;
		}
		res.status(200).json({data: resp});
		return;
	})
}

function addAddress(body, req, res) {
	var query = `insert into address (address_line_1, address_line_2, city, state, pincode, country, is_default, cust_id) values
	('${body.address_line_1}', '${body.address_line_2}', '${body.city}', '${body.state}', '${body.pincode}', '${body.country}', ${body.is_default}, ${body.cust_id})`;
	con.query(query, (err, resp) => {
		if (err) res.status(400).json({ message: err.message });
		res.status(200).json({ message: "Address Added" });
	})
}

function addToCart(cust_id, prod_id, quantity, category, req, res){
	var CustQuery = `Select * from customer where cust_id = ${cust_id}`;
	con.query(CustQuery, (err, result, fields) => {
		if (err) {
			res.status(400).json({ message: err.message });
			return;
		}
		if (result.length == 1) {
			if (!prod_id) res.status(400).json({ message: "Please Provide product id" });
			if (!cust_id) res.status(400).json({ message: "Please Provide customer id" });
			var query = `insert into carts(prod_id, cust_id, quantity, category) values (${prod_id}, ${cust_id}, ${quantity}, '${category}')`;
			con.query(query, (err, resp) => {
				if (err) res.status(400).json({ message: err.message });
				res.status(200).json({ message: "Product Added in the cart successfully" });
			})
		} else {
			res.status(400).json({ message: "Not a valid user" });
		}
	})
}

function getCartProducts(cust_id, req, res) {
	if(!cust_id) {
		res.status(400).json({message: "Missing Parameter"});
		return;
	}
	var query = `Select * from carts where cust_id = ${cust_id}`
	con.query(query, (err, result, fields) => {
		if(err) {
			res.status(400).json({message: err.message});
			return;
		}
		res.status(200).json({data: result});
		return;
	})

}

function addCustomer(body, req, res) {
	var query = `Insert into customer (cust_name, cust_email, cust_password, cust_contact, isAdmin) values 
  ('${body.name}', '${body.email}', '${body.password}', ${body.contact}, 0)`;
	con.query(query, (err, resp) => {
		if (err) res.status(400).json({ message: err.message });
		res.status(200).json({ message: "Customer Created" });
	})
}

module.exports = {getUserById, getUserAddressById, addAddress, addToCart, addCustomer, getCartProducts}
const { response } = require("express");
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
	con.query(query, (_, user) => {
		console.log(user);
		if (user == undefined || user.length == 0) {
			res.status(400).json({ message: "Invalid User" })
		} else {
			var query = `select * from address where cust_id = ${id}`;
			con.query(query, (_, address) => {
				if (!address) {
					res.status(400).json({ message: "Invalid User" })
				} else {
					var data = {
						user: user,
						address: address
					}
					res.status(200).json({data: data});
				}
			})
		}
	})
}

function getUserId(email, req, res) {
	var query = `select * from customer where cust_email = '${email}'`;
	con.query(query, (_, user) => {
		console.log(user);
		if (user == undefined || user.length == 0) {
			res.status(400).json({ message: "Invalid User" })
		} else {
			console.log(user);
			res.status(200).json({data: user});
		}
	})
}


function getUserAddressById(id, req, res) {
	console.log(id)
	var query = `select * from address where cust_id = ${id}`;
	con.query(query, (_, resp) => {
		if (!resp) {
			res.status(400).json({ message: "Invalid User" })
			return;
		}
		res.status(200).json({ data: resp });
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

function addToCart(cust_id, prod_id, quantity, category, req, res) {
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
	if (!cust_id) {
		res.status(400).json({ message: "Missing Parameter" });
		return;
	}
	var query = `Select * from carts where cust_id = ${cust_id}`
	con.query(query, (err, result, fields) => {
		if (err) {
			res.status(400).json({ message: err.message });
		}
		else res.status(200).json({ data: result });
		return;
	})

}

function addCustomer(body, req, res) {
	// console.log(body);
	var query = `Insert into customer (cust_name, cust_email, cust_password, cust_contact, isAdmin) values 
  ('${body.cust_name}', '${body.cust_email}', '${body.cust_password}', '${body.cust_contact}', 0)`;
  console.log(query);
	con.query(query, (err, resp) => {
		if (err) res.status(400).json({ message: err.message });
		else res.status(200).json({ message: "Customer Created" });
	})
}

function updateCustomer(body, req, res) {
	console.log("Profile Service Started")
	if (body.name == undefined || body.email == undefined || body.contact == undefined || body.uid == undefined
		|| body.address_line_1 == undefined || body.address_line_2 == undefined || body.city == undefined || body.state == undefined
		|| body.pincode == undefined || body.country == undefined) {
		res.status(400).json({ message: "Missing data" });
	} else {
		var custQuery = `UPDATE customer set cust_name = '${body.name}', cust_email='${body.email}', cust_contact='${body.contact}' where cust_id=${body.uid};`
		var addressQuery = `update address set address_line_1='${body.address_line_1}', address_line_2='${body.address_line_2}', city='${body.city}', state='${body.state}', pincode='${body.pincode}', country='${body.country}', is_default=${body.is_default} where cust_id=${body.uid};`
		con.query(`select * from customer where cust_id=${body.uid}`, (err, result, fields) => {
			if (err) res.status(400).json({ message: err.message });
			else {
				if (result.length > 0) {
					con.query(custQuery, (err, resp) => {
						console.log("Cust query exec");
						if (err) res.status(400).json({ message: err.message });
						else {
							con.query(addressQuery, (err, resp) => {
								console.log("ADDRESS QUERY EXEC;");
								if (err) res.status(400).json({ message: err.message });
								else {
									console.log("Executed");
									res.status(200).json({ message: "Profile Updated Successfully" });
								}
							})
						}
					})
				}
			}
		})
		return;
	}
}



module.exports = { updateCustomer, getUserById, getUserAddressById, addAddress, addToCart, addCustomer, getCartProducts, getUserId}
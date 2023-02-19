const mysql = require("mysql");
class mobile{
	constructor(id, name, price, discount, images, features, about){
		this.id = id
		this.name = name
		this.price = price
		this.discount = discount
		this.images = images
		this.features = features
		this.about = about
		
	}
}
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "mobile",
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Mobile Service Connected");
});

function getMobileById(id, res){
	var productQuery = `SELECT * FROM product
			LEFT JOIN product_info ON product.id = product_info.product_id
			UNION
			SELECT * FROM product
			RIGHT JOIN product_info ON product.id = product_info.product_id
			WHERE product.id = ${id}`;
	con.query(productQuery, (err, resp) => {
		if (err) {
			res.status(400).json({ message: err.message });
			return;
		}
		if(resp.length == 0) {
			res.status(200).json({data: resp});
			return;
		}
		var imageQuery = `select url from product_images where product_images.product_id = '${id}'`;
		con.query(imageQuery, (_, imageResp)=>{
			var prod = resp[0]
			const product = new mobile(prod.id, prod.name, prod.price, prod.discount, imageResp, prod.features, prod.about)
			res.status(200).json({ data: product });
		})
	});
}

function getPageProducts(page, res) {
	var pageSize = 10;
	var productQuery = `SELECT * FROM product WHERE product.id BETWEEN ${(page - 1)*pageSize} and ${page*pageSize}`;
	con.query(productQuery, (err, resp) => {
		if (err) {
			res.status(400).json({ message: err.message });
			return;
		}
		res.status(200).json({data: resp})
	});
} 


function addProduct(id, name, description, price, discount, rating, highlights, images, features, req, res) {
	var productImage = images[0]
	var query1 = `insert into product(id, name, price, discount, image_url, ratings) values (${id}, '${name}', '${price}', ${discount}, '${productImage}', '${rating}')`;
	con.query(query1, (err, resp) => {
		if(err) {
			console.log(err.message)
			res.status(err.code).json({message: err.message});
			return;
		}
		console.log(`product ${id} saved`);
		console.log(`Features: ${features}`)
		console.log(`Description: ${description}`)
		console.log(`highlights: ${highlights}`)
		var query2 = `insert into product_info(product_id, features, about, highlights) values (${id}, "${features}", "${description}", "${highlights}")`;
		con.query(query2, (error, response) => {
			if(error) {
				console.log(error.message)
				res.status(error.code).json({message: error.message});
				return;
			}
			console.log(`product ${id} info saved`)
			for(let i = 0; i<images.length; i++) {
				var query3 = `insert into product_images(product_id, url) values (${id}, '${images[i]}')`
				con.query(query3, (err, resp) => {
					if(err) {
						res.status(err.code).json({message: err.message});
						return;
					}
				})
			}
			console.log(`Product ${id} of AC added Successfully`);
		})
	})
}

module.exports = {getMobileById, getPageProducts, addProduct}
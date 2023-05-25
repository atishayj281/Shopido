const Razorpay = require('razorpay');

const KEY_ID = "rzp_test_7ReFEWhzZW0ABh"
const key_secret = "lU8daoyYB6DXIppuqLBVQj83"
var instance = new Razorpay({ key_id: KEY_ID, key_secret: key_secret })

function getAPI_KEY(res) {
	res.status(200).json({key : KEY_ID});
}

function createOrder(body, res) {
	console.log(body);

	instance.orders.create(body).then((data) => {
		console.log(data)
		res.status(200).json({data: data});
	      }).catch((error) => {
		console.error(error.response)
		res.status(400).json({message: error.response})
	      })
}

function validateOrder(body, res) {
	generated_signature = hmac_sha256(body.order_id + "|" + body.razorpay_payment_id, key_secret);
	if (generated_signature == body.razorpay_signature) {
		res.status(200).json({message: "payment is successful"});
	} else {
		res.status(200).json({message: "Unauthorised Payment"});
	}
}

module.exports = {createOrder, validateOrder, getAPI_KEY};


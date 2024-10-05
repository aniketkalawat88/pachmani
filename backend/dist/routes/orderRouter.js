"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderController_1 = require("../controllers/orderController");
const express_1 = require("express");
const JWTtoken_1 = __importDefault(require("../middlewares/JWTtoken"));
const adminJwt_1 = __importDefault(require("../middlewares/adminJwt"));
const router = (0, express_1.Router)();
router.post("/", JWTtoken_1.default, orderController_1.createOrder);
router.get("/", adminJwt_1.default, orderController_1.getAllOrders);
router.put("/", adminJwt_1.default, orderController_1.updateOrder);
router.get("/:orderId", JWTtoken_1.default, orderController_1.getOrderById);
router.post("/checkout", JWTtoken_1.default, orderController_1.checkout);
router.post("/paymentverification/:shippingAddressIndex", JWTtoken_1.default, orderController_1.paymentVerification);
router.post("/direct-purchase", JWTtoken_1.default, orderController_1.directPurchase);
router.post("/direct-purchase/verify", JWTtoken_1.default, orderController_1.verifyDirectPurchasePayment);
/*  */
// function generatedTranscId() {
//   return "T" + Date.now();
// }
/* phone pay */
// try {
//   let merchantTransactionId = req.body.transactionId;
//   const data = {
//     merchantId: merchant_id,
//     merchantTransactionId: merchantTransactionId,
//     amount: req.body.amount,
//     name: req.body.name,
//     redirectUrl: `http://localhost:8000/status?id=${merchantTransactionId}`,
//     redirectMode: "post",
//     mobileNumber: req.body.phone,
//     paymentInstrument: {
//       type: "PAY_PAGE",
//     },
//   };
//   const payload = JSON.stringify(data);
//   const payloadMain = Buffer.from(payload).toString("base64");
//   const KeyIndex = 1;
//   const string = payloadMain + "/pg/v1/pay" + salt_key;
//   const sha256 = crypto.createHash("sha256").update(string).digest("hex");
//   const checksum = sha256 + "###" + KeyIndex;
//   const prod_URL =
//     "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
//   const options = {
//     method: "POST",
//     url: prod_URL,
//     headers: {
//       accept: "application/json",
//       "Content-Type": "application/json",
//       "X-VERIFY": checksum,
//     },
//     data: {
//       request: payloadMain,
//     },
//   };
//   axios(options).then((response) => {
//     console.log(response);
//     res.json(response.data);
//   }).catch((error)=>{
//     console.log(error);
//   })
// } catch (error) {
//   console.log(error);
// }
// let SALT_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
// let MERCHANT_ID = "PGTESTPAYUAT";
// router.post("/order", async (req, res) => {
//   try {
//     const merchantTransactionId = "M" + Date.now();
//     const { user_id, price, phone, name } = req.body;
//     // Prepare the data payload
//     const data = {
//       merchantId: MERCHANT_ID,
//       merchantTransactionId: merchantTransactionId,
//       merchantUserId: "MUID" + user_id,
//       name: name,
//       amount: price * 100, // Convert to smallest currency unit
//       redirectUrl: `http://localhost:8080/api/order/status/${merchantTransactionId}`,
//       redirectMode: "POST",
//       mobileNumber: phone,
//       paymentInstrument: {
//         type: "PAY_PAGE",
//       },
//     };
//     const payload = JSON.stringify(data);
//     const payloadMain = Buffer.from(payload).toString("base64");
//     const keyIndex = 2;
//     const string = payloadMain + "/pg/v1/pay" + SALT_KEY;
//     const sha256 = crypto.createHash("sha256").update(string).digest("hex");
//     const checksum = sha256 + "###" + keyIndex;
//     // const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
//     const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
//     const options = {
//       method: "POST",
//       url: prod_URL,
//       headers: {
//         accept: "application/json",
//         "Content-Type": "application/json",
//         "X-VERIFY": checksum,
//       },
//       data: {
//         request: payloadMain,
//       },
//     };
//     // Send request to payment gateway
//     const response = await axios.request(options);
//     return res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// });
// router.post("/status/:txnId", async (req, res) => {
//   try {
//     const merchantTransactionId = req.params["txnId"];
//     const merchantId = MERCHANT_ID;
//     const keyIndex = 2;
//     const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + SALT_KEY;
//     const sha256 = crypto.createHash("sha256").update(string).digest("hex");
//     const checksum = sha256 + "###" + keyIndex;
//     const options = {
//       method: "GET",
//       url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
//       headers: {
//         accept: "application/json",
//         "Content-Type": "application/json",
//         "X-VERIFY": checksum,
//         "X-MERCHANT-ID": merchantId,
//       },
//     };
//     // Check payment status
//     const response = await axios.request(options);
//     if (response.data.success) {
//       console.log(response.data);
//       return res.status(200).send({ success: true, message: "Payment Success" });
//     } else {
//       return res.status(400).send({ success: false, message: "Payment Failure" });
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// });
exports.default = router;

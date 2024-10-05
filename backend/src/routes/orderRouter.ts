import express from "express";
import {
  checkout,
  createOrder,
  directPurchase,
  getAllOrders,
  getOrderById,
  paymentVerification,
  updateOrder,
  verifyDirectPurchasePayment,
} from "../controllers/orderController";
import { Router } from "express";
import  authenticateToken  from "../middlewares/JWTtoken";
import  isAdmin  from "../middlewares/adminJwt";

const router = Router();
router.post("/", authenticateToken, createOrder);
router.get("/", isAdmin, getAllOrders);
router.put("/", isAdmin, updateOrder);
router.get("/:orderId", authenticateToken, getOrderById);
router.post("/checkout", authenticateToken, checkout);
router.post("/paymentverification/:shippingAddressIndex", authenticateToken, paymentVerification);
router.post("/direct-purchase", authenticateToken, directPurchase);
router.post("/direct-purchase/verify", authenticateToken, verifyDirectPurchasePayment); 







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

export default router;

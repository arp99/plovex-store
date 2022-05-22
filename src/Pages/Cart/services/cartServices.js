import axios from "../../../app/Features/Auth/services/axiosInstance";
import { Notification } from "../../../Components";
import { ActionTypes } from "../../../Utils/ActionConstants";

export const makeOrder = async (amount) => {
  try {
    const response = await axios.post("payment", {
      amount,
    });
    return response.data;
  } catch (err) {
    console.log(err.message);
    Notification(ActionTypes.paymentError, "Failed to create Order");
  }
};

export const loadRazorPay = async (amount, setPaymentStatus) => {
  setPaymentStatus("loading");
  const KEY = process.env.RAZORPAY_KEY_ID;
  const {
    orderData: { orderId, transactionAmount },
  } = await makeOrder(amount);

  const options = {
    key: KEY,
    amount: transactionAmount,
    currency: "INR",
    name: "Plovex Store",
    order_id: orderId,
    handler: function (response) {
      const paymentInfo = {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
      };
      setPaymentStatus("fulfilled");
      Notification(ActionTypes.paymentSuccess, "Payment Successfull");
    },
    modal: {
      ondismiss: function () {
        setPaymentStatus("fulfilled");
      },
    },
    // prefill: {
    //   name: user ? user?.name : "",
    //   email: user ? user.email : "",
    // },
    theme: {
      color: "#231f20",
    },
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
  rzp1.on("payment.failed", function (response) {
    Notification(ActionTypes.paymentError, "Failed to Complete Transaction");
  });
};

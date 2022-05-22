/** @jsxImportSource @emotion/react */
import "twin.macro";
import { Button } from "../../Components";
import { useSelector } from "react-redux";
import EmptyCart from "./assets/nothing_found.png";
import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import tw from "twin.macro";
import { CartCard } from "./Components/CartCard";
import { PriceDetails } from "./Components/PriceDetails";
import { getBill } from "../../app/Features/Cart/services/cartServices";
import { useEffect, useMemo, useState } from "react";
import { loadRazorPay } from "./services/cartServices";
import { ClipLoader } from "react-spinners";

export const Cart = () => {
  const { products, cartFetchStatus } = useSelector((state) => state.cart);
  const { userId } = useSelector((state) => state.auth);
  const [paymentStatus, setPaymentStatus] = useState("idle");

  const billAmount = useMemo(() => getBill(products), [products]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.className = "rzp-script";
    document.body.appendChild(script);
    return () => {
      const razorpayDiv =
        document.getElementsByClassName("razorpay-container")[0];
      const razorpayScript = document.querySelector(".rzp-script");
      if (razorpayDiv) {
        document.body.removeChild(razorpayDiv);
      }
      if (razorpayScript) {
        document.body.removeChild(razorpayScript);
      }
    };
  }, []);

  return (
    <main tw="w-full min-h-screen pt-28 flex flex-col justify-center items-center md:(flex-row items-start)">
      {products.length === 0 && cartFetchStatus === "fulfilled" && (
        <div tw="w-max flex flex-col items-center mx-auto">
          <img src={EmptyCart} alt="empty Cart" tw="w-60 h-60 sm:(w-96 h-96)" />
          <p tw="text-base font-bold text-tertiary mb-3 sm:text-xl">
            Cart is Empty
          </p>
          <Link to="/">
            <Button variant="secondary">Shop Now</Button>
          </Link>
        </div>
      )}
      {products.length > 0 && (
        <>
          <div
            css={css`
              max-width: 700px;
              max-height: 600px;
              ${tw`w-4/5 h-full overflow-y-scroll shadow-xl relative`}
            `}
          >
            {products.map(({ product, quantity }) => (
              <CartCard
                key={product._id}
                product={product}
                quantity={quantity}
                userId={userId}
              />
            ))}
            <div
              css={css`
                box-shadow: 0 -2px 15px -2px #6b6969;
                ${tw`w-full sticky bottom-0 text-right py-2 bg-secondary`}
              `}
            >
              <Button
                variant="primary"
                onClick={() => loadRazorPay(billAmount, setPaymentStatus)}
              >
                {paymentStatus === "loading" && (
                  <>
                    Processing{" "}
                    <ClipLoader size={15} color="white" loading={true} />
                  </>
                )}
                {paymentStatus !== "loading" && "Place Order"}
              </Button>
            </div>
          </div>
          <PriceDetails
            itemQuantity={products.length}
            bill={billAmount}
            setPaymentStatus={setPaymentStatus}
            paymentStatus={paymentStatus}
          />
        </>
      )}
    </main>
  );
};

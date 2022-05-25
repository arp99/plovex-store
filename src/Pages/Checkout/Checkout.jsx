/** @jsxImportSource @emotion/react */
import "twin.macro";
import { css } from "@emotion/react";
import tw, { styled } from "twin.macro";
import { useDispatch, useSelector } from "react-redux";
import { getBill } from "../../app/Features/Cart/services/cartServices";
import { useEffect, useMemo, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "../../Components";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { StyledError } from "../UserAuthentication/StyledComponents/StyledComponents";
import { addAddress } from "../../app/Features/User/User";
import { ClipLoader } from "react-spinners";
import { loadRazorPay } from "./services/checkoutServices";

const InputGroup = styled.div`
  ${tw`flex flex-col`}
  input {
    ${tw`p-1 outline-none border-2 border-solid border-primary-ligter my-2 tracking-widest text-sm`}
  }
  label {
    ${tw`text-base text-primary-darker font-bold`}
  }
  a {
    ${tw`no-underline text-primary-ligter mt-2`}
  }
`;

const validationSchema = Yup.object({
  houseNumber: Yup.string().required("Required!"),
  city: Yup.string().required("Required!"),
  state: Yup.string().required("Required!"),
  country: Yup.string().required("Required!"),
  mobile: Yup.string().required("Required!"),
  pinCode: Yup.number().required("Required!"),
});

const initialValues = {
  houseNumber: "",
  city: "",
  state: "",
  country: "",
  mobile: "",
  pinCode: "",
};

export const Checkout = () => {
  const { products } = useSelector((state) => state.cart);
  const { address, email, firstName, lastName } = useSelector(
    (state) => state.user
  );
  const bill = useMemo(() => getBill(products), [products]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle");

  const dispatch = useDispatch();
  const { addAddressStatus } = useSelector((state) => state.user);
  const handleAddressSubmit = (values, { resetForm }) => {
    resetForm();
    dispatch(addAddress({ address: values }));
  };

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

  useEffect(() => {
    if (addAddressStatus === "fulfilled") {
      setShowModal(false);
    }
  }, [addAddressStatus]);

  return (
    <div tw="w-full min-h-screen pt-28 flex flex-col items-center md:(flex-row justify-center items-start)">
      <div
        css={css`
          max-width: 700px;
          max-height: 600px;
          ${tw`w-4/5 h-full shadow-xl relative`}
        `}
      >
        <div tw="w-full h-full border border-primary-ligter">
          <div tw="w-full h-10 bg-primary-darker text-secondary text-lg flex items-center px-2">
            <p tw="uppercase">Delivery Address</p>
          </div>
          <div tw="w-full">
            {address.map(
              ({
                _id,
                city,
                country,
                houseNumberber,
                mobile,
                pinCode,
                state,
              }) => {
                return (
                  <div
                    tw="flex w-full items-center py-2 border-0 border-b border-solid border-b-tertiary"
                    key={_id}
                  >
                    <div tw="p-4">
                      <input
                        type="radio"
                        name="address"
                        id={_id}
                        onChange={() => setSelectedAddress(_id)}
                      />
                    </div>
                    <label htmlFor={_id} tw="w-4/5">
                      <div>
                        <p>
                          House no: {houseNumberber} |{" "}
                          <span>City : {city}</span>
                        </p>
                        <p>State: {state}</p>
                        <p>Pincode: {pinCode}</p>
                        <p>Contry: {country}</p>
                        <p>Mobile: {mobile}</p>
                      </div>
                    </label>
                  </div>
                );
              }
            )}
            <div tw="w-full flex border-0 border-b border-solid border-b-tertiary">
              <div tw="p-4">
                <AiOutlinePlus />
              </div>
              <div tw="w-full py-4">
                <button
                  tw="font-bold bg-transparent outline-none border-none cursor-pointer"
                  onClick={() => setShowModal(true)}
                >
                  ADD NEW ADDRESS
                </button>
              </div>
            </div>
            {selectedAddress && (
              <div tw="w-full p-4">
                <Button
                  variant="primary"
                  size={"small"}
                  onClick={() =>
                    loadRazorPay(bill, setPaymentStatus, {
                      email,
                      name: `${firstName} ${lastName}`,
                    })
                  }
                >
                  {paymentStatus === "loading" ? (
                    <>
                      Processing{" "}
                      <ClipLoader size={15} color="white" loading={true} />
                    </>
                  ) : (
                    "Pay Now"
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        css={css`
          height: max-content;
          ${tw`w-11/12 shadow-2xl md:(w-60 ml-7)`}
        `}
      >
        <div tw="p-1.5 border-0 border-b border-solid border-b-tertiary">
          <p tw="text-primary-darker text-lg">Price Details</p>
        </div>
        <div tw="flex justify-between p-1.5 border-0 border-b border-solid border-b-tertiary">
          <p tw="w-max text-primary-darker text-lg">
            Price({products.length} items)
          </p>
          <p tw="w-max text-primary-ligter">Rs. {bill}</p>
        </div>
        <div tw="flex justify-between p-1.5 border-0 border-b border-solid border-b-tertiary">
          <p tw="text-primary-darker text-lg">Delivery</p>
          <p tw="text-green-600">Free</p>
        </div>
      </div>
      {showModal && (
        <div
          css={css`
            width: 100%;
            height: 100vh;
            background: rgba(155, 155, 155, 0.48);
            backdrop-filter: blur(5px);
            ${tw`fixed top-0 left-0 z-20 flex justify-center pt-7 px-2`}
          `}
          onClick={(evt) => {
            evt.stopPropagation();
            setShowModal(false);
          }}
        >
          <div
            css={css`
              height: max-content;
              ${tw`bg-white w-full rounded-sm sm:w-3/5 md:w-96`}
            `}
            onClick={(evt) => evt.stopPropagation()}
          >
            <Formik
              initialValues={initialValues}
              onSubmit={handleAddressSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <div tw="w-full flex flex-col justify-evenly p-2">
                  <InputGroup>
                    <label htmlFor="houseNumber">House Number</label>
                    <Field
                      type="text"
                      id="houseNumber"
                      name="houseNumber"
                      autoComplete="off"
                    />
                    <ErrorMessage component={StyledError} name="houseNumber" />
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="city">City</label>
                    <Field
                      type="text"
                      id="city"
                      name="city"
                      autoComplete="off"
                    />
                    <ErrorMessage component={StyledError} name="city" />
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="state">State</label>
                    <Field
                      type="text"
                      id="state"
                      name="state"
                      autoComplete="off"
                    />
                    <ErrorMessage component={StyledError} name="state" />
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="country">Country</label>
                    <Field
                      type="text"
                      id="country"
                      name="country"
                      autoComplete="off"
                    />
                    <ErrorMessage component={StyledError} name="country" />
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="mobile">Mobile</label>
                    <Field
                      type="text"
                      id="mobile"
                      name="mobile"
                      autoComplete="off"
                    />
                    <ErrorMessage component={StyledError} name="mobile" />
                  </InputGroup>
                  <InputGroup>
                    <label htmlFor="pinCode">Pincode</label>
                    <Field
                      type="number"
                      id="pinCode"
                      name="pinCode"
                      autoComplete="off"
                    />
                    <ErrorMessage component={StyledError} name="pinCode" />
                  </InputGroup>
                  <div tw="w-full flex justify-between py-2">
                    <Button type="submit" variant="primary" size="small">
                      {addAddressStatus === "loading" && (
                        <ClipLoader size={15} color="white" loading={true} />
                      )}
                      {addAddressStatus !== "loading" && "Add"}
                    </Button>
                    <Button
                      type="reset"
                      variant="primary"
                      size="small"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

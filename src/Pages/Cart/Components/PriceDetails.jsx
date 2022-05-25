/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import tw from "twin.macro";
import { Button } from "../../../Components";
import { useNavigate } from "react-router-dom";

export const PriceDetails = ({ itemQuantity, bill }) => {
  const navigate = useNavigate();

  return (
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
          Price({itemQuantity} items)
        </p>
        <p tw="w-max text-primary-ligter">Rs. {bill}</p>
      </div>
      <div tw="flex justify-between p-1.5 border-0 border-b border-solid border-b-tertiary">
        <p tw="text-primary-darker text-lg">Delivery</p>
        <p tw="text-green-600">Free</p>
      </div>
      <div tw="p-1.5 text-right">
        <Button
          variant="primary"
          size="small"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

/** @jsxImportSource @emotion/react */
import { BsHeartFill } from "react-icons/bs";
import { css } from "@emotion/react";
import tw from "twin.macro";
import { useSelector } from "react-redux";

export const WishlistIcon = () => {
  const { products } = useSelector((state) => state.wishlist);

  return (
    <div tw="relative">
      <BsHeartFill cursor="pointer" size={22} />
      {products.length > 0 && (
        <span
          css={css`
            ${tw`w-5 h-5 text-xs flex justify-center items-center rounded-full bg-red-500 text-white absolute -top-3 -right-2`}
          `}
        >
          {products.length}
        </span>
      )}
    </div>
  );
};

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { AiFillDownCircle } from "react-icons/ai";
import tw from "twin.macro";

const listStyle = css`
  ${tw`p-0.5 md:p-3 border-0 border-b border-solid border-b-tertiary hover:(bg-tertiary text-secondary) list-item`}
`;
const dropDownStyle = css`
  z-index: 5;
  ${tw`w-max absolute right-4 -top-10 rounded-sm border border-solid border-primary-ligter bg-white`}
`;

export const ProductsSortBy = ({ currentFilter, setFilter }) => {
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  return (
    <div css={dropDownStyle} onClick={() => setDropDownOpen((prev) => !prev)}>
      <div tw="w-60 md:w-72 flex justify-between p-0.5 md:p-3 border-0 border-b border-solid border-b-primary-ligter">
        <div tw="text-sm md:text-lg cursor-pointer">
          Sort by :
          <span tw="font-semibold">
            {currentFilter === "ascending"
              ? " Price: Low to High"
              : " Price: High to low"}
          </span>
        </div>
        <AiFillDownCircle size={25} />
      </div>
      <ul
        css={css`
          ${tw`list-none hidden cursor-pointer`}
          ${isDropDownOpen && "display:block;"}
        `}
      >
        <li
          css={listStyle}
          style={
            currentFilter === "ascending"
              ? { background: "#6b6969", color: "white" }
              : {}
          }
          onClick={() =>
            setFilter({ type: "CHANGE_FILTER", payload: "ascending" })
          }
        >
          Price: Low to High
        </li>
        <li
          css={listStyle}
          style={
            currentFilter === "descending"
              ? { background: "#6b6969", color: "white" }
              : {}
          }
          onClick={() =>
            setFilter({ type: "CHANGE_FILTER", payload: "descending" })
          }
        >
          Price: High to low
        </li>
      </ul>
    </div>
  );
};

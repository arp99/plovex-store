/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import tw, { styled } from "twin.macro";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Link } from "react-router-dom";

const HiddenItem = styled.div`
  ${tw`py-3 pl-5 text-tertiary capitalize cursor-pointer`}
`;

const ExpandableItem = ({
  id,
  title,
  content,
  expandItem,
  handleClick,
  closeMenu,
}) => {
  return (
    <div>
      <div
        css={css`
          ${tw`w-full flex justify-between items-baseline text-xl my-4 text-secondary cursor-pointer`}
        `}
        onClick={() => handleClick(id)}
      >
        <p>{title}</p>
        {expandItem ? <AiOutlineMinus /> : <AiOutlinePlus />}
      </div>
      <div>
        {expandItem &&
          content.map(({ id, category, route }) => (
            <Link
              to={`${route}`}
              key={id}
              tw="no-underline text-current"
              onClick={closeMenu}
            >
              <HiddenItem>{category}</HiddenItem>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ExpandableItem;

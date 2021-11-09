/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import tw from "twin.macro"

const StyledTitle = css`
    position: absolute;
    top:40%;
    left:50%;
    transform: translate(-50%,-50%);
    text-shadow: 2px 2px 5px #231f20cc;
    ${tw`text-secondary text-base font-bold tracking-wide capitalize sm:text-lg md:text-xl lg:text-2xl`}
`
export const Categorycard = ({ imgSrc, title }) => {
    return (
        <div
            css={tw`w-full max-h-full relative cursor-pointer`}
        >
            <img 
                src={imgSrc} 
                alt="category" 
                css={tw`block w-full h-full`}
            />
            <h2 css={StyledTitle}>{ title }</h2>
        </div>
    );
}
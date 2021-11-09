/** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react"
import tw,{ css } from "twin.macro"

export const Banner = ({ imgSrc, title }) => {
    return(
        <div
            css={
                css`
                    background: url(${ imgSrc });
                    background-size: 100% 100%;
                    height: 40rem;
                    ${tw`w-full flex justify-center items-center`}
                `
            }
        >
            <p tw="font-semibold text-4xl text-secondary">{ title }</p>
        </div>
    )
}
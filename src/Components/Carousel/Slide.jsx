/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Link } from "react-router-dom"
import tw from "twin.macro"
import { Button } from "../Buttons/Button"

const Slide = props =>{
    return(
        <div
            css={css`
                background-image : url(${ props.url });
                background-size: 100% 100%;
                ${tw`h-full w-full bg-no-repeat bg-center flex-1 relative`}
            `}
        >
            <div
                css={
                    css`
                        ${tw`flex flex-col w-96 h-60 absolute left-1/2 top-60 items-center justify-between`}
                        transform: translate(-50%,-50%);
                    `
                }
            >
                <p 
                    css={css`
                        ${tw`text-secondary text-4xl font-extrabold text-center tracking-wider`}
                    `}
                >
                    { props.title }
                </p>
                <Link to={`${ props.route }`}>
                    <Button variant="primary">
                        Shop Now
                    </Button>
                </Link>
            </div>
        </div>
    )
}
export default Slide
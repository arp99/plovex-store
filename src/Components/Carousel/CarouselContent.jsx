/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import tw from "twin.macro"

const CarouselContent = props =>{
    return(
        <div
            css={ css`
                transform: translateX(-${props.translate}px);
                transition: transform ease-out ${props.transition}s;
                width: ${ props.width}px;
                ${ tw`h-full flex` }
            `}
            className="CarouselContent"
        >
            { props.children }
        </div>
    )
}
export default CarouselContent
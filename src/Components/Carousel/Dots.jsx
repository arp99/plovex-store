/** @jsxImportSource @emotion/react */
import tw, { styled } from "twin.macro"

const Dot = styled.span`
    ${ tw`p-2 mr-1 cursor-pointer rounded-full bg-white` }
    ${({ active }) => active && `background: black; box-shadow: 0 0 0 3px white inset`}
`

const Dots = ({ carouselData, activeSlide }) => {
    return(
        <div tw = "absolute bottom-6 w-full flex items-center justify-center" >
            {
                carouselData.map(( slide, idx ) => (
                    <Dot key = { slide.url } active = { activeSlide === idx } />
                ))
            }
        </div>
    )
}

export default Dots;
/**@jsxImportSource @emotion/react */
import tw, { styled } from "twin.macro"
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs"

const StyledArrow = styled.div`
    ${ tw`
        flex 
        justify-center items-center
        absolute top-1/2 
        bg-white 
        rounded-full 
        cursor-pointer
        transition transform ease-in delay-75
        hover:scale-110
    `}
    ${ ({ direction }) => direction === "right" ? `right:25px` : `left:25px`};
    svg{
        transform : translateX( ${({ direction }) => direction === 'left' ? '-2' : '2'}px);
        width: 50px;
        height:50px;
    }
`


const Arrow = ({ direction, handleClick }) => {
    return(
        <StyledArrow direction={direction} onClick={ handleClick } >
            {direction === 'right' ? <BsFillArrowRightCircleFill /> : <BsFillArrowLeftCircleFill /> }
        </StyledArrow>
    )
}

export default Arrow
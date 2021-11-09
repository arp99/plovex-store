/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import { BsCartFill, BsHeartFill, BsPersonFill, BsSearch } from "react-icons/bs"
import tw from "twin.macro"
import { Menu } from "../Menu/Menu"

export const Navbar = () => {
    const [ showMenu, setShowMenu ] = useState(false)
    return(
        <div
            css={ css`
                box-shadow : 0 4px 25px -5px #6b6969;
                ${tw`h-24 w-full bg-secondary px-7 py-4 fixed top-0 left-0 z-10 flex items-center justify-between`}
            `}
        >
            <div tw="w-max">
                <AiOutlineMenu onClick={()=> setShowMenu( true )} cursor="pointer" size={30} />
            </div>
            <div css={
                css`
                    ${ tw`w-40 flex justify-between`}
                `
            }>
                <BsSearch  cursor="pointer" size={22} />
                <BsHeartFill cursor="pointer" size={22} />
                <BsCartFill cursor="pointer" size={22} />
                <BsPersonFill cursor="pointer" size={22} />
            </div>
            {
                showMenu && <Menu hideMenu={ setShowMenu } menuOpen={ showMenu } />
            }
        </div>
    )
}
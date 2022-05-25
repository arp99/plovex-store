/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import { BiLogIn, BiLogOut } from "react-icons/bi"
import { Link } from "react-router-dom"
import tw from "twin.macro"
import { Menu } from "../Menu/Menu"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../app/Features/Auth/auth"
import { resetWishlist } from "../../app/Features/Wishlist/wishlist"
import { resetCart } from "../../app/Features/Cart/Cart"
import { CartIcon } from "./CartIcon"
import { WishlistIcon } from "./WishlistIcon"
import { resetUser } from "../../app/Features/User/User"

export const Navbar = () => {
    const [ showMenu, setShowMenu ] = useState(false)
    const { token } = useSelector( state => state.auth )
    const dispatch = useDispatch()

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
                    ${ tw`w-32 flex justify-between`}
                `
            }>
                <Link to="/wishlist" tw="no-underline text-current">
                    <WishlistIcon />
                </Link>
                <Link to="/cart" tw="no-underline text-current">
                   <CartIcon />
                </Link>
                {
                    !token && 
                    <Link to="/login" tw="no-underline text-current">
                        <BiLogIn cursor="pointer" size={22} />
                    </Link> 
                }
                {
                    token && 
                    <BiLogOut 
                        cursor="pointer" 
                        size={22} 
                        onClick={()=>{
                            dispatch( logout() )
                            dispatch( resetWishlist() )
                            dispatch( resetCart() )
                            dispatch( resetUser() )
                        }}
                    />                    
                }
                
            </div>
            {
                showMenu && <Menu hideMenu={ setShowMenu } menuOpen={ showMenu } />
            }
        </div>
    )
}
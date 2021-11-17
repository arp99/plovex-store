/** @jsxImportSource @emotion/react */
import "twin.macro"
import { Button } from "../../Components"
import { useSelector } from "react-redux"
import EmptyCart from "./assets/nothing_found.png"
import { Link } from "react-router-dom"

export const Cart = () => {
    const { products } = useSelector( state => state.wishlist)
    return(
        <main tw="w-full min-h-screen pt-24">
            {
                products.length === 0 &&
                <div tw="w-max flex flex-col items-center mx-auto">
                    <img 
                        src={EmptyCart} 
                        alt="empty Cart" 
                        tw="w-60 h-60 sm:(w-96 h-96)" 
                    />
                    <p tw="text-base font-bold text-tertiary mb-3 sm:text-xl">
                        Cart is Empty
                    </p>
                    <Link to="/">
                        <Button variant="secondary">Shop Now</Button>
                    </Link>
                </div>
            
            }
        </main>
    )
}
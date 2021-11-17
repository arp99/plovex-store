/** @jsxImportSource @emotion/react */
import "twin.macro"
import { useSelector } from "react-redux"
import EmptyWishlist from "./assets/nothing_found.png"
import { Link } from "react-router-dom"
import { Button } from "../../Components"

export const Wishlist = () => {
    const { products } = useSelector( state => state.wishlist)
    return(
        <main tw="w-full min-h-screen pt-24">
            {
                products.length === 0 &&
                <div tw="w-max flex flex-col items-center mx-auto">
                    <img 
                        src={EmptyWishlist} 
                        alt="empty wishlist" 
                        tw="w-60 h-60 sm:(w-96 h-96)" 
                    />
                    <p tw="text-base font-bold text-tertiary mb-3 sm:text-xl">Wishlist is Empty</p>
                    <Link to="/">
                        <Button variant="secondary">Add Some?</Button>
                    </Link>
                </div>
            
            }
        </main>
    )
}
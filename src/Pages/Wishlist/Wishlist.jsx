/** @jsxImportSource @emotion/react */
import "twin.macro"
import { useSelector } from "react-redux"
import EmptyWishlist from "./assets/nothing_found.png"
import { Link } from "react-router-dom"
import { Button, Productcard, SkeletonUI, StyledGrid } from "../../Components"

export const Wishlist = () => {
    const { products, wishlistFetchStatus } = useSelector( state => state.wishlist)
    console.log({ wishlistFetchStatus })
    return(               
        <main tw="pt-24 min-h-screen text-center mx-auto w-11/12" >
            {
                wishlistFetchStatus === 'loading' && 
                <StyledGrid>
                    <SkeletonUI />
                </StyledGrid>
            }
            {
                products.length === 0 && wishlistFetchStatus === 'fulfilled' &&
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
            {
                products.length > 0 && 
                <>
                    <h1>Wishlist Items</h1>
                    <StyledGrid>
                        {
                            products.map(({ _id, image, name, price, oldPrice, newLaunch })=>{
                                return(
                                    <Productcard 
                                        key = { _id }
                                        productId = { _id }
                                        productImg = { image }
                                        title = { name }
                                        newPrice = { price }
                                        oldPrice = { oldPrice }
                                        newProduct = { newLaunch }
                                        inWishlist = { true }
                                    />
                                )
                            })
                        }
                    </StyledGrid>
                </>
            }
        </main>
    )
}
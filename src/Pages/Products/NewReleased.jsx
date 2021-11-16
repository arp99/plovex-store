/** @jsxImportSource @emotion/react */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import tw from "twin.macro"
import { loadNewProducts } from "../../app/Features/Products/products"
import { isProductInWishlist } from "../../app/Features/Wishlist/services/WishlistServices"
import { Productcard, SkeletonUI, StyledGrid } from "../../Components"

export const NewReleased = () => {
    
    const { new_releases } = useSelector( state => state.product )
    const productDispatch = useDispatch()
    useEffect(()=>{
        
        if( new_releases.length === 0 ){
            productDispatch(loadNewProducts())
        }

    },[ productDispatch, new_releases ])
    
    const { products } = useSelector( state => state.wishlist )

    console.log(new_releases)
    return(
        <div tw="mt-36">
            <h2>New Releases</h2>
            <StyledGrid>
                {
                    new_releases.length === 0 && <SkeletonUI />
                }
                {
                    new_releases.length > 0 && 
                    new_releases.map(({ _id, image, name, price, oldPrice, newLaunch }) => (
                        
                        <Productcard 
                            key = { _id }
                            productId = { _id }
                            productImg = { image }
                            title = { name }
                            newPrice = { price }
                            oldPrice = { oldPrice }
                            newProduct = { newLaunch }
                            inWishlist = { isProductInWishlist(products, _id) }
                        />
                    ))
                }
            </StyledGrid>
        </div>
    )
}
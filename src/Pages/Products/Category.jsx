/** @jsxImportSource @emotion/react */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import "twin.macro"
import { loadCategory } from "../../app/Features/Products/products"
import { isProductInWishlist } from "../../app/Features/Wishlist/services/WishlistServices"
import { Productcard, SkeletonUI, StyledGrid } from "../../Components"

export const Category = () => {
    const location = useLocation()
    const urlPaths = location.pathname.slice(1).split("/")
    const filterValue = urlPaths[2]
    const { category } = useSelector( state => state.product )
    const productDispatch = useDispatch()
    
    useEffect(()=>{
        
        if( filterValue && !category[filterValue] ){

            productDispatch(loadCategory({ category : filterValue }))
        }

    },[ productDispatch, filterValue, category ])
    
    const { products } = useSelector( state => state.wishlist )
    console.log("Wishlist products: ", products)
    console.log(category)
    return(
        <div tw="mt-36 pb-10 px-5">
            <h2>{filterValue}</h2>
            <StyledGrid>
                {
                    !category[filterValue] && <SkeletonUI />
                }
                {
                    category[filterValue] && 
                    category[filterValue].map(({ _id, image, name, price, oldPrice, newLaunch }) => (
                        
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
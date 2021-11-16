/** @jsxImportSource @emotion/react */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import "twin.macro"
import { loadBrand } from "../../app/Features/Products/products"
import { isProductInWishlist } from "../../app/Features/Wishlist/services/WishlistServices"
import { Productcard, SkeletonUI, StyledGrid } from "../../Components"

export const Brand = () => {
    const location = useLocation()
    const urlPaths = location.pathname.slice(1).split("/")
    const filterValue = urlPaths[2]
    const { brand } = useSelector( state => state.product )
    const productDispatch = useDispatch()
    
    useEffect(()=>{
        
        if( filterValue && !brand[filterValue] ){

            productDispatch(loadBrand({ brand : filterValue }))
        }

    },[ productDispatch, filterValue, brand ])

    const { products } = useSelector( state => state.wishlist )

    
    console.log(brand)
    return(
        <div tw="mt-36">
            <h2>{filterValue}</h2>
            <StyledGrid>
                {
                    !brand[filterValue] && <SkeletonUI />
                }
                {
                    brand[filterValue] && 
                    brand[filterValue].map(({ _id, image, name, price, oldPrice, newLaunch }) => (
                        
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
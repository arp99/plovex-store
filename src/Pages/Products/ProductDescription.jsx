/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useParams } from "react-router"
import { Link } from "react-router-dom"
import tw from "twin.macro"
import { addToCart, decreaseQuantity } from "../../app/Features/Cart/Cart"
import { getItemQuantity, isProductInCart } from "../../app/Features/Cart/services/cartServices"
import { Button } from "../../Components"
import { IncrementDecrementBtn } from "../../Components/styledComponents/StyledComponents"

export const ProductDescription = ( ) => {
    const location = useLocation()
    const { 
        productImg,
        title,
        newPrice,
        oldPrice,
        inWishlist
    } = location.state || {}
    console.log(location.state)
    const { productId } = useParams()
    const { userId } = useSelector( state => state.auth )
    const dispatch = useDispatch()
    const { products } = useSelector( state => state.cart )
    const inCart = isProductInCart(products, productId)
    const quantityInCart = getItemQuantity(products, productId)
    const [ quantity, setQuantity ] = useState(!inCart && 1 )

    useEffect(()=>{
        if( inCart ){
            setQuantity(quantityInCart)
        }
    },[ inCart, quantityInCart ])

    return(
        <main tw="w-full h-screen pt-24 flex items-center justify-center">
            <div
                css={
                    css`
                        max-width:700px;
                        ${tw`flex flex-col w-5/6 h-5/6 md:(flex-row h-3/4)`}
                    `
                }
            >
                <img 
                    src={ productImg }
                    alt="product"
                    
                    css={
                        css`
                            ${tw`mx-auto w-1/2 h-full`}
                        `
                    }
                />
                <div
                    tw="w-full h-full md:(px-2 justify-start)"
                >
                    <p tw="text-primary-ligter w-max font-bold text-xl mb-3 mx-auto md:mx-0">{ title }</p>
                    <p tw="w-48 mx-auto flex justify-between text-tertiary text-lg mb-7 md:(w-2/3 mx-0) ">
                        <span>Rs.{ newPrice }</span>  
                        { oldPrice > 0 && <span tw="line-through">Rs.{ oldPrice }</span>}
                    </p>
                    <div tw="w-32 mb-4 mx-auto flex justify-between items-center md:mx-0">
                        <IncrementDecrementBtn 
                            css={
                                css`
                                    ${quantity === 1 && tw`cursor-not-allowed`}
                                `
                            }
                            onClick={(evt)=>{
                                if( quantity > 1){
                                    dispatch(decreaseQuantity({ productId, userId }))
                                }else{
                                    evt.preventDefault()
                                }
                            }}
                        >-</IncrementDecrementBtn>
                        <span>{ quantity }</span>
                        <IncrementDecrementBtn
                            css={
                                css`
                                    ${ quantity === 5 && tw`cursor-not-allowed`}
                                `
                            }
                            onClick={(evt)=>{
                                if( quantity < 5 ){
                                    dispatch(addToCart({ productId, userId }))
                                }else{
                                    evt.preventDefault()
                                }
                            }}
                        >+</IncrementDecrementBtn>
                    </div>
                    <div tw="w-full flex justify-center md:(w-72 justify-between)">
                        {
                            inCart 
                            ?                  
                            <Link to="/cart">
                                <Button variant="primary" size="small">Go to Cart</Button>
                            </Link>
                            :
                            <Button 
                                variant="primary"
                                size="small"
                                onClick={()=> dispatch(addToCart({ productId, userId }))}
                            >
                                Add to Cart
                            </Button>
                        }
                        {
                            inWishlist 
                            ?
                            <Link to="/cart">
                                <Button variant="secondary" size="small">Go to Wishlist</Button>
                            </Link>
                            :
                            <Button variant="secondary" size="small">Add to Wishlist</Button>
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}
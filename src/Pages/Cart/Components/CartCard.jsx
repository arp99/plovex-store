/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import tw from "twin.macro"
import { addToCart, decreaseQuantity, removeProduct } from "../../../app/Features/Cart/Cart"
import { Button } from "../../../Components"
import { IncrementDecrementBtn } from "../../../Components/styledComponents/StyledComponents"

export const CartCard = ({ product, quantity, userId }) => {
    const [ itemQuantity, setQuantity ] = useState( quantity )
    const { _id : productId, image, name, price, oldPrice, brand } = product
    const dispatch = useDispatch()

    useEffect(()=>{
        setQuantity( quantity )
    },[ quantity ])
    return(
        <div
            tw="w-full h-64 flex border-0 border-b border-solid border-b-tertiary p-2"
        >
            {/**For image and quantity */}
            <div
                css={
                    css`
                        width:40%;
                    `
                }
            >
                {/* image  */}
                <div
                    css={
                        css`
                            ${tw`w-full h-3/4`}
                        `
                    }
                >
                    <img 
                        alt="product"
                        src={ image }
                        css={
                            css`
                                ${tw`w-full h-full`}
                            `
                        }
                    />
                </div>
                {/* Quantity  */}
                <div
                    css={
                        css`
                            ${tw`w-full h-1/4 pt-4`}
                        `
                    }
                >
                    <IncrementDecrementBtn
                        css={
                            css`
                                ${itemQuantity === 1 && tw`cursor-not-allowed`}
                            `
                        }
                        onClick={(evt)=>{
                            if( userId && itemQuantity > 1){
                                dispatch(decreaseQuantity({ productId, userId }))
                            }else{
                                evt.preventDefault()
                            }
                        }}
                    >-</IncrementDecrementBtn>
                    <span tw="px-3 py-1.5">{ itemQuantity }</span>
                    <IncrementDecrementBtn
                        css={
                            css`
                                ${ itemQuantity === 5 && tw`cursor-not-allowed`}
                            `
                        }
                        onClick={(evt)=>{
                            if( userId && quantity < 5 ){
                                dispatch(addToCart({ productId, userId }))
                            }else{
                                evt.preventDefault()
                            }
                        }}
                    >+</IncrementDecrementBtn>
                </div>
            </div> 
            {/**Description*/}
            <div
                css={
                    css`
                        width:60%;
                        ${tw`px-2 flex flex-col justify-between`}
                    `
                }
            >
                <div>
                    <p tw="text-xl text-primary-darker">{ name }</p>
                    <p tw="text-lg text-primary-ligter">By { brand }</p>
                </div>
                <p tw="text-tertiary text-base">
                    <span>Rs. { price * itemQuantity }</span>
                    { oldPrice > 0 && <span tw="line-through ml-4">Rs. { oldPrice }</span>}
                </p>
                <Button 
                    variant="secondary" 
                    size="small"  
                    onClick={()=> dispatch( removeProduct({ productId, userId }))}
                >
                    Remove
                </Button>
            </div> 
        </div>
    )
}
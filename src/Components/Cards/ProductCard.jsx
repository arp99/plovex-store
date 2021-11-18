/** @jsxImportSource @emotion/react */
import "twin.macro"
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../app/Features/Wishlist/wishlist";
import { Link } from "react-router-dom";

export const Productcard = ({ productId, productImg, title, newPrice, oldPrice, newProduct, inWishlist }) => {
    const { userId } = useSelector( state => state.auth )
    const wishlistDispatch = useDispatch()

    return (
        <Link to={`/products/${productId}`}
            state = {{
                productImg,
                title,
                newPrice,
                oldPrice,
                inWishlist
            }}
            tw="no-underline text-current"
        >
            <div
                tw="flex flex-col w-full h-full cursor-pointer duration-300 ease-in-out rounded-lg text-left pb-2 hover:shadow-xl"
            >
                <div tw="w-full h-96 relative">
                    <img
                        src={ productImg }
                        alt="product"
                        tw="w-full h-full"
                    />
                    <div tw="p-1 rounded-xl bg-secondary w-max absolute right-1 bottom-1" >
                        { 
                            inWishlist ?
                            <BsSuitHeartFill onClick={(evt)=>{
                                evt.preventDefault()
                                wishlistDispatch(removeFromWishlist({ productId, userId }))
                            }} 
                            />
                            :
                            <BsSuitHeart onClick={(evt)=>{
                                evt.preventDefault()
                                wishlistDispatch(addToWishlist({ productId, userId }))
                            }}
                            />
                        } 
                    </div>
                </div>

                <div
                    tw="
                        flex flex-col
                        justify-between
                        px-2
                        flex-1
                    "
                >
                    <p tw="text-primary text-lg">{ title }</p>
                    <p tw="text-tertiary text-base">
                        <span>Rs. { newPrice }</span>
                        { oldPrice > 0 && <span tw="line-through ml-4">Rs. { oldPrice }</span>}
                    </p>
                    { newProduct && <p tw="text-red-500 text-sm tracking-wider">New</p>}
                </div>
            </div>
        </Link>
    );
}
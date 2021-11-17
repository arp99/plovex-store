import { axiosAuthorization } from "../../Auth/services/axiosInstance"

export const addProductToCart = ( productId, userId ) => {
    return axiosAuthorization.post(`cart/${userId}/update_cart`,{
        productId
    })
}

export const decreaseProductQuantity = ( productId, userId ) => {
    return axiosAuthorization.post(`cart/${userId}/decrease_cart_item`,{
        productId
    })
}

export const removeProductFromCart = ( productId, userId ) => {
    return axiosAuthorization.post(`cart/${userId}/remove_item_from_cart`,{
        productId
    })
}

export const getCartProducts = ( userId ) => {
    return axiosAuthorization.get(`cart/${userId}/cart_products`)
}

export const isProductInCart = ( products, productId ) => {
    const foundProduct = products.filter(({ product })=> product._id === productId )
    return foundProduct.length > 0 ? true : false
}

export const getItemQuantity = ( products, productId ) => {
    const foundProduct = products.filter(({ product })=> product._id === productId )
    return foundProduct[0]?.quantity
}
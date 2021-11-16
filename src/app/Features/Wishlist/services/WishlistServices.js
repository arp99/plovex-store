import { axiosAuthorization } from "../../Auth/services/axiosInstance";

export const addProductToWishlist = ( productId, userId ) => {
    return axiosAuthorization.post(`wishlist/${userId}/add_to_wishlist`,{
        productId
    })
}

export const removeProductFromWishlist = ( productId, userId ) => {
    return axiosAuthorization.post(`wishlist/${userId}/remove_from_wishlist`,{
        productId        
    })
}

export const getWishlistItems = ( userId ) => {
    return axiosAuthorization.get(`wishlist/${ userId }/wishlist_products`)
}

export const isProductInWishlist = ( products, productId ) => {
    
    const foundProduct = products.filter(product => product._id === productId)
    return foundProduct.length > 0 ? true : false
}
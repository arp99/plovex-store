import axiosInstance from "../../Auth/services/axiosInstance"

export const fecthNewReleases = () => {
    return axiosInstance.get("products/new-releases")
}
export const fetchProductByCategory = ( category ) => {
    return axiosInstance.get(`products/filter?category=${ category }`)
}

export const fetchProductByBrand = ( brand ) => {
    return axiosInstance.get(`products/filter?brand=${ brand }`)
}
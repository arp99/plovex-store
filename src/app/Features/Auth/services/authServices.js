import axiosInstance from "./axiosInstance"

export const loginUser = async ( email, password ) => {
    return axiosInstance.post("login",{
        email,
        password
    })
}

export const signupUser = async ( firstName, lastName, email, password ) => {
    return axiosInstance.post("signup",{
        firstName,
        lastName,
        email,
        password
    })
}
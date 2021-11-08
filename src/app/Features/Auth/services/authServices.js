import axios from "axios"

export const loginUser = async ( email, password ) => {
    return axios.post("url",{
        email,
        password
    })
}

export const signupUser = async ( firstName, lastName, email, password ) => {
    return axios.post("url",{
        firstName,
        lastName,
        email,
        password
    })
}
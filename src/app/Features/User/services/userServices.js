import { axiosAuthorization } from "../../Auth/services/axiosInstance"

export const getUserDataService = () => {
  return axiosAuthorization.get("user")
}
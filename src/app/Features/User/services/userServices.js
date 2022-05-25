import { axiosAuthorization } from "../../Auth/services/axiosInstance";

export const getUserDataService = () => {
  return axiosAuthorization.get("user");
};

export const addAddressService = (address) => {
  return axiosAuthorization.post("user/address", {
    ...address,
  });
};

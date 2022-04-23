import { ActionTypes } from "../../Utils/ActionConstants";
import { toast } from "react-toastify";

export const Notification = (ActionType, message) => {
  switch (ActionType) {
    case ActionTypes.loginSuccess:
      return toast.success(message);
    case ActionTypes.loginError:
      return toast.error(message);
    case ActionTypes.signupSuccess:
      return toast.success(message);
    case ActionTypes.signupError:
      return toast.error(message);
    case ActionTypes.logoutSuccess:
      return toast.success(message);
    case ActionTypes.cartSuccess:
      return toast.success(message);
    case ActionTypes.cartError:
      return toast.error(message);
    case ActionTypes.wishlistSuccess:
      return toast.success(message);
    case ActionTypes.wishlistError:
      return toast.error(message);
    default:
      return toast(message);
  }
};

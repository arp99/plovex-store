import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import "./App.css";
import { fetchCartItems } from "./app/Features/Cart/Cart";
import { fetchFomWishlist } from "./app/Features/Wishlist/wishlist";
import { getUserData } from "./app/Features/User/User";
import { Navbar } from "./Components";
import {
  Brand,
  Cart,
  Category,
  Checkout,
  Home,
  Login,
  NewReleased,
  ProductDescription,
  Profile,
  Signup,
  Wishlist,
} from "./Pages";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute";
import { logout } from "./app/Features/Auth/auth";
import { isTokenExpired } from "./Utils/checkTokenValidity";
import { FilterDataProvider } from "./Pages/Products/context/FilterTypeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const { userId, token } = useSelector((state) => state.auth);
  const { wishlistFetchStatus } = useSelector((state) => state.wishlist);
  const { cartFetchStatus } = useSelector((state) => state.cart);
  const { userDataStatus } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //logout user if token expired
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenExpired(token)) {
      dispatch(logout());
    }
  }, [dispatch]);

  useEffect(() => {
    if (userId && userDataStatus === "idle" && !isTokenExpired(token)) {
      dispatch(getUserData());
    }
  }, [userId, dispatch, userDataStatus, token]);

  useEffect(() => {
    if (userId && wishlistFetchStatus === "idle" && !isTokenExpired(token)) {
      dispatch(fetchFomWishlist({ userId }));
    }
  }, [userId, dispatch, wishlistFetchStatus, token]);

  useEffect(() => {
    if (userId && cartFetchStatus === "idle" && !isTokenExpired(token)) {
      dispatch(fetchCartItems({ userId }));
    }
  }, [userId, dispatch, cartFetchStatus, token]);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnHover={false}
        draggable
        draggableDirection="x"
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products">
          <Route
            path="new_releases"
            element={
              <FilterDataProvider>
                <NewReleased />
              </FilterDataProvider>
            }
          />
          <Route
            path="brand/:brandname"
            element={
              <FilterDataProvider>
                <Brand />
              </FilterDataProvider>
            }
          />
          <Route
            path="category/:categoryname"
            element={
              <FilterDataProvider>
                <Category />
              </FilterDataProvider>
            }
          />
          <Route path=":productId" element={<ProductDescription />} />
        </Route>

        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

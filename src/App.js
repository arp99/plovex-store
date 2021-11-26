import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import './App.css';
import { fetchCartItems } from './app/Features/Cart/Cart';
import { fetchFomWishlist } from './app/Features/Wishlist/wishlist';
import { Navbar } from './Components';
import { Brand, Cart, Category, Home, Login, NewReleased, ProductDescription, Profile, Signup, Wishlist } from './Pages';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import jwt_decode from "jwt-decode";
import { logout } from './app/Features/Auth/auth';
import { FilterDataProvider } from './Pages/Products/context/FilterTypeProvider';

function App() {

  const { userId } = useSelector( state => state.auth )
  const { wishlistFetchStatus } = useSelector( state => state.wishlist )
  const { cartFetchStatus } = useSelector( state => state.cart )
  const dispatch = useDispatch()

  useEffect(()=>{
    if( userId && wishlistFetchStatus === 'idle'){
      dispatch( fetchFomWishlist({ userId }))
    }
  },[ userId, dispatch, wishlistFetchStatus ])

  useEffect(()=>{
    if( userId && cartFetchStatus === 'idle'){
      dispatch(fetchCartItems({ userId }))
    }
  },[ userId, dispatch, cartFetchStatus ])

  //logout user if token expired
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if( token && jwt_decode(token).exp*1000 < Date.now() ){
      dispatch( logout() )
    }
  },[ dispatch ])

  return (
    <div className="App">
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

        <Route path="/wishlist" 
          element={ 
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute> 
          } 
        />
        <Route path="/cart" 
          element={ 
            <PrivateRoute>
              <Cart />
            </PrivateRoute> 
          } 
        />
        <Route path="/profile" 
          element={ 
            <PrivateRoute>
              <Profile />
            </PrivateRoute> 
          } 
        />
      </Routes>      
    </div>
  );
}

export default App;

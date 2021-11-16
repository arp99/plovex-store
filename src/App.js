import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import './App.css';
import { fetchFomWishlist } from './app/Features/Wishlist/wishlist';
import { Navbar } from './Components';
import { Brand, Cart, Category, Home, Login, NewReleased, Profile, Signup, Wishlist } from './Pages';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';

function App() {

  // TODO: Fetch wishlist in cart data on login 
  const { userId } = useSelector( state => state.auth )
  const { wishlistFetchStatus } = useSelector( state => state.wishlist )
  const wishlistDispatch = useDispatch()

  useEffect(()=>{
    if( userId && wishlistFetchStatus === 'idle'){
      wishlistDispatch( fetchFomWishlist({ userId }))
    }
  },[ userId, wishlistDispatch, wishlistFetchStatus ])


  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products">
          <Route path="new_releases" element={<NewReleased />}/>
          <Route path="brand/:brandname" element={<Brand />}/>
          <Route path="category/:categoryname" element={<Category />}/>
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

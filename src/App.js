import { Route, Routes } from 'react-router';
import './App.css';
import { Navbar } from './Components';
import { Brand, Cart, Category, Home, Login, NewReleased, Profile, Signup, Wishlist } from './Pages';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';

function App() {
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

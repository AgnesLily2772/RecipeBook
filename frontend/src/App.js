import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Components/Home.jsx"
import Navigationbar from "./Components/Navbar.jsx"
import Signup from "./Pages/Signup.jsx"
import { AuthDataContext } from './Context/AuthContext.js';
import './Styles/Styles.css';
import Signin from './Pages/Signin.jsx';
import Signout from './Pages/Signout.jsx';
import Profile from './Pages/Profile.jsx';
import MyRecipes from './Pages/MyRecipes.jsx';
import CreateRecipe from './Pages/CreateRecipe.jsx';
import UpdateRecipe from './Pages/UpdateRecipe.jsx';
import ViewRecipe from './Pages/ViewRecipe.jsx';

export default function App() {
  return (
    <div className="App">
        <AuthDataContext>
        <BrowserRouter>
                <Navigationbar/>
                        <Routes>
                                <Route exact path="/" element={<Home />} />
                                <Route exact path="/signup" element={<Signup />} />
                                <Route exact path="/signin" element={<Signin />} />
                                <Route exact path="/signout" element={<Signout />} />
                                <Route exact path="/profile" element={<Profile />} />
                                <Route exact path="/myRecipes" element={<MyRecipes />} />
                                <Route exact path="/createRecipe" element={<CreateRecipe />} />
                                <Route exact path="/getRecipe/:id" element={<ViewRecipe />} />
                                
                                <Route exact path="/updateRecipe/:id" element={<UpdateRecipe />} />
                        </Routes>
                </BrowserRouter>
        </AuthDataContext>
    </div>
  );
}

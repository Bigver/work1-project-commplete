import Navbar from "./components/Navbar"
import ActionScreen from "./page/ActionScreen"
import AddAction from "./page/AddAction";
import AdminDashBoard from "./page/AdminDashBoard";
import CartScreen from "./page/CartScreen";
import EditAction from "./page/EditAction";
import HomeScreen from "./page/HomeScreen"
import Login from "./page/Login";
import Register from "./page/Register";
import './scss/app.scss'
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <>
      <BrowserRouter>
        <div>
          <header>
            <Navbar/>
          </header>
          <ToastContainer position="bottom-center" limit={1} />
          <main>
            <Routes>
                <Route  path="/" element={<HomeScreen />} />
                <Route  path="/action/:id" element={<ActionScreen />} />
                <Route  path="/login" element={<Login />} />
                <Route  path="/register" element={<Register />} />
                <Route  path="/admin" element={<AdminDashBoard />} />
                <Route  path="/edit/:id" element={<EditAction />} />
                <Route  path="/add" element={<AddAction />} />
                <Route  path="/cart" element={<CartScreen />} />
            </Routes>
          </main>
      </div>
      </BrowserRouter>
    </>
  )
}

export default App

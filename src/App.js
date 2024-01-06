import Cart from "../src/headerComponents/Home";
import CartLogin from "./routeComponents/login/logIn";
import SignUp from "./routeComponents/login/signUP";
import CartItems from "../src/routeComponents/carT";
import ContactUs from "../src/routeComponents/Contactus";
import GetStarted from "./routeComponents/getStarted";
// import PasswordReset from "./routeComponents/login/passwordReset";
import Admin from "./adminComponents/admin";
import { Routes, Route } from "react-router-dom";
import AddProducts from "./adminComponents/CardComponents/addProducts";
import AdminLogin from "./adminComponents/adminLogin";
import ViewProducts from "./adminComponents/CardComponents/viewProducts";
import UpdateUser from "./adminComponents/CardComponents/updateUser";
import UserOrders from "./routeComponents/login/userOrders";
import UserView from "./routeComponents/login/userView";
import Payment from "./routeComponents/Payment/index";
import UserDetails from "./adminComponents/CardComponents/userDetails";
import Orders from "./adminComponents/CardComponents/orderS";
import Chat from "./Chat";


function App() {
  return (
    <>
      <Routes>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/home" element={<Cart />} />
        <Route path="/" element={<GetStarted />} />
        <Route path="/login" element={<CartLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<CartItems />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/admin/home" element={<Admin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/addProducts" element={<AddProducts />} />
        <Route path="/userOrders" element={<UserOrders />} />
        <Route path="/admin/updateProducts/:slno" element={<UpdateUser />} />
        <Route path="/admin/OrderedProducts"element={<Orders/>}/>
        <Route path="/admin/viewProducts" element={<ViewProducts />} />
        <Route path="*" element={<h1>404 not found</h1>} />
        <Route path="/userview/:slno" element={<UserView />} />
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/admin/userDetails" element={<UserDetails/>}/>
      </Routes>
    </>
  );
}

export default App;

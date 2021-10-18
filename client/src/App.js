import './App.css';
import Header from './components/Header/header.component';
import Footer from './components/Footer/Footer.component';
import Home from './Pages/Home/home.pages';
import { Route, Switch } from 'react-router';
import ProductPage from './Pages/ProductDetail/product.page';
import Cart from './Pages/Cart/cart.page';
import Login from "./Pages/Login/login.component";
import Register from './Pages/Register/register.page';
import Profile from './Pages/Profile/profile.page';
import Shipping from './Pages/Shipping/shipping.page';
import Payment from './Pages/Payment/payment.page';
import PlaceOrder from './Pages/PlaceOrder/order.page';
import OrderDetails from './Pages/PlaceOrder/details.page';
import UsersList from './Pages/users/users.page';
import EditUser from './Pages/EditUser/edit.page';
import ProductsList from './Pages/Products/products.page';
import EditProduct from './Pages/EditProduct/edit.page'
import AddProduct from './Pages/AddProduct/add.page';
import OrdersList from './Pages/Orders/orders.page';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
      <Route path="/cart/:id?" exact component={Cart} />
      <Route path="/order/:id" exact component={OrderDetails} />
      <Route path="/admin/orders" exact component={OrdersList} />
      <Route path="/register" exact component={Register} />
      <Route path="/payment" exact component={Payment} />
      <Route path="/placeorder" exact component={PlaceOrder} />
      <Route path="/shipping" exact component={Shipping} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/login" exact component={Login} />
      <Route path="/products/:id" exact component={ProductPage} />
      <Route path="/admin/users" exact component={UsersList} />
      <Route path="/admin/users/:id/edit" exact component={EditUser} />
      <Route path="/admin/products/:id/edit" exact component={EditProduct} />
      <Route path="/admin/products" exact component={ProductsList} />
      <Route path="/admin/products/page/:page" exact component={ProductsList} />
      <Route path="/admin/products/add" exact component={AddProduct} />
      <Route path="/search/:query" exact component={Home} />
      <Route path="/page/:page" exact component={Home} />
      <Route path="/" exact component={Home} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;

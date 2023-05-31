import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import AppContext from "./utils/context";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Checkout from "./components/Checkout/Checkout";
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContext>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Newsletter />
          <Footer />
        </AppContext>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

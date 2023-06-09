import { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { FiChevronUp , FiChevronDown} from "react-icons/fi";
import "./Header.scss";
import Search from "./Search/Search";
import { Context } from "../../utils/context";
import Cart from "../Cart/Cart";
import { useDispatch , useSelector } from "react-redux";
import { openCart } from "../../app/reduxSlice/CartSlice";

import cat1 from "../../images/cat1.png";
import cat2 from "../../images/cat2.png";
import cat3 from "../../images/cat3.png";
import cat4 from "../../images/cat4.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const categoriesRef = useRef(null);
  const [isIcon1, setIsIcon1] = useState(true);
  const navigate = useNavigate();
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const { amount, isOpen } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const toggleCategories = () => {
    categoriesRef.current.classList.toggle("showCategories");
    setIsIcon1((prevState) => !prevState);
  };
  const handleClick = (e) => {
      const id_category = e.currentTarget.id;
      navigate(`/category/${id_category}`);
  }

  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""} `}>
        <div className="container header-content">
          <ul className="left">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a  onClick={toggleCategories}>Categories {isIcon1 ? <FiChevronDown /> : <FiChevronUp />}</a>
              <div className="categories" ref={categoriesRef}>
                <ul>
                  <li id="1" className="category" onClick={handleClick}>
                    <img src={cat1}></img>
                    <p>Push</p>
                  </li>
                  <li id="2" className="category" onClick={handleClick}>
                    <img src={cat2}></img>
                    <p>Pull</p>
                  </li>
                  <li id="3" className="category" onClick={handleClick}>
                    <img src={cat3}></img>
                    <p>Legs</p>
                  </li>
                  <li id="4" className="category" onClick={handleClick}>
                    <img src={cat4}></img>
                    <p>Others</p>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div className="center">
            <Link to="/">CaliFit</Link>
          </div>
          <div className="right">
            <TbSearch onClick={() => setSearchModal(true)} />
            {/* <AiOutlineHeart /> */}
            <span className="cart-icon" onClick={() => dispatch(openCart())}>
              <CgShoppingCart />
              {!!amount && <span>{amount}</span>}
            </span>
          </div>
        </div>
      </header>
      {searchModal && <Search setSearchModal={setSearchModal} />}
      {isOpen && <Cart />}
    </>
  );
};

export default Header;

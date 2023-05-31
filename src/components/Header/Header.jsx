import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import "./Header.scss";
import Search from "./Search/Search";
import { Context } from "../../utils/context";
import Cart from "../Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { openCart } from "../../app/reduxSlice/CartSlice";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [searchModal, setSearchModal] = useState(false);
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

    // const { amount, showCart, setShowCart } = useContext(Context);
    const {amount ,isOpen} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log(isOpen);
    },[isOpen]);


    return (
        <> 
            <header
                className={`main-header ${scrolled ? "sticky-header" : ""}`}
            >
                <div className="container header-content">
                    <ul className="left">
                        <li><Link to='/'>Home</Link></li> 
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/categories'>Categories</Link></li>
                    </ul>
                    <div className="center" >
                     <Link to="/">CaliFit</Link>   
                    </div>
                    <div className="right">
                        <TbSearch onClick={() => setSearchModal(true)} />
                        <AiOutlineHeart />
                        <span
                            className="cart-icon"
                            onClick={() => dispatch(openCart())}
                        >
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

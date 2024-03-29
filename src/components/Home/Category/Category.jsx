import { useNavigate } from "react-router-dom";
import "./Category.scss";

import cat1 from "../../../images/cat1.webp";
import cat2 from "../../../images/cat2.webp";
import cat3 from "../../../images/cat3.webp";
import cat4 from "../../../images/cat4.webp";
import { useContext } from "react";
import { Context } from "../../../utils/context";

const Category = () => {
    const navigate = useNavigate();
    const handleClick = (e) => {
        const id_category = e.currentTarget.id;
        navigate(`/category/${id_category}`);
    }
    return (
        <div id="categories" className="shop-by-category">
            <div  className="categories">

                <div id="2" className="category" data-cat-type="Pull" onClick={handleClick} >
                    <img src={cat1} alt="cat1" />
                </div>
                <div id="1" className="category" data-cat-type="Push" onClick={handleClick}>
                    <img src={cat2} alt="cat1" />
                </div>
                <div id="3" className="category" data-cat-type="Legs" onClick={handleClick}>
                    <img src={cat3} alt="cat1" />
                </div>
                <div id="4" className="category" data-cat-type="Others" onClick={handleClick}>
                    <img src={cat4} alt="cat1" />
                </div>
            </div>
        </div>
    );
};

export default Category;


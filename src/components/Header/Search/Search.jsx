import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import "./Search.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../app/reduxSlice/ProductSlice";

const Search = ({ setSearchModal }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { products, productsStatus } = useSelector((state) => state.product);

    const onChange = (e) => {
        setQuery(e.target.value);
    };
    
    return (
        <div className="search-modal">
            <div className="form-field">
                <input
                    autoFocus
                    type="text"
                    placeholder="Search for products"
                    value={query}
                    onChange={onChange}
                />
                <MdClose
                    className="close-btn"
                    onClick={() => setSearchModal(false)}
                />
            </div>
            <div className="search-result-content">
                {!query && (
                    <div className="start-msg">
                        Start typing to see products you are looking for.
                    </div>
                )}
                <div className="search-results">
                    {products?.filter((val) => {
                        if (query === '') {
                        return false;
                        } else if (val.title.toLowerCase().includes(query.toLowerCase())) {
                        return true;
                        }
                        return false;
                    })
                    .map((item) => (
                        <div
                            className="search-result-item"
                            key={item.id}
                            onClick={() => {
                                navigate("/product/" + item.id);
                                setSearchModal(false);
                            }}
                        >
                            <div className="image-container">
                                <img
                                src={"http://127.0.0.1:8000/storage/" + item.image_url}
                                alt="productImage"
                                />
                            </div>
                            <div className="prod-details">
                                <span className="name">
                                    {item.title}
                                </span>
                                <span className="desc">
                                    {item.description}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;


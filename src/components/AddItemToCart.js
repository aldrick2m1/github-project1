import axios from "axios";
import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

const AddItemToCart = ({ dispatch, state }) => {
  const findIndex = state.items.filter((item) => item.qnty >= 1);
  return findIndex.length === 0
    ? "No orders yet . . . "
    : findIndex.map((item) => (
        <>
          <div className="item-container-cart">
            <h2>{item.item}</h2>
            <img className="cart-img" src={item.image} alt="item-img"></img>
            <h2 className="cat">Php {item.price}</h2>
            <div className="qnty-changer">
              <button
                onClick={() => {
                  dispatch({
                    type: "DECREMENT_QNTY",
                    payload: { qnty: item.qnty, id: item.id },
                  });
                  axios
                    .put(`http://localhost:8080/products/status/${item.id}`, {
                      qnty: item.qnty - 1,
                    })
                    .then((response) => {});
                }}
              >
                -
              </button>
              <h2>{item.qnty}</h2>
              <button
                onClick={() => {
                  dispatch({
                    type: "ADDTO_CART",
                    payload: {
                      id: item.id,
                      item: item.item,
                      image: item.image,
                      price: item.price,
                      description: item.description,
                      category: item.category,
                      qnty: item.qnty,
                    },
                  });
                  console.log(item.qnty);
                  console.log(state.items);
                  axios
                    .put(`http://localhost:8080/products/status/${item.id}`, {
                      qnty: item.qnty + 1,
                    })
                    .then((response) => {});
                }}
              >
                +
              </button>
            </div>
            <h2 className="cat">{item.category}</h2>
            <h2>Php {item.qnty * item.price}</h2>
            <RiCloseCircleLine
              className="icons"
              id="icon"
              onClick={() => {
                axios
                  .put(`http://localhost:8080/products/status/${item.id}`, {
                    qnty: item.qnty * 0,
                  })
                  .then((response) => {
                    console.log(response);
                    dispatch({
                      type: "DELETE_ITEM_CART",
                      payload: { id: item.id },
                    });
                  });
              }}
            />
          </div>
        </>
      ));
};

export default AddItemToCart;

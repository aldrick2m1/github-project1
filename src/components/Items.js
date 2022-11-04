import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import "../App.css";
import axios from "axios";

const Items = ({ dispatch, state }) => {
  return state.items.length === 0
    ? "No Items Available"
    : state.items.map((item, index) =>
        state.editForm ? (
          <>
            <div className="item-container" key={index}>
              <div className="icons-container">
                <h5>{item.category}</h5>
                <TiEdit
                  className="icons"
                  onClick={() => {
                    dispatch({ type: "EDIT_ITEM", payload: { id: item.id } });
                    dispatch({
                      type: "TOGGLE_EDIT_FORM",
                      payload: { editForm: state.editForm },
                    });
                    dispatch({
                      type: "SHOW-HIDE-ITEM-FORM-SHOW",
                      payload: { addItemForm: state.addItemForm },
                    });
                  }}
                />
                <RiCloseCircleLine
                  className="icons"
                  onClick={() => {
                    axios
                      .delete(`http://localhost:8080/products/${item.id}`)
                      .then((response) => {
                        dispatch({
                          type: "DELETE_ITEM_CART",
                          payload: { id: item.id },
                        });
                        dispatch({
                          type: "DELETE_ITEM",
                          payload: { id: item.id },
                        });
                        // console.log(state.items)
                        // console.log(response.data)
                      });
                  }}
                />
              </div>
              <h2>{item.item}</h2>
              <img className="item-img" src={item.image} alt="item-img"></img>
              <div className="item-below">
                <h3>Php {item.price}</h3>
                <MdOutlineAddShoppingCart
                  className="icons-add"
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
                        edit: item.edit,
                        qnty: item.qnty,
                      },
                    });
                    axios
                      .put(`http://localhost:8080/products/status/${item.id}`, {
                        qnty: item.qnty + 1,
                      })
                      .then((response) => {});
                  }}
                />
              </div>
              <p>{item.description}</p>
            </div>
          </>
        ) : (
          <>
            <div className="item-container" key={index}>
              <div className="icons-container">
                <h5>{item.category}</h5>
                <RiCloseCircleLine
                  className="icons"
                  onClick={() => {
                    axios
                      .delete(`http://localhost:8080/products/${item.id}`)
                      .then((response) => {
                        dispatch({
                          type: "DELETE_ITEM_CART",
                          payload: { id: item.id },
                        });
                        dispatch({
                          type: "DELETE_ITEM",
                          payload: { id: item.id },
                        });
                        console.log(state.items);
                        console.log(response.data);
                      });
                    dispatch({
                      type: "DELETE_ITEM_CART",
                      payload: { id: item.id },
                    });
                  }}
                />
              </div>
              <h2>{item.item}</h2>
              <img className="item-img" src={item.image} alt="item-img"></img>
              <div className="item-below">
                <h3>Php {item.price}</h3>
                <MdOutlineAddShoppingCart
                  className="icons-add"
                  onClick={() => {
                    axios
                      .put(`http://localhost:8080/products/status/${item.id}`, {
                        qnty: item.qnty + 1,
                      })
                      .then((response) => {});
                    dispatch({
                      type: "ADDTO_CART",
                      payload: {
                        id: item.id,
                        item: item.item,
                        image: item.image,
                        price: item.price,
                        description: item.description,
                        category: item.category,
                      },
                    });
                  }}
                />
              </div>
              <p>{item.description}</p>
            </div>
          </>
        )
      );
};

export default Items;

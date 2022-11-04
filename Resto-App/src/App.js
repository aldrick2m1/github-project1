import React from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { useReducer, useEffect } from "react";
import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";
import Itemform from "./components/Itemform";
import Items from "./components/Items";
import FilterFoodItems from "./components/FilterFoodItems";
import FilterDrinkItems from "./components/FilterDrinkItems";
import AddItemToCart from "./components/AddItemToCart";
import FilterDessertItems from "./components/FilterDessertItems";
import { RiCloseCircleLine } from "react-icons/ri";
import axios from "axios";

const initialItems = {
  updatedItem: {},
  items: [],
  editForm: true,
  addItemForm: false,
  ads: true,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_ITEMS_LIST":
      return { ...state, items: action.payload };

    case "UPDATE_INPUT":
      return {
        ...state,
        updatedItem: {
          ...state.updatedItem,
          [action.payload.key]: action.payload.value,
        },
      };
    case "CLEAR_INPUT":
      return {
        ...state,
        updatedItem: {
          ...state.updatedItem,
          item: "",
          image: "",
          price: "",
          description: "",
          category: "",
        },
      };

    case "ADD_INPUT":
      const newItem = { ...action.payload, qnty: 0 };
      const itemList = state.items.map((e) => e.item.toUpperCase());
      if (itemList.includes(newItem.item.toUpperCase())) {
        alert("Item already exists");
        return { ...state };
      } else if (!newItem.item || /^\s*$/.test(newItem.item)) {
        alert("Input Item name");
        return { ...state };
      } else if (!newItem.price || /^\s*$/.test(newItem.price)) {
        alert("Input Item price");
        return { ...state };
      } else if (!newItem.category || /^\s*$/.test(newItem.category)) {
        alert("Input Item category");
        return { ...state };
      } else {
        return { ...state, items: [...state.items, newItem] };
      }
    case "UPDATE_ITEM":
      const findItemId = state.items.filter(
        (item) => item.item === state.updatedItem.item
      );
      const itemCheckId = findItemId.map((w) => w.id);
      const itemListIndex3 = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const itemListEdit = [...state.items];
      const itemListEdit2 = state.items.map((e) => e.item.toUpperCase());
      const newItem3 = { ...action.payload };
      if (
        itemListEdit2.includes(newItem3.item.toUpperCase()) &&
        !itemCheckId.includes(state.updatedItem.id)
      ) {
        alert("Item already exists");
        return { ...state };
      } else if (!newItem3.item || /^\s*$/.test(newItem3.item)) {
        alert("Input Item name");
        return { ...state };
      } else if (!newItem3.price || /^\s*$/.test(newItem3.price)) {
        alert("Input Item price");
        return { ...state };
      } else if (!newItem3.category || /^\s*$/.test(newItem3.category)) {
        alert("Input Item category");
        return { ...state };
      } else if (itemListIndex3 > -1) {
        itemListEdit[itemListIndex3].id = state.updatedItem.id;
        itemListEdit[itemListIndex3].item = state.updatedItem.item;
        itemListEdit[itemListIndex3].price = state.updatedItem.price;
        itemListEdit[itemListIndex3].category = state.updatedItem.category;
        itemListEdit[itemListIndex3].image = state.updatedItem.image;
        itemListEdit[itemListIndex3].description =
          state.updatedItem.description;
        return { ...state, items: [...itemListEdit] };
      } else {
        return { ...state, items: [...state.items, newItem3] };
      }

    // case "UPDATE_ITEM_CART":
    // const cartListIndex3 = state.cartItems.findIndex((item) => item.id === action.payload.id)
    // const cartListEdit = [...state.cartItems]

    // if(cartListIndex3 >= 0 ){
    // cartListEdit[cartListIndex3].item =  state.updatedItem.item
    // cartListEdit[cartListIndex3].price =  state.updatedItem.price
    // cartListEdit[cartListIndex3].category =  state.updatedItem.category
    // cartListEdit[cartListIndex3].image =  state.updatedItem.image
    // cartListEdit[cartListIndex3].description =  state.updatedItem.description
    // return {...state, cartItems: [...cartListEdit]}
    // }else{
    //   return {...state}
    // }

    case "EDIT_ITEM":
      const itemList2 = [...state.items];
      const itemListIndex2 = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      return {
        ...state,
        updatedItem: { ...itemList2[itemListIndex2] },
      };

    case "TOGGLE_EDIT_FORM":
      return {
        ...state,
        editForm: !state.editForm,
      };
    case "TOGGLE_ADS":
      return {
        ...state,
        ads: !state.ads,
      };
    case "TOGGLE_EDIT_FORM_SHOW_EDIT_BUTTON":
      return {
        ...state,
        editForm: true,
      };
    case "SHOW-HIDE-ITEM-FORM":
      return {
        ...state,
        addItemForm: !state.addItemForm,
      };
    case "SHOW-HIDE-ITEM-FORM-SHOW":
      return {
        ...state,
        addItemForm: true,
      };

    case "TOGGLE_EDIT_ITEM":
      const removeItemEdit = { ...action.payload, edit: true };
      return { ...state, items: [...state.items, removeItemEdit] };

    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case "CLEAR_CART":
      state.items.map((item) => (item.qnty = 0));
      return { ...state, items: [...state.items] };

    case "DELETE_ITEM_CART":
      const cartItem5 = { ...action.payload, qnty: 0 };
      const cartList5 = [...state.items];
      const cartListIndex5 = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (cartListIndex5 > -1) {
        cartList5[cartListIndex5].qnty = cartList5[cartListIndex5].qnty * 0;
        return { ...state, items: [...cartList5] };
      } else {
        console.log(cartItem5);
        return { ...state, items: [...state.items, cartItem5] };
      }

    case "ADDTO_CART":
      const cartItem = { ...action.payload, qnty: state.items.qnty + 1 };
      const cartList = [...state.items];
      const cartListIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (cartListIndex > -1) {
        cartList[cartListIndex].qnty = cartList[cartListIndex].qnty + 1;
        return { ...state, items: [...cartList] };
      } else {
        console.log(cartItem);
        return { ...state, items: [...state.items, cartItem] };
      }
    case "DECREMENT_QNTY":
      const cartList2 = [...state.items];
      const cartListIndex2 = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      cartList2[cartListIndex2].qnty = cartList2[cartListIndex2].qnty - 1;
      if (cartList2[cartListIndex2].qnty > 0) {
        return { ...state, items: [...cartList2] };
      } else if (cartList2[cartListIndex2].qnty === 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }

    // eslint-disable-next-line no-fallthrough
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialItems);
  useEffect(() => {
    axios.get("http://localhost:8080/products").then((response) => {
      dispatch({ type: "UPDATE_ITEMS_LIST", payload: response.data });
    });
  }, []);
  let sum = 0;
  state.items
    .filter((item) => item.qnty >= 1)
    .forEach((item) => {
      sum += item.qnty * item.price;
    });
  return (
    <div className="main-container">
      <div className="header">
        <h1>11.11 Shop</h1>
      </div>
      <div className="container">
        <div className="btn-container">
          <button
            className="btn-edit"
            onClick={() => {
              dispatch({
                type: "TOGGLE_EDIT_FORM_SHOW_EDIT_BUTTON",
                payload: { editForm: state.editForm },
              });
              dispatch({
                type: "SHOW-HIDE-ITEM-FORM",
                payload: { addItemForm: state.addItemForm },
              });
            }}
          >
            Add/Edit List
          </button>
        </div>
        <div
          className={
            state.addItemForm
              ? "form-container-show-form"
              : "form-container-hidden-form"
          }
        >
          <h2>Add or Update your Item here: </h2>
          <Itemform dispatch={dispatch} state={state} />
        </div>
        <nav className="nav-category">
          <Link to="All">
            <h3>All</h3>
          </Link>
          <Link to="Foods">
            <h3>Foods</h3>
          </Link>
          <Link to="Drinks">
            <h3>Drinks</h3>
          </Link>
          <Link to="Desserts">
            <h3>Desserts</h3>
          </Link>
        </nav>
        <div className="itemList-container">
          <Routes>
            <Route
              path="All"
              element={<Items dispatch={dispatch} state={state} />}
            />
            <Route
              path="Foods"
              element={<FilterFoodItems dispatch={dispatch} state={state} />}
            />
            <Route
              path="Drinks"
              element={<FilterDrinkItems dispatch={dispatch} state={state} />}
            />
            <Route
              path="Desserts"
              element={<FilterDessertItems dispatch={dispatch} state={state} />}
            />
          </Routes>
        </div>
        <div className="cart">
          <h1>Cart Items</h1>
          <button
            className="clearCart"
            onClick={() => {
              axios
                .put(
                  `http://localhost:8080/products/`,
                  state.items.map((item) => (item.qnty = 0))
                )
                .then((response) => {
                  console.log(response);
                });
              dispatch({ type: "CLEAR_CART" });
            }}
          >
            Clear
          </button>
          <div className="cart-header">
            <h3>Item Name</h3>
            <h3 className="cat">Price</h3>
            <h3>Quantity</h3>
            <h3 className="cat">Type</h3>
            <h3>Sub-Total</h3>
          </div>
          <AddItemToCart dispatch={dispatch} state={state} />
          <h1 className="price-total">Total: Php {sum}</h1>
        </div>
      </div>
      <div className={state.ads ? "hide-ads" : "ads-container"}>
        <div className="ads">
          <RiCloseCircleLine
            className="ads-icon"
            onClick={() =>
              dispatch({ type: "TOGGLE_ADS", payload: { ads: state.ads } })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default App;

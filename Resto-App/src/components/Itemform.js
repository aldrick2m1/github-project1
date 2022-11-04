import axios from "axios";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const Itemform = ({ dispatch, state }) => {
  const myId = uuidv4();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/products", {
        id: myId,
        item: e.target.item.value,
        image: e.target.image.value,
        price: e.target.price.value,
        description: e.target.description.value,
        category: e.target.category.value,
      })
      .then((response) => {
        dispatch({
          type: "CLEAR_INPUT",
          payload: { updatedItem: state.updatedItem },
        });
      });
    dispatch({
      type: "ADD_INPUT",
      payload: {
        id: myId,
        item: e.target.item.value,
        image: e.target.image.value,
        price: e.target.price.value,
        description: e.target.description.value,
        category: e.target.category.value,
      },
    });
  };
  const handleSaveChanges = (e) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE_ITEM",
      payload: {
        id: state.updatedItem.id,
        item: e.target.item.value,
        image: e.target.image.value,
        price: e.target.price.value,
        description: e.target.description.value,
        category: e.target.category.value,
      },
    });
    axios
      .put(`http://localhost:8080/products/${state.items.id}`, {
        id: state.updatedItem.id,
        item: e.target.item.value,
        image: e.target.image.value,
        price: e.target.price.value,
        description: e.target.description.value,
        category: e.target.category.value,
      })
      .then((response) => {
        console.log(response);
      });
    dispatch({
      type: "CLEAR_INPUT",
      payload: { updatedItem: state.updatedItem },
    });
    dispatch({
      type: "TOGGLE_EDIT_FORM",
      payload: { editForm: state.editForm },
    });
  };

  return state.editForm ? (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="item"
          placeholder="Item Name"
          value={state.editform ? state.item : state.updatedItem.item}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_INPUT",
              payload: { key: "item", value: e.target.value },
            })
          }
        />
        <input
          name="image"
          placeholder="Image Source"
          value={state.editform ? state.image : state.updatedItem.image}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_INPUT",
              payload: { key: "image", value: e.target.value },
            })
          }
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={state.editform ? state.price : state.updatedItem.price}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_INPUT",
              payload: { key: "price", value: e.target.value },
            })
          }
        />
        <input
          name="description"
          placeholder="Description"
          value={
            state.editform ? state.description : state.updatedItem.description
          }
          onChange={(e) =>
            dispatch({
              type: "UPDATE_INPUT",
              payload: { key: "description", value: e.target.value },
            })
          }
        />
        <br />
        <select
          name="category"
          value={state.editform ? state.category : state.updatedItem.category}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_INPUT",
              payload: { key: "category", value: e.target.value },
            })
          }
        >
          <option value={""}>--Choose Category--</option>
          <option value="Food">Food</option>
          <option value="Drink">Drink</option>
          <option value="Dessert">Dessert</option>
        </select>
        <br />
        <input value="submit" type="submit" />
      </form>
    </>
  ) : (
    <>
      <form onSubmit={handleSaveChanges}>
        <input
          name="item"
          placeholder="Edit Item Name"
          value={state.editform ? "" : state.updatedItem.item}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_INPUT",
              payload: { key: "item", value: e.target.value },
            })
          }
        />
        <input
          name="image"
          placeholder="Edit Image Source"
          value={state.editform ? "" : state.updatedItem.image}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_INPUT",
              payload: { key: "image", value: e.target.value },
            })
          }
        />
        <input
          name="price"
          type="number"
          placeholder="Edit Price"
          value={state.editform ? "" : state.updatedItem.price}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_INPUT",
              payload: { key: "price", value: e.target.value },
            })
          }
        />
        <input
          name="description"
          placeholder="Edit Description"
          value={state.editform ? "" : state.updatedItem.description}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_INPUT",
              payload: { key: "description", value: e.target.value },
            })
          }
        />
        <br />
        <select
          name="category"
          value={state.editform ? "" : state.updatedItem.category}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_INPUT",
              payload: { key: "category", value: e.target.value },
            })
          }
        >
          <option value={""}>--Choose Category--</option>
          <option value="Food">Food</option>
          <option value="Drink">Drink</option>
          <option value="Dessert">Dessert</option>
        </select>
        <br />
        <input value="Save Changes" type="submit" />
        <button
          className="btn-form"
          onClick={(e) => {
            dispatch({
              type: "TOGGLE_EDIT_FORM",
              payload: { editForm: state.editForm },
            });
            dispatch({
              type: "CLEAR_INPUT",
              payload: { updatedItem: state.updatedItem },
            });
          }}
        >
          cancel
        </button>
      </form>
    </>
  );
};

export default Itemform;

import { useState } from "react";
import { React } from "react";
import { ReactDom } from "react-dom/client";

import "./style.css";

// const initianlItem = [
//   {
//     id: 1,
//     title: "buy ticket",
//     isCompleted: false,
//   },
// ];

function ToDoList() {
  const [toDoLists, setToDoLists] = useState([]);
  const [title, setTitle] = useState("");

  function inputHandler(value) {
    setTitle(value);
  }
  function completeHandler(id) {
    setToDoLists((toDoLists) =>
      toDoLists.map((toDoList) =>
        toDoList.id === id
          ? { ...toDoList, isCompleted: !toDoList.isCompleted }
          : toDoList
      )
    );
  }
  // function setLocalStorage(toDoList) {
  //   localStorage.setItem("todos", JSON.stringify(toDoLists));
  // }
  function submitHAndler(e) {
    // setLocalStorage();
    const id = crypto.randomUUID();
    e.preventDefault();
    if (!title) return;
    const newTodo = {
      id,
      title,
      isCompleted: false,
    };

    setToDoLists(() => [...toDoLists, newTodo]);
    setTitle("");
  }

  function clearList() {
    localStorage.removeItem("todos");
    setToDoLists([]);
  }
  function DeletItem(id) {
    setToDoLists((toDoLists) => toDoLists.filter((item) => item.id !== id));
  }
  // function getLocalStorage() {
  //   let localStorageTodos = JSON.parse(localStorage.getItem("todos"));

  //   if (localStorageTodos) {
  //     setToDoLists(localStorageTodos);
  //   } else {
  //     setToDoLists([]);
  //   }
  // }

  // window.addEventListener("load", getLocalStorage);

  return (
    <div className="Todo">
      <Input
        inputHandler={inputHandler}
        title={title}
        submitHAndler={submitHAndler}
        clearList={clearList}
      />
      <List
        title={title}
        completeHandler={completeHandler}
        toDoLists={toDoLists}
        DeletItem={DeletItem}
      />
    </div>
  );
}

export default ToDoList;

function Input({ title, inputHandler, submitHAndler, clearList }) {
  return (
    <div>
      <h1> ToDo List App</h1>
      <form className="input" onSubmit={submitHAndler}>
        <label htmlFor="">Add Item</label>
        <input
          type="text"
          value={title}
          onChange={(e) => inputHandler(e.target.value)}
        />

        <div className="buttons">
          <Button bgColor="red">Add to list</Button>
          <Button onCLickFn={clearList} bgColor="blue">
            CLear List
          </Button>
        </div>
      </form>
    </div>
  );
}
function Button({ children, bgColor, onCLickFn }) {
  return (
    <>
      <button
        onClick={onCLickFn}
        className="button"
        style={{ backgroundColor: bgColor }}
      >
        {children}
      </button>
    </>
  );
}
function List({ title, completeHandler, toDoLists, DeletItem }) {
  return (
    <ul className="List">
      {toDoLists.map((item) => (
        <Item
          title={title}
          item={item}
          key={item.id}
          completeHandler={completeHandler}
          DeletItem={DeletItem}
        />
      ))}
    </ul>
  );
}
function Item({ item, DeletItem, completeHandler }) {
  return (
    <>
      <li className="item">
        <span
          style={item.isCompleted ? { textDecoration: "line-through" } : {}}
        >
          {item.title}
        </span>
        <div className="buttons">
          <Button onCLickFn={() => completeHandler(item.id)} bgColor="green">
            {!item.isCompleted ? "Completed" : "imCompleted"}
          </Button>
          <Button onCLickFn={() => DeletItem(item.id)} bgColor="red">
            Delete
          </Button>
        </div>
      </li>
    </>
  );
}

import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [storedInputs, setStoredInputs] = useState([]);
  const [search, setSearch] = useState("");
  const [inEditMode, setInEditMode] = useState(false);

  console.log(storedInputs);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const addColumn = (input) => {
    if (input.length <= 0) {
      return window.alert("Produkt musí mať aspoň 1 znak");
    }

    setStoredInputs([...storedInputs, input]);
    setInput("");
  };

  const onChange = (event) => {
    setSearch(([event.target.name] = event.target.value));
  };

  const changeEditMode = () => {
    if (storedInputs.length > 0) {
      setInEditMode(!inEditMode);
    }
  };

  const renderEditView = () => {
    return <input defaultValue={input}></input>;
  };

  let filteredProducts = storedInputs.filter((product) => {
    return product.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  return (
    <div className="App">
      <div className="input-container">
        <div className="row">
          <label>Enter product</label>
          <input
            type="text"
            value={input}
            name="input"
            onChange={onInputChange}
          ></input>
        </div>

        <div className="row">
          <label>Search</label>
          <input
            type="text"
            value={search}
            name="search"
            onChange={onChange}
          ></input>
        </div>
      </div>

      <div className="button-container">
        <button onClick={() => addColumn(input)}>Add column</button>
        <button onClick={changeEditMode}>Edit Label</button>
      </div>

      <table className="table">
        <tbody>
          <tr className="table-row">
            <th>ID</th>
            <th>Name</th>
          </tr>

          {filteredProducts.map((input, index) => {
            return (
              <tr key={index} className="table-row">
                <td>{index + 1}</td>
                {inEditMode ? renderEditView() : <td>{input}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

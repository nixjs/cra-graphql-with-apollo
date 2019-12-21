import React, { memo, useState } from "react";
import { Layer, Button } from "grommet";
import ListUser from "./user/ListUser";
import AddUser from "./user/AddUser";
import "./App.css";

function App() {
  const [show, setShow] = useState(false);
  return (
    <div className="App">
      <ListUser />
      <Button label="add User" onClick={() => setShow(true)} />
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <AddUser onClose={() => setShow(false)} />
        </Layer>
      )}
    </div>
  );
}

export default memo(App);

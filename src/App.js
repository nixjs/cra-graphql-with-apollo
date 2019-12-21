import React, { memo, useState, useCallback } from "react";
import { Layer, Button } from "grommet";
import { useMutation } from "@apollo/react-hooks";
import ListUser from "./user/ListUser";
import FormUser from "./user/FormUser";
import ALL_USER from "./graphql/queries";
import { DELETE_USER } from "./graphql/mutations";
import "./App.css";

function App() {
  const [deleteUser] = useMutation(DELETE_USER);
  const [show, setShow] = useState(false);
  const [dataSelected, setDataSelected] = useState(null);
  const fetchData = () => {
    return [
      {
        query: ALL_USER,
        variables: {}
      }
    ];
  };

  const onRemoveUserById = useCallback(
    async (e, data) => {
      if (data && data.id && window.confirm("Delete the user?")) {
        await deleteUser({
          variables: { id: data.id },
          refetchQueries: fetchData()
        })
          .then(data => {
            alert("Deleted");
          })
          .catch(error => {
            alert(error);
          });
      }
    },
    [deleteUser]
  );

  return (
    <div className="App">
      <Button label="add User" onClick={() => setShow(true)} />
      <ListUser
        onDataSelected={(e, data, type) => {
          if (type === "EDIT") {
            setDataSelected(data);
            setShow(true);
          } else {
            onRemoveUserById(e, data);
          }
        }}
      />
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <FormUser
            onClose={() => {
              setShow(false);
              setDataSelected(null);
            }}
            fetchData={() => fetchData()}
            dataSelected={dataSelected}
          />
        </Layer>
      )}
    </div>
  );
}

export default memo(App);

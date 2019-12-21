import React, { memo } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text
} from "grommet";
import { FormClose, Edit } from "grommet-icons";
import { useQuery } from "@apollo/react-hooks";
import ALL_USER from "../graphql/queries";

function ListUser({ onDataSelected }) {
  const { loading, error, data } = useQuery(ALL_USER);
  const columns = [
    {
      property: "id",
      label: "Id",
      dataScope: "row",
      format: datum => <strong>{datum.id}</strong>
    },
    {
      property: "email",
      label: "Email",
      align: "left"
    },
    {
      property: "name",
      label: "Name",
      align: "left"
    }
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <>
      <div className="list-user">
        <Box direction="row" justify="center" align="center">
          <div className="user">
            {data.allUsers && (
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map(c => (
                      <TableCell
                        key={c.property}
                        scope="col"
                        border="bottom"
                        align={c.align}
                      >
                        <Text>{c.label}</Text>
                      </TableCell>
                    ))}
                    <TableCell
                      key="action"
                      scope="col"
                      border="bottom"
                      align="center"
                    >
                      <Text>Action</Text>
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.allUsers.map(datum => (
                    <TableRow key={datum.id}>
                      {columns.map(c => (
                        <TableCell
                          key={c.property}
                          scope={c.dataScope}
                          align={c.align}
                        >
                          <Text>
                            {c.format ? c.format(datum) : datum[c.property]}
                          </Text>
                        </TableCell>
                      ))}
                      <TableCell align="center">
                        <Button
                          type="button"
                          onClick={e => {
                            onDataSelected(e, datum, "REMOVE");
                          }}
                        >
                          <FormClose color="brand" />
                        </Button>
                        <Button
                          type="button"
                          onClick={e => {
                            onDataSelected(e, datum, "EDIT");
                          }}
                        >
                          <Edit color="brand" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </Box>
      </div>
    </>
  );
}

export default memo(ListUser);

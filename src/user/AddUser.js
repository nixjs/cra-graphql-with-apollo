import React, { memo, useState, useCallback, useMutation } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextInput, Text, Form, FormField } from "grommet";
import useForm from "react-hook-form";
import { FIELDS_USER } from "./const";
import UserSchema from "./validators";
import ALL_USER from "../graphql/queries";
import { CREATE_USER, UPDATE_USER } from "../graphql/mutations";

const AddUser = ({ onClose }) => {
  const [dataUser, setDataUser] = useState(null);
  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const {
    register,
    handleSubmit,
    errors,
    watch,
    reset,
    setValue,
    getValues
  } = useForm({
    mode: "onChange",
    validationSchema: UserSchema
  });

  const fetchData = () => {
    return [
      {
        query: ALL_USER,
        variables: {}
      }
    ];
  };

  const disabledBtn = !!(
    errors[FIELDS_USER.EMAIL] || !watch()[FIELDS_USER.EMAIL]
  );

  const onSubmit = useCallback(
    async data => {
      let action = new Promise(resolve => resolve);
      if (dataUser) {
        delete data.id;
        action = createUser({
          variables: data,
          refetchQueries: fetchData()
        });
      } else {
        action = updateUser({
          variables: dataUser,
          refetchQueries: fetchData()
        });
      }
      try {
        await action.then(data => {
          alert("Created");
          reset();
        });
      } catch (error) {
        alert("Error");
      }
    },
    [createUser, dataUser, reset, updateUser]
  );

  return (
    <>
      <Box
        align="center"
        background={{ color: "white" }}
        round={{ size: "xsmall" }}
      >
        <Box align="center" justify="stretch" pad="small">
          <Text size="medium">Add people</Text>
        </Box>
        <Box align="center" justify="stretch" pad="small">
          <Form onSubmit={handleSubmit(onSubmit)} background="white">
            <h1>{!dataUser ? "Create" : "Edit"} User</h1>
            <fieldset>
              <TextInput id="id" name="id" type="hidden" ref={register} />
              <FormField
                label="email"
                error={
                  errors[FIELDS_USER.EMAIL] && errors[FIELDS_USER.EMAIL].message
                }
              >
                <TextInput
                  id="email"
                  name="email"
                  placeholder="type email here"
                  ref={register}
                />
              </FormField>
              <FormField
                label="name"
                error={
                  errors[FIELDS_USER.NAME] && errors[FIELDS_USER.NAME].message
                }
              >
                <TextInput
                  id="name"
                  type="name"
                  name="name"
                  placeholder="type name here"
                  ref={register}
                />
              </FormField>
            </fieldset>
            <Button
              disabled={disabledBtn}
              type="submit"
              label={!dataUser ? "Create" : "Edit"}
              primary
            />
            <Button
              type="reset"
              label="Reset"
              onClick={() => {
                setDataUser(null);
                reset();
              }}
            />
          </Form>
        </Box>
        <Box
          width="small"
          margin="none"
          direction="row-responsive"
          pad={{ bottom: "small" }}
        >
          <Box pad={{ left: "xsmall", right: "xsmall" }}>
            <Button color="brand" onClick={() => {}} primary label="Add" />
          </Box>
          <Box pad={{ left: "xsmall", right: "xsmall" }}>
            <Button
              color="dark-1"
              onClick={() => {
                onClose();
              }}
              label="Cancel"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

AddUser.propTypes = {
  onClose: PropTypes.func
};

export default memo(AddUser);

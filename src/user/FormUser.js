import React, { memo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Box, Button, TextInput, Form, FormField } from "grommet";
import { useMutation } from "@apollo/react-hooks";
import useForm from "react-hook-form";
import { FIELDS_USER } from "./const";
import UserSchema from "./validators";
import { CREATE_USER, UPDATE_USER } from "../graphql/mutations";

const setFormControlValue = (data, schema, setValue) => {
  if (!Yup.reach(schema) || !data) {
    return;
  }
  const { fields } = Yup.reach(schema);
  Object.keys(fields).forEach(item => {
    setValue(item, data[item] ? data[item] : null);
  });
};

const FormUser = ({ onClose, fetchData, dataSelected }) => {
  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const { register, handleSubmit, errors, watch, reset, setValue } = useForm({
    mode: "onChange",
    validationSchema: UserSchema
  });

  useEffect(() => {
    setFormControlValue(dataSelected, UserSchema, setValue);
  }, [dataSelected, setValue]);

  const disabledBtn = !!(
    errors[FIELDS_USER.EMAIL] || !watch()[FIELDS_USER.EMAIL]
  );

  const onSubmit = useCallback(
    async data => {
      let action = new Promise(resolve => resolve);
      if (!dataSelected) {
        action = createUser({
          variables: data,
          refetchQueries: fetchData()
        });
      } else {
        action = updateUser({
          variables: Object.assign({}, { id: dataSelected.id }, data),
          refetchQueries: fetchData()
        });
      }
      try {
        await action.then(data => {
          alert("Successed");
          onClose();
          reset();
        });
      } catch (error) {
        alert(error);
      }
    },
    [dataSelected, reset, createUser, updateUser, onClose, fetchData]
  );

  return (
    <>
      <Box
        align="center"
        background={{ color: "white" }}
        round={{ size: "xsmall" }}
      >
        <Box align="center" justify="stretch" pad="small">
          <Form onSubmit={handleSubmit(onSubmit)} background="white">
            <h1>{!dataSelected ? "Create" : "Edit"} User</h1>
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
            <Box
              margin={{ top: "small" }}
              direction="row-responsive"
              pad={{ bottom: "small" }}
            >
              <Box pad={{ left: "xsmall", right: "xsmall" }}>
                <Button
                  disabled={disabledBtn}
                  color="brand"
                  label={!dataSelected ? "Create" : "Edit"}
                  onClick={() => {}}
                  primary
                  type="submit"
                />
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
          </Form>
        </Box>
      </Box>
    </>
  );
};

FormUser.propTypes = {
  onClose: PropTypes.func,
  fetchData: PropTypes.func,
  dataSelected: PropTypes.object
};

export default memo(FormUser);

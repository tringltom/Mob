import React, { useContext } from 'react';
import { TextInput, View, Text } from 'react-native';
import { Formik } from 'formik';
import { RootStoreContext } from '../../stores/rootStore';
import { combineValidators, isRequired } from "revalidate";
import { Button } from '@muratoner/semantic-ui-react-native';

const validate = combineValidators({
  email: isRequired({ message: "Email adresa je neophodna" }),
  password: isRequired({ message: "Lozinka je neophodna" }),
});

export const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  
  return (
    <>
      <Text>Dobrodošli nazad.</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) =>
          login(values).catch((error) => {
            actions.setFieldError("general", error.message);
          })
        }
        validate={validate}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          dirty,
          isValid,
          isSubmitting,
        }) => (
          <View>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <Button
              title="Submit"
              color="primary"
              onPress={handleSubmit}
              loading={isSubmitting}
            />
          </View>
        )}
      </Formik>
    </>
  );
};
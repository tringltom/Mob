import React, { useContext, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput as RNTextInput, Image } from 'react-native';
import { ErrorMessage, Formik } from 'formik';
import { RootStoreContext } from '../../stores/rootStore';
import { combineValidators, isRequired } from "revalidate";
import { Button } from '@muratoner/semantic-ui-react-native';
import TextInput  from '../../form/TextInput';



const validate = combineValidators({
  email: isRequired({ message: "Email adresa je neophodna" }),
  password: isRequired({ message: "Lozinka je neophodna" }),
});

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  const emailRef = useRef<RNTextInput>();
  const passwordRef = useRef<RNTextInput>();

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <>
    
    <Image source={require("../../../assets/LogInEkvitiLogo.png")} />
      <Text>Dobrodošli nazad.</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) =>
          login(values)
            .catch((error) => {
              console.log("Usao u error");
              console.log(error);
              //actions.setFieldError("general", error.message);
              actions.setErrors(error.response.request._response);
            })
            .finally(() => {
              console.log("Login prosao");
              if (isMounted.current === true)
                actions.setSubmitting(false);
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
          <View style={styles.modalStyle}>
            <TextInput
              icon='mail'
              returnKeyType="next"
              returnKeyLabel="next"
              error={errors.email}
              ref={emailRef}
              touched={touched.email}
              placeholder="E-mail"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              blurOnSubmit={false}
              secureTextEntry={true}
              keyboardType="email-address"
            /> 
            <TextInput
              icon='lock-closed'
              onChangeText={handleChange("password")}
              returnKeyType="go"
              returnKeyLabel="go"
              error={errors.password}
              touched={touched.password}
              placeholder="Lozinka"
              autoCorrect={false}
              autoCapitalize="none"
              ref={passwordRef}
              onBlur={handleBlur("password")}
              value={values.password}
              blurOnSubmit={false}
              secureTextEntry={true}
              keyboardType="visible-password"
            />
            <Button
              title="Prijavi se"
              color="primary"
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={!isValid || !dirty}
            />
            
          </View>
        )}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    minWidth: "80%",
    backgroundColor: "white",
  },
  formStyle: {
    backgroundColor: "white",
  }
})
export default LoginForm;
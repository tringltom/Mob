import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput as RNTextInput, Image } from 'react-native';
import { Formik } from 'formik';
import { RootStoreContext } from '../../stores/rootStore';
import { combineValidators, isRequired } from "revalidate";
import { Button, Center } from '@muratoner/semantic-ui-react-native';
import TextInput  from '../../form/TextInput';
import Spacer from '../../form/Spacer';
import { ErrorMessage } from '../../form/ErrorMessage';
import { color } from 'react-native-elements/dist/helpers';
import { EkvitiColors } from '../../layout/EkvitiColors';



const validate = combineValidators({
  email: isRequired({ message: "Email adresa je neophodna" }),
  password: isRequired({ message: "Lozinka je neophodna" }),
});

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  const emailRef = useRef<RNTextInput>();
  const passwordRef = useRef<RNTextInput>();

  const [showPassword, setShowPassword] = useState(true);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <>
      <Image source={require("../../../assets/LogInEkvitiLogo.png")}/>
      <Text>Dobrodošli nazad.</Text>
      <Formik
        initialValues={{
           email: "", password: "" 
          }}
        onSubmit={(values, actions) => {
          login(values)
            .catch((error) => {
              console.log("Usao u error");
              console.log(error);
              actions.setErrors(error.response.request._response);
            })
            .finally(() => {
              if (isMounted.current === true) 
              actions.setSubmitting(false);
            });
        }}
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
              icon="mail"
              onSubmitEditing={() => passwordRef.current?.focus()}
              returnKeyType="next"
              returnKeyLabel="next"
              error={errors.email}
              touched={touched.email}
              ref={emailRef}
              placeholder="E-mail"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              blurOnSubmit={false}
              keyboardType="email-address"
            />
            <TextInput
              icon="lock-closed"
              //onSubmitEditing={() => emailRef.current?.focus()} straight to handle submit or loop email>pass>email?
              onSubmitEditing={() => handleSubmit()}
              returnKeyType="go"
              returnKeyLabel="go"
              error={errors.password}
              touched={touched.password}
              ref={passwordRef}
              placeholder="Lozinka"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              blurOnSubmit={false}
              secureTextEntry={true}
              accessibilityHint="wat?"
            />
            
            <Button
              title="Prijavi se"
              color="primary"
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={!isValid || !dirty}
              style={{backgroundColor: EkvitiColors.primary}}
            />
            {typeof errors === "string" && (
              <>
                <Spacer />
                <ErrorMessage errors={errors}></ErrorMessage>
              </>
            )}
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
})
export default LoginForm;
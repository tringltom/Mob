import { Image, TextInput as RNTextInput, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useRef } from 'react';
import { combineValidators, isRequired } from "revalidate";

import { Button } from '@muratoner/semantic-ui-react-native';
import { EkvitiColors } from '../../app/layout/EkvitiColors';
import { ErrorMessage } from '../../app/common/form/ErrorMessage';
import { Formik } from 'formik';
import { RootStoreContext } from '../../app/stores/rootStore';
import Spacer from '../../app/common/form/Spacer';
import TextInput  from '../../app/common/form/TextInput';

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
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, actions) => {
          login(values)
            .catch((error) => {
              console.log(error);
              actions.setErrors(error.request._response);
            })
            .finally(() => {
              if (isMounted.current === true) actions.setSubmitting(false);
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
            />

            <Button
              title="Prijavi se"
              color="primary"
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={!isValid || !dirty}
              style={{ backgroundColor: EkvitiColors.primary }}
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
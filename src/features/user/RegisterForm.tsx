import { Formik, setIn, useFormikContext } from 'formik';
import { TextInput as RNTextInput, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useRef } from 'react';
import { combineValidators, composeValidators, isRequired, matchesField } from 'revalidate';

import { Button } from '@muratoner/semantic-ui-react-native';
import { ErrorMessage } from '../../form/ErrorMessage';
import { RootStoreContext } from '../../stores/rootStore';
import Spacer from '../../form/Spacer';
import TextInput from '../../form/TextInput';

const validate = combineValidators({
    email: isRequired({ message: "Email adresa je neophodna" }),
    password: isRequired({ message: "Lozinka je neophodna" }),
    userName: isRequired({ message: "Korisničko ime je neophodno" }),
    passwordConfirm: composeValidators(
      isRequired({ message: "Potrebno je ponovo uneti vašu lozinku" }),
      matchesField('password','Lozinka')({
        message: "Potrebno je ponovo uneti vašu lozinku",
      })
    )()
  });

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const userNameRef = useRef<RNTextInput>();
  const passwordRef = useRef<RNTextInput>();
  const passwordConfirmRef = useRef<RNTextInput>();

  return (
    <>
      <Text style={{ fontSize: 48 }}>Dobrodošli</Text>
      <Formik
        initialValues={{
          email: "",
          userName: "",
          password: "",
          passwordConfirm: "",
        }}
        onSubmit={(values, actions) => {
          register(values)
            .catch((error) => {
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
          <View style={styles.view}>
            <TextInput
              onSubmitEditing={() => userNameRef.current?.focus()}
              returnKeyType="next"
              returnKeyLabel="next"
              error={errors.email}
              touched={touched.email}
              placeholder="Email adresa"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              blurOnSubmit={false}
            />
            <TextInput
              onSubmitEditing={() => passwordRef.current?.focus()}
              returnKeyType="next"
              returnKeyLabel="next"
              error={errors.userName}
              touched={touched.userName}
              placeholder="Korisničko ime"
              autoCorrect={false}
              autoCapitalize="none"
              ref={userNameRef}
              onChangeText={handleChange("userName")}
              onBlur={handleBlur("userName")}
              value={values.userName}
              blurOnSubmit={false}
            />
            <TextInput
              onSubmitEditing={() => passwordConfirmRef.current?.focus()}
              returnKeyType="next"
              returnKeyLabel="next"
              error={errors.password}
              touched={touched.password}
              placeholder="Lozinka"
              autoCorrect={false}
              autoCapitalize="none"
              ref={passwordRef}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              blurOnSubmit={false}
              secureTextEntry={true}
            />
            <TextInput
              returnKeyType="go"
              returnKeyLabel="go"
              error={errors.passwordConfirm}
              touched={touched.passwordConfirm}
              placeholder="Ponovi lozinku"
              autoCorrect={false}
              autoCapitalize="none"
              ref={passwordConfirmRef}
              onChangeText={handleChange("passwordConfirm")}
              onBlur={handleBlur("passwordConfirm")}
              value={values.passwordConfirm}
              blurOnSubmit={false}
              secureTextEntry={true}
              onSubmitEditing={() => handleSubmit()}
            />
            <Button
              title="Potvrdi"
              color="primary"
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={!isValid || !dirty}
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
    view: {
        minWidth: "60%"
      }
});

export default RegisterForm;
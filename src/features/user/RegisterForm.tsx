import { ErrorMessage, Formik } from 'formik';
import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, View, TextInput as RNTextInput } from 'react-native';
import TextInput from '../../form/TextInput';
import { combineValidators, isRequired } from 'revalidate';
import { RootStoreContext } from '../../stores/rootStore';
import { Button } from '@muratoner/semantic-ui-react-native';

const validate = combineValidators({
    email: isRequired({ message: "Email adresa je neophodna" }),
    password: isRequired({ message: "Lozinka je neophodna" }),
    userName: isRequired({ message: "Korisničko ime je neophodno" }),
  });



const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { register } = rootStore.userStore;
    const userNameRef = useRef<RNTextInput>();
    const passwordRef = useRef<RNTextInput>();

    return (
      <>
        <Text style={{ fontSize: 48 }}>Dobrodošli</Text>
        <Formik initialValues={{ email: "",  userName: "", password: ""}} 
            onSubmit = {(values) => {
                register(values).catch((error) => {
                    console.log(error);
            })}
            }
            validate={validate}>
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
              returnKeyType="go"
              returnKeyLabel="go"
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
            <Button
              title="Potvrdi"
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
    view: {
        minWidth: "60%"
      }
});

export default RegisterForm;
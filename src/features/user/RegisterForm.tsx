import { ErrorMessage, Formik } from 'formik';
import React, { useContext } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
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
    return (
      <>
        <Text style={{ fontSize: 48 }}>Dobrodošli</Text>
        <Formik initialValues={{ email: "",  userName: "", password: ""}} 
            onSubmit = 
            {
              (values, actions) => {
                console.log("Asd");
                register(values).catch((error) => {
                    actions.setFieldError("general", error.message);
            }) }
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
          <View>
            <TextInput
              placeholder="Email adresa"
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.input}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <ErrorMessage name="email" render={msg => <Text>{msg}</Text>} />
            <TextInput
              placeholder="Korisničko ime"
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.input}
              onChangeText={handleChange("userName")}
              onBlur={handleBlur("userName")}
              value={values.userName}
            />
            <ErrorMessage name="userName" render={msg => <Text>{msg}</Text>} />
            <TextInput
              placeholder="Lozinka"
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.input}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <ErrorMessage name="password" render={msg => <Text>{msg}</Text>} />
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
    input: {
        margin: 5,
        borderColor: 'black',
        borderWidth: 1,
        minWidth: "60%",
        padding: 4
      }
});

export default RegisterForm;
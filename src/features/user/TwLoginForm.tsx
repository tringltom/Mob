import { Image, TextInput, Text, View } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { combineValidators, isRequired } from "revalidate";
import { useTailwind } from "tailwind-rn";

import { ErrorMessage } from "../../app/common/form/ErrorMessage";
import { Formik } from "formik";
import { RootStoreContext } from "../../app/stores/rootStore";
import Spacer from "../../app/common/form/Spacer";
import Icon from "../../app/components/Icon";
import Button from "../../app/components/Button";
import RegisterForm from "./RegisterForm";

const validate = combineValidators({
  email: isRequired({ message: "Email adresa je neophodna" }),
  password: isRequired({ message: "Lozinka je neophodna" }),
});

const TwLoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const tailwind = useTailwind();

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <>
      <Image
        source={require("../../../assets/LogInEkvitiLogo.png")}
        style={tailwind("w-[112px] h-[25px]")}
      />
      <Text style={tailwind("font-regular text-text text-[18px] py-3")}>
        Dobrodošli nazad.
      </Text>
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
          <View style={tailwind("w-[90%]")}>
            <View
              style={tailwind(
                `w-full flex flex-row rounded-md bg-formBg items-center h-14 mb-3`
              )}
            >
              <View style={tailwind("pl-4 pr-2")}>
                <Icon iconName="envelope" />
              </View>

              <View style={tailwind('w-full')}>
                <Text
                  style={tailwind(
                    `font-regular text-xs ${
                      touched.email && errors.email
                        ? "text-error"
                        : "text-primary"
                    }`
                  )}
                >
                  {touched.email && errors.email ? errors.email : "E-Mail"}
                </Text>
                <TextInput
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  returnKeyType="next"
                  returnKeyLabel="next"
                  style={tailwind("font-regular text-xs")}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={handleChange("email")}                  
                  onBlur={handleBlur("email")}
                  ref={emailRef}
                  value={values.email}
                  blurOnSubmit={false}
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View
              style={tailwind(
                "flex flex-row rounded-md bg-formBg items-center h-14 rounded-md mb-3"
              )}
            >
              <View style={tailwind("pl-4 pr-2")}>
                <Icon iconName="password" />
              </View>

              <View style={tailwind('w-full')}>
                <Text
                  style={tailwind(
                    `font-regular text-xs ${
                      touched.password && errors.password
                        ? "text-error"
                        : "text-primary"
                    }`
                  )}
                >
                  {touched.password && errors.password
                    ? errors.password
                    : "Lozinka"}
                </Text>
                <TextInput
                  onSubmitEditing={() => handleSubmit()}
                  returnKeyType="go"
                  returnKeyLabel="go"
                  style={tailwind("font-regular text-xs")}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  ref={passwordRef}
                  value={values.password}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                />
              </View>
            </View>

            <View style={tailwind("mb-3")}>
              <Text style={tailwind("font-regular text-xs text-text")}>
                Zaboravljena lozinka? Resetuj je
              </Text>
            </View>

            <Button
              title="Prijavi se"
              loading={isSubmitting}
              disabled={!isValid || !dirty}
              onPress={handleSubmit}
            />

            <View style={tailwind("mt-4")}>
              <Text
                style={tailwind("font-regular text-center text-base text-text")}
              >
                Nemaš nalog?{" "}
                <Text
                  style={tailwind(
                    "font-regular text-center text-base text-primary underline"
                  )}
                  onPress={() => openModal(<RegisterForm />)}
                >
                  Registracija.
                </Text>{" "}
              </Text>
            </View>

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

export default TwLoginForm;
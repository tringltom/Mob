import { Image, View } from "react-native";

import { Button } from "@muratoner/semantic-ui-react-native";
import { EkvitiColors } from "../../app/layout/EkvitiColors";
import React from "react";
import { Text } from "react-native-elements";
import agent from "../../app/api/agent";
import { useRoute } from "@react-navigation/native";

const RegisterSuccess = () => {

  const route = useRoute();

  const handleConfirmEmailResend = () => {
    agent.Session.sendEmailVerification(route.params as unknown as string)
      .then(() => {
        globalThis.toast.show("Potvrda je poslata - molimo Vas da proverite poštu", {type: "success"});
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image source={require("../../../assets/LogInEkvitiLogo.png")} />
      <Image
        source={require("../../../assets/KnightSuccessfullRegistration.png")}
      />
      <Text>Uspešna registracija!</Text>
      <Text>
        Uspešno ste se registrovali, potvrdite putem linka koji smo poslali na
        vašu mejl adresu.
      </Text>
      <Text>Niste dobili verifikacioni mejl?</Text>
      <Button
        onPress={handleConfirmEmailResend}
        title="Ponovo pošalji potvrdu"
        style={{backgroundColor: EkvitiColors.primary}}
      />
    </View>
  );
};

export default RegisterSuccess;

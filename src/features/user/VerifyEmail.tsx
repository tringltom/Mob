import { Image, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { Button } from "@muratoner/semantic-ui-react-native";
import LoginForm from "./LoginForm";
import { RootStoreContext } from "../../stores/rootStore";
import agent from "../../api/agent";
import { useRoute } from "@react-navigation/native";

interface IParams {
      token: string,
      email: string
}

const VerifyEmail = ({}) => {
  const rootStore = useContext(RootStoreContext);
  const Status = {
    Verifying: "Verifying",
    Failed: "Failed",
    Success: "Success",
  };

  const route = useRoute();

  const [status, SetStatus] = useState(Status.Verifying);
  const { openModal } = rootStore.modalStore;

  const {email, token} = route.params as IParams;
  
  useEffect(() => {
    agent.Session.verifyEmail(token as string, email as string)
      .then(() => {
        SetStatus(Status.Success);
      })
      .catch(() => {
        SetStatus(Status.Failed);
      });
  }, [Status.Failed, Status.Success, token, email]);

  const handleConfirmEmailResend = () => {
    agent.Session.sendEmailVerification(email as string)
      .then(() => {
        globalThis.toast.show("Potvrda je poslata - molimo Vas da proverite poštu", {type: "success"});
      })
      .catch((error) => console.log(error));
  };

  const getBody = () => {
    switch (status) {
      case Status.Verifying:
        return <Text>Provera...</Text>;
      case Status.Failed:
        return (
          <>
            <Text>
              Potvrda neuspešna, možete opet da zatražite potvrdu pošte
            </Text>
            <Button
              onPress={handleConfirmEmailResend}
              title="Pošalji potvrdu"
              color="primary"
            />
          </>
        );
      case Status.Success:
        return (
          <>
            <Text>Vaša registracija je uspešna,možete da se prijavite.</Text>
            <Button
              onPress={() => openModal(<LoginForm />)}
              title="Prijavi se"
              color="primary"
            ></Button>
          </>
        );
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image source={require("../../../assets/LogInEkvitiLogo.png")} />
      <Image
        source={require("../../../assets/KnightRegistration.png")}
      />
      <Text>Potvrda e-maila</Text>
      {getBody()}
    </View>
  );
};

export default VerifyEmail;

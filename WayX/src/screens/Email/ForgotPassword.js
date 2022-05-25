import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground, TextInput } from "react-native";
import { Button, HelperText } from "react-native-paper";
import * as React from "react";
import { Text } from "react-native-paper";
import "../../i18n/i18n";
import { useTranslation } from "react-i18next";
import { useState } from "react";



const ip = "http://85.56.203.68:5000/wayx"

// const [visible, setVisible] = React.useState(false);
// const showDialog = () => setVisible(true);
// const hideDialog = () => setVisible(false);


export default function ForgotPassword(props) {
    const { t, i18n } = useTranslation();

    const [email, setEmail] = useState("");

    const [colorText, setColorText] = React.useState({
        user: "#56DACB",
        pass: "#56DACB",
      });

    const ver_email = async () => {
        axios
        .post(
          ip,
          '{"type":"forgot_password","email":"' +
            email +
            '"}"'
        )
        .then((res) => {
          console.log("gsd");
        })
        .catch((res) => {
          console.log(res)
        });
    }


//       const resetTextInputValues = () => {
//         setEmail("");
//       };

    return (
        <View>
            <TextInput
                style={[styles.textInputUserValues, {borderColor: colorText.pass}]}
                label="prueba"
                placeholder={t("prueba")}
                underlineColor="transparent"
                multiline
                value={email}
                activeOutlineColor="#6d9685"
                onChangeText={(x) => setEmail(x)}
            />
            <Button
            style={styles.botonRegis}
            mode="text"
            fontSize="20"
            color="white"
            onPress={() => {
                console.log(email)
              ver_email();
            }}
          >
            {t("Siguiente")}
          </Button>
        </View>
);
}

const styles = StyleSheet.create({
    container: {
      flex: 15,
      flexDirection: "column",
    },
    textInputUserValues: {
      margin: 20,
      marginBottom: 10,
      backgroundColor: "#FFFFFF",
      borderWidth: 2,
      borderRadius: 12,
      elevation: 15,
      height: 60,
      paddingLeft: 20,
      fontSize: 20,
      color: "#484848",
    },
    empty1: {
      flex: 5,
    },
    empty2: {
      flex: 1,
    },
    components: {
      flex: 3,
    },
    regist: {
      flex: 3,
      padding: 10,
      alignItems: "center",
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
    },
    text: {
      color: "white",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000a0",
    },
    textimput: {
      margin: 20,
      marginBottom: 10,
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      elevation: 15,
      height: 60,
      paddingLeft: 20,
      fontSize: 20,
      color: "#484848",
    },
    botonInic: {
      margin: 20,
      marginTop: 20,
      width: 250,
      height: 60,
      borderRadius: 30,
      elevation: 12,
      paddingTop: 10,
      backgroundColor: "#FFFFFF",
      alignSelf: "center",
    },
    textSingIn: {
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
      margin: 15,
    },
    botonRegis: {
      margin: 5,
      width: 200,
      height: 45,
      borderRadius: 30,
      fontSize: 15,
  
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: "white",
      alignSelf: "center",
    },
  });
  
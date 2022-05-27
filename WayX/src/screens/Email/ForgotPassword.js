import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground, TextInput } from "react-native";
import { Button, HelperText } from "react-native-paper";
import * as React from "react";
import { Text, Provider, Portal, Dialog, Paragraph } from "react-native-paper";
import "../../i18n/i18n";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { hex_md5 } from "react-native-md5";
import { BackgroundImage } from "react-native-elements/dist/config";
const image = require("../../assets/wallpaperCreateMap3.png");


const ip = "http://85.56.203.68:5000/wayx"

export default function ForgotPassword(props) {
    const { t, i18n } = useTranslation();

    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const [visible2, setVisible2] = React.useState(false);
    const showDialog2 = () => setVisible2(true);
    const hideDialog2 = () => setVisible2(false);

    const [email, setEmail] = useState("");
    const [cod_user, setCod_User] = useState("");

    const [codigo, setCodigo] = useState("");

    const [contra, setContra] = useState("");
    const [contra2, setContra2] = useState("");
    
    const [puls, setPuls] = React.useState({ user: false, pass: false });
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
          let data = res.data.split(",")
          setCodigo(data[1])
        })
        .catch((res) => {
          console.log(res.data)
          console.log("ERROR")
        });

    }

    const pepe = () => {
        var p=hex_md5(contra);
        console.log("contra " + contra)
        console.log("p " + p)
        console.log("em,ail " + email)
        axios
        .put(
          ip,
          '{"type":"update_password","password":"' +
            p +
            '","email":"' +
            email+
            '"}"'
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((res) => {
          setPuls({ user: false, pass: false });
          setColorText({ user: "red", pass: "red" });
          console.log(res);
        });
    }

    return (
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Provider>
        <View>
          <Text
            style={[styles.texto]}
          >Recuperar Contraseña
          </Text>
            <TextInput
                style={[styles.textInputUserValues, {borderColor: colorText.user}]}
                label="Correo Electrónico"
                placeholder={t("Correo Electrónico")}
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
                showDialog();
              ver_email();
            }}
          >
            {t("Siguiente")}
          </Button>
        </View>
        <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={{ textAlign: "center" }}>
            {t("Código de verificación")}
          </Dialog.Title>
          <TextInput
                style={[styles.textInputUserValues2, {borderColor: colorText.pass}]}
                label="Código"
                placeholder={t("Código")}
                underlineColor="transparent"
                multiline
                value={cod_user}
                activeOutlineColor="#6d9685"
                onChangeText={(x) => setCod_User(x)}
                keyboardType="number-pad"
                onPressIn={() => setColorText({ user: "#56DACB", pass: "#56DACB" })}
            />
          <Dialog.Actions>
            <Button
              onPress={() => {
                if (cod_user == codigo){
                  hideDialog()
                  showDialog2()
                }else {
                  setPuls({ user: false, pass: false });
                  setColorText({ user: "red", pass: "red" });
                }
              }}
              color={"#93cab3"}
            >
              {t("Siguiente")}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog visible={visible2} onDismiss={hideDialog2}>
          <Dialog.Title style={{ textAlign: "center" }}>
            {t("Contraseña")}
          </Dialog.Title>
          <TextInput
                style={[styles.textInputUserValues, {borderColor: colorText.pass}]}
                label="Contraseña"
                placeholder={t("Contraseña")}
                underlineColor="transparent"
                value={contra}
                activeOutlineColor="#6d9685"
                onChangeText={(x) => setContra(x)}
                onPressIn={() => setColorText({ user: "#56DACB", pass: "#56DACB" })}
            />
            <TextInput
              style={[styles.textInputUserValues, {borderColor: colorText.pass}]}
              label="Repetir Contraseña"
              placeholder={t("Repetir Contraseña")}
              underlineColor="transparent"
              value={contra2}
              activeOutlineColor="#6d9685"
              onChangeText={(x) => setContra2(x)}
              onPressIn={() => setColorText({ user: "#56DACB", pass: "#56DACB" })}
            />
          <Dialog.Actions>
            <Button
              onPress={() => {
                if (contra == contra2){
                  console.log("HOLLAAAAA")
                  pepe()
                  hideDialog2()
                  props.navigation.navigate("Begin");
                }else {
                  setPuls({ user: false, pass: false });
                  setColorText({ user: "red", pass: "red" });
                }
              }}
              color={"#93cab3"}
            >
              {t("Guardar")}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      </Provider>
      </ImageBackground>
);
}

const styles = StyleSheet.create({
    texto: {
      marginTop: 400,
      color: "#000000",
      fontSize: 30,
      alignSelf: 'center',
      fontWeight: 'bold'
    },
    container: {
      flex: 15,
      flexDirection: "column",
    },
    textInputUserValues: {
      margin: 20,
      marginTop: 50,
      marginBottom: 0,
      backgroundColor: "#FFFFFF",
      borderWidth: 2,
      borderRadius: 12,
      elevation: 0,
      height: 60,
      paddingLeft: 20,
      fontSize: 20,
      color: "#484848",
    },
    textInputUserValues2: {
      margin: 20,
      marginTop: 10,
      marginBottom: 0,
      backgroundColor: "#FFFFFF",
      borderWidth: 2,
      borderRadius: 12,
      elevation: 0,
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
      marginTop: 30,
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: "white",
      alignSelf: "center",
    },
  });
  
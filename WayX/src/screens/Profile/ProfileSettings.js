import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TextInput,
} from "react-native";
import { Provider, Menu, Avatar, Button, FAB } from "react-native-paper";
import { locations, routeTypes } from "../../utils/Data/Data";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";

const ip = "http://85.56.203.68:5000/wayx"

export default function ProfileSettings(props) {
  const [nom, setNom] = useState(props.route.params.user.userName);
  const [email, setEmail] = useState(props.route.params.user.email);
  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState(global.language);
  const [province, setProvince] = useState(t(props.route.params.user.location));
  const [routeType, setRouteType] = useState(
    t(props.route.params.user.typeRoute)
  );
  const [imageUser, SetImageUser] = useState("");
  const [image, setImage] = useState();
  const [touchImage, setTouchImage] = useState(false);

  useEffect(() => {}, []);

  const returnImage = () => {
    if (!touchImage) {
      return (
        <View style={styles.fondo2}>
          <Avatar.Image
            source={{ uri: props.route.params.user.image }}
            size={150}
            style={styles.ava}
            onTouchStart={() => pickImage()}
          ></Avatar.Image>
        </View>
      );
    } else {
      return (
        <View style={styles.fondo2}>
          <Avatar.Image
            source={{ uri: image }}
            size={150}
            style={styles.ava}
            onTouchStart={() => pickImage()}
          ></Avatar.Image>
        </View>
      );
    }
  };

  const pickImage = async () => {
    //Modificar aspect si dependiendo del tamaño que cojamos para las fotos
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    SetImageUser(result.base64);

    if (!result.cancelled) {
      setTouchImage(true);
      setImage(result.uri);
    }
  };
  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch((error) => console.log(error));
  };
  //type:delete_profile,user_id

  const deleteUser = () => {
    console.log(ip, {
      data:
        '{"type":"delete_profile","user_id":' +
        props.route.params.user.id +
        "}",
    });
    axios
      .delete(ip, {
        data: {
          type: "delete_profile",
          user_id: props.route.params.user.id,
        },
      })
      .then((res) => {
        console.log(res.data);
        props.navigation.navigate("Begin");
      })
      .catch((res) => {
        console.log("Error");
      });
  };
  const update = () => {
    if (!touchImage) {
      axios
        .put(
          ip,
          '{"type":"update_profile","userName":"' +
            nom +
            '","password":"' +
            props.route.params.user.password +
            '","email":"' +
            email +
            '","image":"' +
            props.route.params.user.image +
            '","location":"' +
            province +
            '","type_route":"' +
            routeType +
            '","user_id":' +
            props.route.params.user.id +
            "}"
        )
        .then((res) => {
          console.log(res.data);
          props.navigation.navigate("BottomTabs", {
            user: props.route.params.user,
          });
        })
        .catch((res) => {
          console.log("Error");
        });
    } else {
      axios
        .put(
          ip,
          '{"type":"update_profile","userName":"' +
            nom +
            '","password":"' +
            props.route.params.user.password +
            '","email":"' +
            email +
            '","image":"data:image/png;base64,' +
            imageUser +
            '","location":"' +
            province +
            '","type_route":"' +
            routeType +
            '","user_id":' +
            props.route.params.user.id +
            "}"
        )
        .then((res) => {
          console.log(res.data);
          props.navigation.navigate("BottomTabs", {
            user: props.route.params.user,
          });
        })
        .catch((res) => {
          console.log("Error");
        });
    }
  };

  return (
    <Provider>
      <ImageBackground
        source={require("../../assets/wallpaperGW.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.fabBackContainer}>
          <FAB
            style={styles.fab}
            color={"#9AE2D9"}
            icon="arrow-left"
            onPress={() => props.navigation.goBack()}
          />
        </View>
        {returnImage()}
      </ImageBackground>
      <ScrollView style={styles.scroll}>
        <View style={styles.image2}>
          <View style={styles.fondo3}>
            <View style={styles.bordes}>
              <Menu.Item title={t("nameLbl")} style={styles.menu} />
              <TextInput
                style={styles.text_input}
                value={nom}
                onChangeText={(t) => setNom(t)}
              />
            </View>
            <View style={styles.bordes}>
              <Menu.Item title={t("emailLbl")} style={styles.menu} />
              <TextInput
                style={styles.text_input}
                value={email}
                onChangeText={(t) => setEmail(t)}
              />
            </View>
            <View style={styles.bordes} />
            <View style={styles.viewPicker}>
              <View style={styles.pickerName}>
                <TextInput>{t("locationLbl")}</TextInput>
              </View>
              <View style={styles.picker1}>
                <Picker
                  selectedValue={province}
                  style={styles.pickerStl}
                  prompt={t("selectProvince")}
                  onValueChange={(itemValue, itemIndex) =>
                    setProvince(itemValue)
                  }
                >
                  {locations.map((data, pos) => {
                    return (
                      <Picker.Item
                        key={pos}
                        label={t(data.province)}
                        value={data.province}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View style={styles.viewPicker}>
              <View style={styles.pickerName}>
                <TextInput>{t("routeTypeLbl")}</TextInput>
              </View>
              <View style={styles.picker1}>
                <Picker
                  selectedValue={routeType}
                  style={styles.pickerStl}
                  prompt={t("selectRouteType")}
                  onValueChange={(itemValue, itemIndex) =>
                    setRouteType(itemValue)
                  }
                >
                  {routeTypes.map((data, pos) => {
                    return (
                      <Picker.Item
                        key={pos}
                        label={data.type}
                        value={data.type}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View style={styles.viewPicker}>
              <View style={styles.pickerName}>
                <Text>{t("languageLbl")}</Text>
              </View>
              <View style={styles.picker1}>
                <Picker
                  selectedValue={currentLanguage}
                  style={styles.pickerStl}
                  prompt={t("selectLanguage")}
                  onValueChange={(itemValue, itemIndex) => {
                    setLanguage(itemValue);
                    changeLanguage(itemValue);
                  }}
                >
                  <Picker.Item label="English" value="en" />
                  <Picker.Item label="Valencià" value="va" />
                </Picker>
              </View>
            </View>
            <View style={styles.viewBtn}>
              <Button
                style={styles.boto2}
                mode="text"
                color="#56DACB"
                onPress={() => props.navigation.navigate("Begin")}
              >
                <Text> {t("signOutLbl")}</Text>
              </Button>
            </View>
            <View style={styles.viewBtn}>
              <Button
                style={styles.boto2}
                mode="text"
                color="#D95555"
                onPress={() => deleteUser()}
              >
                <Text>{t("deleteAccountLbl")}</Text>
              </Button>
            </View>
            <View style={styles.fabConfirmRoute}>
              <FAB
                style={styles.fab2}
                color={"white"}
                small
                icon="account-check-outline"
                label={t("saveChangesBtn")}
                onPress={() => update()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  provider: {
    marginTop: 25,
  },
  scroll: {
    height: 280,
    backgroundColor: "white",
  },
  fabConfirmRoute: {
    justifyContent: "center",
    marginTop: 10,
  },
  fab2: {
    backgroundColor: "#89D7CB",
    elevation: 10,
    height: 50,
    width: "60%",
    alignSelf: "center",
    justifyContent: "center",
  },
  viewBtn: {
    marginVertical: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  boto2: {
    backgroundColor: "transparent",
    color: "#56DACB",
    width: "80%",
    height: 50,
    justifyContent: "center",
    fontSize: 25,
  },
  viewPicker: {
    flexDirection: "row",
    marginVertical: 10,
  },
  pickerName: {
    justifyContent: "center",
    flex: 3,
  },
  picker1: {
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    flex: 2,
  },
  pickerStl: {
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
  },
  fabBackContainer: {
    position: "absolute",
    zIndex: 100,
    top: "20%",
    left: "5%",
  },
  fab: {
    backgroundColor: "white",
    elevation: 10,
    height: "90%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    flex: 2,
    color: "grey",
    textAlign: "right",
    marginTop: 10,
  },

  text_input: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 20,
    borderColor: "#56DACB",
    borderRadius: 10,
    height: 50,
    fontSize: 15,
    color: "#484848",
    maxWidth: 350,
    minWidth: 100,
    alignSelf: "flex-end",
  },
  modal: {
    alignSelf: "center",
    width: "90%",
    height: "90%",
    marginLeft: 20,
  },
  text3: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    color: "black",
  },
  bordes: {
    borderColor: "#D1D1D1",
    borderTopWidth: 1,

    paddingVertical: 15,
    marginLeft: 1,
    marginRight: 1,
    justifyContent: "flex-end",
  },
  menu: {
    flex: 1,
    width: 300,
    alignSelf: "flex-start",
    paddingHorizontal: 0,
  },
  btnView: {
    flex: 1,
    flexDirection: "column",
    height: 100,
  },
  fondo: {
    margin: 1,
  },
  fondo2: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  ava: {
    borderWidth: 0,
    elevation: 12,
  },
  fondoNom: {
    flex: 1,
    alignItems: "center",
  },
  text2: {
    textAlign: "center",
    color: "#146464",
    fontSize: 30,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  image2: {
    flex: 2,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 12,
  },
  fondo3: {
    flex: 6,
    padding: 10,
  },
  imagen: {
    height: 300,
    width: 350,
  },
  textMenu: {
    textAlign: "center",
    color: "grey",
    justifyContent: "center",
  },
  textMenu2: {
    textAlign: "center",
    color: "black",
    margin: 10,
  },
});

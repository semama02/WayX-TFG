import * as React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { FAB, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Linking from "expo-linking";
import { useTranslation } from "react-i18next";
import axios from "axios";

const ip = "http://85.56.203.68:5000/wayx"

export default function RouteInfo(props) {


  const { t, i18n } = useTranslation();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [datos, setDatos] = useState([]);
  

  useEffect(() => {
    const [lat, lng] = props.route.params.rut.map.split(",");
    setLatitude(parseFloat(lat));
    setLongitude(parseFloat(lng));
    IsCompleted();
    getDatos();
  }, []);
  // this function is used to open the google maps app with the route
  function openGps(lat, lng) {
    var scheme = Platform.OS === "ios" ? "maps:" : "google.navigation:q=";
    var url = scheme + `${lat},${lng}`;
    Linking.openURL(url);
  }

  const getDatos = async () => {
    console.log(props.route.params.rut.location)
    const res = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=' +props.route.params.rut.location +'&units=metric&lang=es&APPID=1d89f0ecc30e4a2ab23f1d00bf2c9c09');
    let pepe = res.data
    // console.log(pepe)
    setDatos(pepe);
    console.log("HOLALAA" + datos)
  }

  const [txtCompl, setTxtCompl] = useState(t("markCompletedBtn"));
  const [completed, setCompleted] = useState(false);

  const IsCompleted = () => {
    axios
      .post(
        ip,
        '{"type":"isCompleted_route","user_id":' +
          props.route.params.user.id +
          ',"route_id":' +
          props.route.params.rut.id +
          "}"
      )
      .then((res) => {
        if (res.data === "Ok") {
          setCompleted(true);
          setTxtCompl(t("markCompleted"));
        } else {
          setCompleted(false);
          setTxtCompl(t("markCompletedBtn"));
        }
      })
      .catch((res) => {
        console.log(res.data);
        console.log("Error");
      });
  };

  const VisitSite = () => {
      ip,
      '{"type":"visited_site_add","user_id":' +
        props.route.params.user.id +
        ',"route_id":' +
        props.route.params.rut.id +
        "}";

    axios
      .post(
        ip,
        '{"type":"visited_site_add","user_id":' +
          props.route.params.user.id +
          ',"route_id":' +
          props.route.params.rut.id +
          "}"
      )
      .then((res) => {
        setTxtCompl(t("markCompleted"));
        setCompleted(true);
      })
      .catch((res) => {
        console.log("Error");
      });
  };

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/wallpaperGrandW2.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.fabBackContainer}>
          <FAB
            style={styles.fab}
            color={"#93cab3"}
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.flexImage}>
          <Image
            source={{ uri: props.route.params.rut.images }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <ScrollView style={styles.scroll}>
          <View style={styles.flexTitleConfirm}>
            <View style={styles.flexTitle}>
              <Text style={styles.tagTitle}>{t("pointNameLbl")}:</Text>
              <Text style={styles.info}>{props.route.params.rut.name}</Text>
            </View>
            <View style={styles.flexConfirm}>
              <Button
                icon="play"
                color={"#93cab3"}
                mode="text"
                onPress={() => openGps(latitude, longitude)}
              >
                {t("startBtn")}
              </Button>
            </View>
          </View>
          <View style={styles.flexDescrip}>
            <View style={styles.boxContent}>
              <View style={styles.boxInfo}>
                <Text style={styles.tagTitle}>{t("locationNameLbl")}:</Text>
                <Text style={styles.info}>
                  {t(props.route.params.rut.location)}
                </Text>
              </View>
              <View style={styles.boxInfo}>
                <Text style={styles.tagTitle}>{t("coordsLbl")}:</Text>
                <Text style={styles.info}>
                  {latitude.toFixed(4) + ", " + longitude.toFixed(4)}
                </Text>
              </View>
            </View>
            <View style={styles.boxContent}>
              <View style={styles.boxInfo}>
                <Text style={styles.tagTitle}>{t("routeTypeLbl")}:</Text>
                <Text style={styles.info}>
                  {t(props.route.params.rut.type)}
                </Text>
              </View>
              <View style={styles.boxInfo}>
                <Text style={styles.tagTitle}>{t("perfectForLbl")}:</Text>
                <Text style={styles.info}>
                  {t(props.route.params.rut.perfectoTo)}
                </Text>
              </View>
            </View>
            <View style={styles.boxContent2}>
              <View style={styles.boxInfo2}>
                <Text style={styles.tagTitle}>{t("descriptionLbl")}:</Text>
              </View>
              <View style={styles.boxInfo2}>
                <Text style={styles.info}>
                  {props.route.params.rut.description}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.flexMap}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              pitchEnabled={false}
              rotateEnabled={false}
              scrollEnabled={false}
              zoomEnabled={false}
              region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.09122,
                longitudeDelta: 0.00121,
              }}
            >
              <Marker
                title={t("yourPointLbl")}
                pinColor="#93cab3"
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                }}
              ></Marker>
            </MapView>
          </View>
          <View style={styles.fabConfirmRoute}>
            <FAB
              style={styles.fab2}
              color={"#93cab3"}
              small
              icon="check-all"
              label={txtCompl}
              onPress={() => VisitSite()}
              disabled={completed}
            />
          </View>
          {/* <View style={styles.view}>
                <Text style={styles.input}>País: {tiempo.name}</Text>
                <Text style={styles.input}>Humedad: {tiempo.main.humidity}%</Text>
                <Text style={styles.input}>Presión: {tiempo.main.pressure}Pa</Text>
                <Text style={styles.input}>Sensación termica: {tiempo.main.feels_like}ºC</Text>
                <Text style={styles.input}>Temperatura: {tiempo.main.temp}ºC</Text>
                <Text style={styles.input}>Temperatura mínima: {tiempo.main.temp_min}ºC</Text>
                <Text style={styles.input}>Temperatura máxima: {tiempo.main.temp_max}ºC</Text>
            </View> */}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefefe",
  },
  scroll: {
    height: 300,
    padding: 10,
  },

  info: {
    fontSize: 20,
    color: "black",
  },
  tagTitle: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginBottom: 10,
  },
  tagTitle2: {
    fontSize: 16,
    color: "black",
    marginBottom: 10,
    textAlign: "center",
    alignSelf: "center",
  },
  map: {
    width: "80%",
    height: 300,
  },
  fabBackContainer: {
    position: "absolute",
    zIndex: 100,
    top: "6%",
    left: "5%",
  },
  fabConfirmRoute: {
    height: 200,
    justifyContent: "center",
  },
  fab: {
    backgroundColor: "white",
    elevation: 10,
    height: "90%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  fab2: {
    backgroundColor: "white",
    elevation: 10,
    height: 60,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
  },
  fab3: {
    backgroundColor: "grey",
    elevation: 10,
    height: 60,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
  },
  flexImage: {
    flex: 1.5,
    width: "100%",
  },
  flexTitleConfirm: {
    flex: 0.5,
    flexDirection: "row",
  },
  flexTitle: {
    flex: 2,
    width: "100%",
    padding: 10,
  },
  flexConfirm: {
    flex: 1,
    justifyContent: "center",
  },
  flexDescrip: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  boxContent: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  boxContent2: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  boxInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  boxInfo2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  flexMap: {
    flex: 2,
    alignItems: "center",
    width: "100%",
    marginTop: "5%",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

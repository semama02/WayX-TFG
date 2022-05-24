import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Text,
  RefreshControl,
} from "react-native";
import { Provider } from "react-native-paper";
import CardHome from "../../components/Cards/CardHome";
import { useTranslation } from "react-i18next";

const ip = "http://85.56.203.68:5000/wayx"

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Home(props) {
  const { t, i18n } = useTranslation();
  const [routeClose, setRoutesClose] = useState([]);
  const [routPreferences, setRoutePreferences] = useState([]);
  const [countRoute, setCountRoute] = useState("");
  const [close, setClose] = useState(false);
  const [pref, setPref] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [user, setUser] = useState(props.route.params.user);

  const getUser = () => {
    axios
      .post(
        ip,
        '{"type":"user_by_id","user_id":' + props.route.params.user.id + "}"
      )
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((res) => {
        console.log("Error");
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1200).then(() => setRefreshing(false));
    CloseToYou();
    Preferences();
    CountRoutes();
    getUser();
  }, []);

  useEffect(() => {
    CloseToYou();
    Preferences();
    CountRoutes();
    getUser();
  }, []);

  const CloseToYou = async () => {
    axios
      .post(
        ip,
        '{"type":"home_location","id":"' + props.route.params.user.id + '"}'
      )
      .then((res) => {
        console.log(res.data);
        if (res.data != "]") {
          setRoutesClose(res.data);
          setClose(true);
        }
      });
  };

  const Preferences = async () => {
    axios
      .post(
        ip,
        '{"type":"home_type","id":"' + props.route.params.user.id + '"}'
      )
      .then((res) => {
        if (res.data != "]") setRoutePreferences(res.data);
        setPref(true);
      });
  };

  const CountRoutes = async () => {
    axios
      .post(
        ip,
        '{"type":"user_visited_counter","user_id":"' +
          props.route.params.user.id +
          '"}'
      )
      .then((res) => {
        console.log("Count: " + res.data);
        setCountRoute(res.data);
      });
  };

  return (
    <View style={styles.cont}>
      <ImageBackground
        source={require("../../assets/grad3.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.titleTxt}>
          <Text style={styles.bigHello}>{t("helloLbl")}</Text>
          <Text style={styles.bigNom}>{user.userName}</Text>
        </View>
        <View style={styles.titleLogo}>
          <Image
            style={styles.logo}
            source={require("../../assets/wayLogo.png")}
          ></Image>
        </View>
      </ImageBackground>
      <View style={styles.homeCont}>
        <Provider style={styles.ViewContingut}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.scroll1}>
              <Text style={styles.txt}>{t("closeToYouLbl")}</Text>
              <ScrollView horizontal={true}>
                {close
                  ? routeClose.map((index, pos) => {
                      return (
                        <View key={pos}>
                          <CardHome
                            rut={index}
                            nav={props.navigation}
                            user={props.route.params.user}
                          />
                        </View>
                      );
                    })
                  : null}
              </ScrollView>
            </View>
            <ImageBackground
              source={require("../../assets/wallpaperWW.png")}
              resizeMode="cover"
              style={styles.image}
            >
              <View style={styles.empty1}></View>
              <View style={styles.dataView}>
                <Text style={styles.dataTxt}>{countRoute}</Text>
              </View>
              <View style={styles.empty1}>
                <Text style={styles.dataTxt2}>{t("completedRoutesLbl")}</Text>
              </View>
            </ImageBackground>
            <View style={styles.scroll2}>
              <Text style={styles.txt}>{t("basedOnYourPreferencesLbl")}</Text>
              <ScrollView horizontal={true}>
                {pref
                  ? routPreferences.map((index, pos) => {
                      return (
                        <View key={pos}>
                          <CardHome
                            rut={index}
                            nav={props.navigation}
                            user={props.route.params.user}
                          />
                        </View>
                      );
                    })
                  : null}
              </ScrollView>
            </View>
          </ScrollView>
        </Provider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 15,
    flexDirection: "column",
    backgroundColor: "white",
  },
  data: {
    borderWidth: 3,
    borderColor: "red",
    flexDirection: "row",
  },
  dataTxt: {
    textAlign: "center",
    color: "#A9D6C8",
    fontSize: 160,
    fontFamily: "sans-serif-light",
    marginBottom: 15,
  },
  dataTxt2: {
    textAlign: "left",
    color: "#727272",
    fontSize: 15,
    fontFamily: "sans-serif-light",
    marginTop: 50,
  },
  dataView: {
    flex: 2,
  },
  empty1: {
    flex: 1,
  },
  titleTxt: {
    flex: 2,
    padding: 20,
    paddingTop: 25,
    justifyContent: "flex-end",
  },
  titleLogo: {
    flex: 1,
    paddingRight: 20,
  },
  scroll1: {
    marginTop: 20,
    height: 350,
  },
  scroll2: {
    marginTop: 20,
    height: 350,
    paddingTop: 30,
  },
  ViewContingut: {
    flex: 1,
  },
  homeCont: {
    flex: 2,
    flexDirection: "row",
  },
  bigHello: {
    textAlign: "left",
    color: "white",
    fontSize: 62,
    fontFamily: "sans-serif-thin",
  },
  txt: {
    textAlign: "left",
    color: "#262626",
    fontSize: 20,
    fontFamily: "sans-serif-light",
    marginTop: 10,
    marginLeft: 20,
  },
  logo: {
    height: 50,
    width: 100,
    marginTop: 40,
    marginLeft: 25,
  },
  bigNom: {
    textAlign: "left",
    color: "white",
    fontSize: 35,
    fontFamily: "sans-serif-light",
  },
  snackBar: {
    marginLeft: -10,
    width: "95%",
  },
  ViewDown: {
    backgroundColor: "#C70039",
    flex: 0.25,
  },
  layout: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",

    flexDirection: "row",
  },
  image2: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    borderWidth: 3,
    borderColor: "red",
    flexDirection: "row",
  },
});

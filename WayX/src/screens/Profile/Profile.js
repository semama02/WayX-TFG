import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  RefreshControl,
} from "react-native";
import {
  Provider,
  Button,
  Menu,
  Avatar,
  Modal,
  Portal,
  FAB,
} from "react-native-paper";
import CardExplorar from "../../components/Cards/CardExplorar";
import { useTranslation } from "react-i18next";

const ip = "http://85.56.203.68:5000/wayx"

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Profile(props) {
  const { t, i18n } = useTranslation();
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [visible2, setVisible2] = useState(false);
  const showDialog2 = () => setVisible2(true);
  const hideDialog2 = () => setVisible2(false);
  const [visitSites, setVisitSites] = useState([]);
  const [yourRoutes, setYourRoutes] = useState([]);
  const [vS, setVS] = useState(false);
  const [yR, setYR] = useState(false);
  const [contyR, setcontyR] = useState(0);
  const [contvS, setcontvS] = useState(0);
  const [user, setUser] = useState(props.route.params.user);

  console.log(user.id + "encehnche" + props.route.params.user);
  const [refreshing, setRefreshing] = React.useState(false);

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
    returnVisitedSites();
    returnYourRoutes();
    getUser();
  }, []);

  useEffect(() => {
    returnVisitedSites();
    returnYourRoutes();
    getUser();
  }, []);

  const returnYourRoutes = () => {
    console.log(
      ip,
      '{"type":"user_routes","user_id":' + props.route.params.user.id + "}"
    );
    axios
      .post(
        ip,
        '{"type":"user_routes","user_id":' + props.route.params.user.id + "}"
      )
      .then((res) => {
        if (res.data != "[") {
          setcontyR(res.data.length);
          setYR(true);
          setYourRoutes(res.data);
          console.log("Your Routes: " + res.data[1].id);
        } else {
          setYR(false);
        }
      })
      .catch((res) => {
        console.log("Error");
      });
  };

  const returnVisitedSites = () => {
    axios
      .post(
        ip,
        '{"type":"user_visited","user_id":' + props.route.params.user.id + "}"
      )
      .then((res) => {
        if (res.data != "[") {
          setcontvS(res.data.length);
          setVS(true);
          setVisitSites(res.data);
        } else {
          setVS(false);
        }
      })
      .catch((res) => {
        console.log("Error");
      });
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
            color={"#BED8C7"}
            icon="account-cog-outline"
            onPress={() =>
              props.navigation.navigate("ProfileSettings", {
                user: user,
              })
            }
          />
        </View>
        <View style={styles.fondo2}>
          <Avatar.Image
            source={{ uri: user.image }}
            size={150}
            style={styles.ava}
          ></Avatar.Image>
        </View>
      </ImageBackground>
      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.image2}>
          <View style={styles.fondoNom}>
            <Text style={styles.text2}>{user.userName}</Text>
          </View>
          <View style={styles.fondo3}>
            <View style={styles.bordes}>
              <Menu.Item title={t("emailLbl")} style={styles.menu} />
              <Text style={styles.text1}>{user.email}</Text>
            </View>
            <View style={styles.bordes}>
              <Menu.Item title={t("locationLbl")} style={styles.menu} />
              <Text style={styles.text1}>{user.location}</Text>
            </View>
            <View style={styles.bordes}>
              <Menu.Item
                title={t("routePreferenceLbl")}
                style={[styles.menu, { flex: 2 }]}
              />
              <Text style={styles.text1}>{user.typeRoute}</Text>
            </View>
            <View style={styles.bordes}>
              <View style={styles.btnView}>
                <Menu.Item title={t("createdRoutesLbl")} style={styles.menu} />
                <Button
                  onPress={showDialog}
                  style={styles.boto2}
                  mode="text"
                  color="#56DACB"
                >
                  {t("showLbl")}
                </Button>
              </View>
              <Portal>
                <Modal
                  visible={visible}
                  onDismiss={hideDialog}
                  style={styles.modal}
                >
                  <ScrollView>
                    {yR
                      ? yourRoutes.map((i, p) => {
                          console.log(i.id + p);
                          return (
                            <CardExplorar
                              key={p}
                              rut={i}
                              nav={props.navigation}
                              user={user}
                            />
                          );
                        })
                      : null}
                  </ScrollView>
                </Modal>
              </Portal>
              <Text style={styles.text1}>
                {contyR} {t("routesLbl")}
              </Text>
            </View>
            <View style={styles.bordes}>
              <View style={styles.btnView}>
                <Menu.Item
                  title={t("completedRoutesLbl")}
                  style={styles.menu}
                />
                <Button
                  onPress={showDialog2}
                  style={styles.boto2}
                  mode="text"
                  color="#56DACB"
                >
                  {t("showLbl")}
                </Button>
              </View>
              <Portal>
                <Modal
                  visible={visible2}
                  onDismiss={hideDialog2}
                  style={styles.modal}
                >
                  <ScrollView>
                    {vS
                      ? visitSites.map((item, pos) => {
                          return (
                            <CardExplorar
                              key={pos}
                              rut={item}
                              nav={props.navigation}
                              user={user}
                            />
                          );
                        })
                      : null}
                  </ScrollView>
                </Modal>
              </Portal>
              <Text style={styles.text1}>
                {contvS} {t("routesLbl")}
              </Text>
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
    backgroundColor: "transparent",
    color: "blue",
  },
  fabBackContainer: {
    position: "absolute",
    zIndex: 100,
    top: "20%",
    right: "5%",
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
    flex: 25,
    color: "grey",
    textAlign: "right",
    marginTop: 10,
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
    justifyContent: "center",
  },
  menu: {
    flex: 1,
  },
  btnView: {
    flex: 2.5,
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
    margin: "5%",
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
  boto2: {
    flex: 1,
    backgroundColor: "transparent",
    color: "#56DACB",
    width: 110,

    fontSize: 20,
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

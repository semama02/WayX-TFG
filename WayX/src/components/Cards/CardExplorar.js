import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, IconButton } from "react-native-paper";

export default function CardExplorar(props) {
  let [icon, setIcon] = useState("");
  useEffect(() => {
    returnRouteIcon();
  }, []);
  const returnRouteIcon = () => {
    // Depending on the type of the route, it sets the icon
    if (props.rut.type == "beach" || props.rut.type == "Platja") {
      setIcon("beach");
    } else if (props.rut.type == "mountain" || props.rut.type == "Muntanya") {
      setIcon("tree-outline");
    } else if (props.rut.type == "creek" || props.rut.type == "Cala") {
      setIcon("tower-beach");
    } else if (props.rut.type == "city" || props.rut.type == "Ciutat") {
      setIcon("city");
    } else if (props.rut.type == "touristic" || props.rut.type == "Turística") {
      setIcon("shopping");
    }
  };
  return (
    <Card
      mode="outlined"
      style={styles.card}
      onPress={() =>
        props.nav.navigate("RouteInfo", {
          rut: props.rut,
          user: props.user,
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.viewImg}>
          <Card.Cover source={{ uri: props.rut.images }} style={styles.image} />
        </View>
        <View style={styles.viewCont}>
          <Card.Content style={styles.viewCardCont}>
            <Text style={styles.txtTitle}>{props.rut.name}</Text>
            <Text style={styles.txtDesc}>{props.rut.description}</Text>
          </Card.Content>
        </View>
        <View style={styles.viewIcon}>
          <IconButton
            icon={icon}
            size={45}
            color={"#54dbcc"}
            style={styles.icn}
          />
        </View>
      </View>
    </Card>
  );
}
const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    margin: 20,
    height: "90%",
    width: "90%",
    borderRadius: 5,
  },
  container: {
    flexDirection: "row",
    height: 150,
    margin: 0,
  },
  viewImg: {
    flex: 3,
    justifyContent: "center",
    padding: 5,
  },
  viewCont: {
    flex: 2.5,
  },

  viewIcon: {
    flex: 0.9,
  },
  viewCardCont: {
    alignItems: "flex-start",
    paddingHorizontal: 5,
  },
  card: {
    alignSelf: "center",
    padding: 0,
    height: 150,
    width: "83%",
    marginVertical: 17,
    borderWidth: 0,
    elevation: 10,
    borderRadius: 10,
  },
  icn: {
    alignSelf: "center",
    marginRight: 20,
    marginTop: 0,
  },
  txtTitle: {
    fontWeight: "bold",
    marginTop: 15,
  },
  txtDesc: {
    fontSize: 12,
    marginTop: 5,
    marginRight: 7.5,
    height: "55%",
  },
});

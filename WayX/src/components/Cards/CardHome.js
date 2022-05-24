import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";

export default function CardHome(props) {
  useEffect(() => {
    console.log(props.rut);
  }, []);

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
      <View style={styles.img}>
        <Card.Cover source={{ uri: props.rut.images }} style={styles.image} />
      </View>

      <View style={styles.txt}>
        <Card.Content style={{ alignItems: "flex-start", marginBottom: 10 }}>
          <Text style={styles.txtStyle}>{props.rut.name}</Text>
        </Card.Content>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    width: "90%",
    height: "90%",
    margin: 15,
    borderRadius: 10,
  },

  card: {
    height: 250,
    width: 220,
    marginHorizontal: 15,
    elevation: 15,
    borderRadius: 15,
    borderWidth: 0,
    marginVertical: 20,
  },

  img: {
    flex: 3,
    justifyContent: "center",
    padding: 7,
  },

  txt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  txtStyle: {
    textAlign: "center",
    color: "black",
    fontSize: 17,
    fontFamily: "sans-serif-light",
  },
});

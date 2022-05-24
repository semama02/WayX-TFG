import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { FAB } from "react-native-paper";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useTranslation } from "react-i18next";

export default function PointMap(props) {
  const { t, i18n } = useTranslation();
  const [marker, setMarker] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(39.47);
  const [longitude, setLongitude] = useState(-0.376389);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      /* if you want to select a especific location, uncomment the line below and comment the line above
        you must indicate the street, number of street, postal code, city of location, and country of location
      */
      //let location = await Location.geocodeAsync("Calle de la Alameda, 1, 28036 Madrid, Spain");
      setLocation(location);
    })();
  }, []);

  function getUserLocation() {
    let text = "Waiting..";
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      // extract the latitude and longitude
      let { latitude, longitude } = location.coords;
      text = JSON.stringify(location);
      setLatitude(latitude);
      setLongitude(longitude);
    }
    console.log("Location information: " + text);
  }

  return (
    <View style={styles.container}>
      <View style={styles.fabBackContainer}>
        <FAB
          style={styles.fab}
          color={"#93cab3"}
          large
          icon="arrow-left"
          onPress={() => props.route.params.nav.navigate("BottomTabs")}
        />
      </View>
      <View style={styles.fabSaveContainer}>
        <FAB
          style={styles.fab}
          color={"#93cab3"}
          large
          icon="content-save"
          onPress={() =>
            props.route.params.nav.navigate("BottomTabs") &
            props.route.params.nav.setParams({
              coords: {
                lat: latitude,
                long: longitude,
              },
              user: props.route.params.user,
            })
          }
        />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsBuildings={true}
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.09122,
          longitudeDelta: 0.00121,
        }}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01122,
          longitudeDelta: 0.00121,
        }}
        onPress={(e) => {
          setMarker(e.nativeEvent.coordinate);
          setLatitude(e.nativeEvent.coordinate.latitude);
          setLongitude(e.nativeEvent.coordinate.longitude);
        }}
      >
        {
          // if state contains marker variable with a value, show a marker on the map
          marker && (
            <Marker
              pinColor="#93cab3"
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={t("yourPointLbl")}
            />
          )
        }
      </MapView>
      <View style={styles.fabLocationContainer}>
        <FAB
          style={styles.fab}
          color={"#93cab3"}
          small
          icon="crosshairs-gps"
          onPress={() => getUserLocation()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    position: "relative",
    zIndex: 50,
    width: Dimensions.get("window").width,
    height: "100%",
  },
  fabBackContainer: {
    position: "absolute",
    zIndex: 100,
    top: "6%",
    left: "5%",
  },
  fabSaveContainer: {
    position: "absolute",
    zIndex: 100,
    top: "6%",
    right: "5%",
  },
  fabLocationContainer: {
    position: "absolute",
    zIndex: 100,
    bottom: "12%",
    right: "5%",
  },
  fab: {
    backgroundColor: "white",
    elevation: 10,
    height: "100%",
    width: "100%",
  },
});

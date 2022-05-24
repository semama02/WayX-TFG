import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import {
  Button,
  Dialog,
  IconButton,
  Portal,
  Provider,
  Searchbar,
  Snackbar,
  Text,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { locations, routeTypes } from "../../utils/Data/Data";
import CardExplorar from "../../components/Cards/CardExplorar";
import axios from "axios";
import { useTranslation } from "react-i18next";

const ip = "http://85.56.203.68:5000/wayx"

export default function Explore(props) {
  const { t, i18n } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [type, setType] = useState(t("Beach"));
  const [location, setLocation] = useState(t("Valencia"));
  const [visibleSnack, setVisibleSnack] = useState(false);
  const [search, setSearch] = useState("");
  const [route, setRoutes] = useState([]);
  const [pressSearch, setPressSearch] = useState(false);
  const [pressFilters, setPressFilters] = useState(false);

  const Search = async () => {
    setPressSearch(false);
    setPressFilters(false);
    axios
      .post(
        ip,
        '{"type":"find_name","name":"' + search + '"}'
      )
      .then((res) => {
        console.log(res.data);
        setRoutes(res.data);
        if (res.data != "") {
          setPressSearch(true);
          setPressFilters(false);
        }
      });
  };

  const SearchFilters = async () => {
    setPressFilters(false);
    setPressSearch(false);
    axios
      .post(
        ip,
        '{"type":"find_location_type","location":"' +
          location +
          '","routeType":"' +
          type +
          '"}'
      )
      .then((res) => {
        setRoutes(res.data);
        if (res.data != "") {
          setPressSearch(false);
          setPressFilters(true);
        }
      });
  };

  const returnCards = () => {
    return route.map((item, pos) => {
      return (
        <View key={pos}>
          <CardExplorar rut={item} nav={props.navigation} user={props.route.params.user}/>
        </View>
      );
    });
  };

  const onToggleSnackBar = () => setVisibleSnack(!visibleSnack);
  const onDismissSnackBar = () => setVisibleSnack(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const handlePress = () => setExpanded(!expanded);

  return (
    <ImageBackground
      source={require("../../assets/wallpaperExpD2.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <Provider style={styles.ViewContingut}>
        <View style={styles.viewlogo}>
          <Image
            style={styles.logo}
            source={require("../../assets/wayLogo.png")}
          ></Image>
        </View>
        <Searchbar
          placeholder={t("searchLbl")}
          style={styles.SearchbarS}
          onChangeText={(s) => setSearch(s)}
          onIconPress={() => Search()}
        />
        <ScrollView>
          {pressFilters || pressSearch ? returnCards() : null}
        </ScrollView>
        <IconButton
          size={40}
          icon={require("../../assets/iconFilters.png")}
          color={"white"}
          style={styles.incbtn}
          onPress={showDialog}
        />
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <View style={styles.picker}>
                <Text style={styles.textpicker}>{t("locationLbl")}:</Text>
                <Picker
                  selectedValue={location}
                  style={styles.textinpicker}
                  prompt={t("selectProvince")}
                  onValueChange={(itemValue) => setLocation(itemValue)}
                  itemStyle={styles.textinpicker}
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
              <View style={styles.picker}>
                <Text style={styles.textpicker}>{t("routeTypeLbl")}:</Text>
                <Picker
                  selectedValue={type}
                  style={styles.pickerElement}
                  prompt={t("selectRouteType")}
                  onValueChange={(itemValue) => setType(itemValue)}
                >
                  {routeTypes.map((data, pos) => {
                    return (
                      <Picker.Item
                        key={pos}
                        label={t(data.type)}
                        value={data.type}
                      />
                    );
                  })}
                </Picker>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog} color={"#56DACB"}>
                {t("cancelLbl")}
              </Button>
              <Button
                onPress={() =>
                  hideDialog() & onToggleSnackBar() & SearchFilters()
                }
                color={"#56DACB"}
              >
                {t("applyLbl")}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Snackbar
          visible={visibleSnack}
          duration={3000}
          onDismiss={onDismissSnackBar}
        >
          {t("appliedFiltersLbl")}
        </Snackbar>
      </Provider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  ViewDown: {
    backgroundColor: "#C70039",
    flex: 0.25,
  },
  ViewContingut: {
    flex: 16,
  },
  viewlogo: {
    justifyContent: "flex-end",
  },
  logo: {
    height: 50,
    width: 100,
    marginTop: 40,
    marginLeft: 25,
  },
  incbtn: {
    backgroundColor: "#3bbcb7",
    position: "absolute",
    top: "85%",
    right: "2%",
    elevation: 10,
  },
  SearchbarS: {
    width: 370,
    margin: 10,
    marginBottom: 22,
    marginTop: "5%",
    alignSelf: "center",
    borderRadius: 30,
  },
  layout: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

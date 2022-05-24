import * as React from "react";
import { StatusBar, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Begin from "./src/screens/Login/Begin";
import Register from "./src/screens/Register/Register";
import BottomTabs from "./src/components/Navigation/BottomTabs/BottomTabs";
import Home from "./src/screens/StartPage/Home";
import RouteInfo from "./src/screens/RouteInfo/RouteInfo";
import Explore from "./src/screens/RouteSearch/Explore";
import CreatePoint from "./src/screens/CreatePoint/CreatePoint";
import PointMap from "./src/screens/PointMap/PointMap";
import Profile from "./src/screens/Profile/Profile";
import ProfileSettings from "./src/screens/Profile/ProfileSettings";
import "./src/i18n/i18n";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  "Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
  "Seems like you're using an old API with gesture components, check out new Gestures system!",
  "Failed prop type: Invalid prop `region.latitude` of type `string` supplied to `MapView`, expected `number`.",
]);

const Stack = createNativeStackNavigator();

export default function App() {
  // global var for selected language, default is english. If user changes language in ProfiileSettings, this var will be updated and shared with all screens for translation
  global.language = "en";

  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor="transparent"
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Begin"
          component={Begin}
          initialParams={{ user: {} }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          initialParams={{ user: {} }}
        />
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          initialParams={{ user: {} }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          initialParams={{ user: {} }}
        />
        <Stack.Screen
          name="RouteInfo"
          component={RouteInfo}
          initialParams={{ user: {} }}
        />
        <Stack.Screen
          name="Explore"
          component={Explore}
          initialParams={{ user: {} }}
        />
        <Stack.Screen
          name="CreatePoint"
          component={CreatePoint}
          initialParams={{ user: {} }}
        />
        <Stack.Screen
          name="PointMap"
          component={PointMap}
          initialParams={{ user: {} }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          initialParams={{ user: {} }}
        />
        <Stack.Screen
          name="ProfileSettings"
          component={ProfileSettings}
          initialParams={{ user: {} }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

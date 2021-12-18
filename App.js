import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MyForm from "./components/Form";

import {
  useFonts,
  Nunito_300Light,
  Nunito_600SemiBold,
  Nunito_400Regular
} from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import GoalList from "./components/GoalList";

import { Provider, useSelector } from "react-redux";
import {store, persistor} from "./redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    paddingVertical: "15%",
    margin: 0,
    height: "100%",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
});

const MyApp = () => {
  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_600SemiBold,
    Nunito_400Regular
  });

  const states = useSelector(state => state.goal)

  if (fontsLoaded) {
    return (
      <>
        <StatusBar backgroundColor="" style="dark" hidden={false} />
        <View style={styles.container}>
          <MyForm />
          <GoalList goals={states.goalList} />
        </View>
      </>
    );
  } else return <AppLoading />;
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MyApp />
      </PersistGate>
    </Provider>
  );
}

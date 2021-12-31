import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import {
  useFonts,
  Nunito_300Light,
  Nunito_600SemiBold,
  Nunito_400Regular,
} from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";

import MyForm from "../components/Form";
import GoalList from "../components/GoalList";
import { useSelector } from "react-redux";

import { FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    paddingBottom: "25%",
    margin: 0,
    height: "100%",
    justifyContent: "space-between",
    // borderWidth: 1,
    // borderColor: "red"
  },
  gotoBtn: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginTop: 15
  },
  icon: {
    fontSize: 22,
    marginLeft: 5,
    color: "#777",
  },
  text: {
    fontSize: 18,
    color: "#777",
    fontFamily: "Nunito_400Regular",
  },
});

const CurrentGoals = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_600SemiBold,
    Nunito_400Regular,
  });

  const states = useSelector((state) => state.goal);

  if (fontsLoaded) {
    return (
      <>
        <StatusBar backgroundColor="purple" style="dark" hidden={false} />
        <View style={styles.container}>
          <MyForm />
          <GoalList goals={states.goalList} />
          <TouchableOpacity
            style={styles.gotoBtn}
            activeOpacity={0.65}
            onPress={() => navigation.push("completedGoals")}
          >
            <Text style={styles.text}>View Completed Goals</Text>
            <FontAwesome style={styles.icon} name="angle-double-right" />
          </TouchableOpacity>
        </View>
      </>
    );
  } else return <AppLoading />;
};

export default CurrentGoals;

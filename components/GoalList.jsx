import React from "react";
import { Text, StyleSheet, View } from "react-native";
import GoalItem from "./GoalItem";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 500,
    borderRadius: 8,
    // padding: 15,
    // paddingTop: 25,
    // elevation: 4,
    // shadowColor: "#aaaaaaaa",
  },
  noGoals: {
    fontFamily: "Nunito_300Light",
    fontSize: 28,
    color: "#0000005e",
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default function ({ goals }) {
  return (
    <View style={styles.container}>
      {goals?.length > 0 ? (
        goals.map(({text, completed, id}, i) => (
          <GoalItem key={i} goal={text} completed={completed} id={id} />
        ))
      ) : (
        <Text style={styles.noGoals}>No Goals to show!</Text>
      )}
    </View>
  );
}

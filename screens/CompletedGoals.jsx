import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import GoalList from "../components/GoalList"

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    paddingVertical: "5%"
  },
});

const CompletedGoals = ({navigation}) => {
  const states = useSelector((state) => state.goal);

  return (
    <View style={styles.container}>
      <GoalList
        goals={states.completedGoals}
        completedList
      />
    </View>
  );
}

export default CompletedGoals;
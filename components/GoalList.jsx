import React from "react";
import { Text, StyleSheet, View, Switch } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleShowCompleted } from "../redux/actions";
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
  const dispatch = useDispatch();

  const showCompleted = useSelector((state) => state.goal)?.showCompleted;

  const handleSwitchChange = () => dispatch(toggleShowCompleted());

  const goalsToShow = !showCompleted
    ? goals.filter((el) => !el?.completed)
    : goals;
  return (
    <View style={styles.container}>
      {goals?.length > 0 ? (
        <>
          {goalsToShow.map(({ text, completed, id }, i) => (
            <GoalItem key={i} goal={text} completed={completed} id={id} />
          ))}
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Text style={{ fontSize: 16 }}>Show completed goals</Text>
            <Switch
              value={showCompleted}
              onChange={handleSwitchChange}
              style={{ transform: [{ scale: 1.15 }] }}
            />
          </View>
        </>
      ) : (
        <Text style={styles.noGoals}>No Goals to show!</Text>
      )}
    </View>
  );
}

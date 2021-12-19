import React, { useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  Switch,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearAllGoals, toggleShowCompleted } from "../redux/actions";
import GoalItem from "./GoalItem";
import { MaterialIcons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 600,
    borderRadius: 8,
    justifyContent: "space-between",
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

  const goalsToShow = !showCompleted
    ? goals.filter((el) => !el?.completed)
    : goals;

  const transformValues = goalsToShow.map(() => new Animated.Value(0));

  const startClearAnimation = (cb) => {
    Animated.stagger(
      100,
      transformValues.map((val) =>
        Animated.timing(val, {
          toValue: 150,
          duration: 200,
          useNativeDriver: true,
        })
      )
    ).start(() => cb?.());
  };

  const handleSwitchChange = () => dispatch(toggleShowCompleted());

  const handleClearALl = () => {
    startClearAnimation(() => dispatch(clearAllGoals()));
  };

  return (
    <View style={styles.container}>
      {goals?.length > 0 ? (
        <>
          <View>
            {goalsToShow.map(({ text, completed, id }, i) => (
              <Animated.View
                key={i}
                style={{
                  transform: [{ translateX: transformValues[i] }],
                  opacity: transformValues[i].interpolate({
                    inputRange: [0, 100],
                    outputRange: [1, 0],
                  }),
                }}
              >
                <GoalItem goal={text} completed={completed} id={id} />
              </Animated.View>
            ))}
            {goalsToShow?.length === 0 && (
              <View
                style={{
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Nunito_300Light",
                    fontStyle: "italic",
                    color: "#aaaaaa",
                    textAlign: "center",
                  }}
                >
                  All goals completed!!!
                </Text>
              </View>
            )}
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
          </View>
          <View
            style={{
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 8,
                paddingRight: 10,
                borderWidth: 1,
                borderRadius: 4,
                borderColor: "#990000",
                width: 110,
              }}
              onPress={handleClearALl}
            >
              <MaterialIcons name="clear-all" size={20} color={"#990000"} />
              <Text
                style={{
                  color: "#990000",
                  fontSize: 18,
                  fontFamily: "Nunito_400Regular",
                  marginLeft: 5,
                }}
              >
                Clear All
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.noGoals}>No Goals to show!</Text>
      )}
    </View>
  );
}

import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Switch,
  TouchableOpacity,
  Animated,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearCompletedGoals, deleteAllGoals } from "../redux/actions";
import GoalItem from "./GoalItem";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const styles = StyleSheet.create({
  container: {
    // minHeight: 500,
    borderRadius: 8,
    justifyContent: "space-between",
    flexShrink: 1,
    flexGrow: 1,
    marginTop: 20,
  },
  noGoals: {
    fontFamily: "Nunito_300Light",
    fontSize: 28,
    color: "#0000005e",
    fontStyle: "italic",
    textAlign: "center",
  },
});

const border = (color) => ({
  borderWidth: 1,
  borderColor: color ?? "black",
});

export default function ({ goals, completedList }) {
  const dispatch = useDispatch();

  const transformValues = goals.map(() => new Animated.Value(0));

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

  const handleClearALl = () => {
    if (!completedList) startClearAnimation(() => dispatch(deleteAllGoals()));
    else startClearAnimation(() => dispatch(clearCompletedGoals()));
  };

  return (
    <View style={[styles.container]}>
      {goals?.length > 0 ? (
        <>
          <SafeAreaView style={{ flexGrow: 1, flexShrink: 1}}>
            <FlatList
              data={goals}
              renderItem={({ item, index }) => (
                <Animated.View
                  style={{
                    marginTop: index > 0 ? 10 : 0,
                    transform: [{ translateX: transformValues[index] }],
                    opacity: transformValues[index].interpolate({
                      inputRange: [0, 100],
                      outputRange: [1, 0],
                    }),
                  }}
                >
                  <GoalItem
                    goal={item.text}
                    id={item.id}
                    completed={item.completedAt}
                  />
                </Animated.View>
              )}
            />
          </SafeAreaView>

          <TouchableOpacity
            style={{
              marginLeft: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 8,
              paddingRight: 10,
              borderWidth: 1,
              borderRadius: 4,
              borderColor: "#990000",
              marginTop: 10
            }}
            onPress={handleClearALl}
            activeOpacity={0.65}
          >
            {!completedList ? (
              <MaterialCommunityIcons
                name="delete-forever-outline"
                size={24}
                color={"#990000"}
              />
            ) : (
              <MaterialIcons name="remove-done" size={24} color={"#990000"} />
            )}

            <Text
              style={{
                color: "#990000",
                fontSize: 20,
                fontFamily: "Nunito_400Regular",
                marginLeft: 5,
              }}
            >
              {!completedList ? "Delete all" : "Clear All"}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View>
          <Text style={styles.noGoals}>
            {completedList ? "No Goals completed yet" : "No Goals to show!"}
          </Text>
          {!completedList && <Text style={styles.noGoals}>Start Now!</Text>}
        </View>
      )}
    </View>
  );
}

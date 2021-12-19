import React, { useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { deleteGoal, markGoalAsDone } from "../redux/actions";

const styles = StyleSheet.create({
  view: {
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
  },
  mainText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 20,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    flexDirection: "row",
  },
  dltBtn: {
    backgroundColor: "#d00000",
  },
  markBtn: {
    backgroundColor: "#2b9348",
  },
  icon: {
    fontSize: 18,
    color: "#fff",
  },
  text: {
    fontFamily: "Nunito_400Regular",
    color: "#fff",
    marginLeft: 5,
  },
  doneView: {
    backgroundColor: "#aaaaaa50",
  },
});

export default function GoalItem({ goal, completed, id }) {

  const dispatch = useDispatch();
  
  const transformAnim = useRef(new Animated.Value(0)).current

  const animateTransform = (cb) => {
    Animated.timing(transformAnim, {
      toValue: 100,
      duration: 200,
      useNativeDriver: true
    }).start(() => cb());
  }

  const handleDelete = () => {
    animateTransform(() => dispatch(deleteGoal(id)))
  };

  const handleMark = () => {
    dispatch(markGoalAsDone(id));
  };

  return (
    <>
      {!completed ? (
        <Animated.View
          style={{
            transform: [{translateX: transformAnim}],
            opacity: transformAnim.interpolate({
              inputRange: [0, 100],
              outputRange: [1, 0]
            })
          }}
        >
          <LinearGradient
            colors={["#e6e6fa", "#20b2aa"]}
            start={[0, 1]}
            end={[1, 0]}
            style={styles.view}
          >
            <View style={styles.flex}>
              <Text style={styles.mainText}>{goal}</Text>
            </View>
            <View style={[styles.flex, { marginTop: 10 }]}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.button, styles.dltBtn]}
                onPress={handleDelete}
              >
                <AntDesign name="delete" style={styles.icon} />
                {/* <Text style={styles.text}>Delete</Text> */}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.button, styles.markBtn]}
                onPress={handleMark}
              >
                <AntDesign name="check" style={styles.icon} />
                <Text style={styles.text}>Mark as Done</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>
      ) : (
        <Animated.View style={[styles.view, styles.doneView]}>
          <Text
            style={[
              styles.mainText,
              { textDecorationLine: "line-through" },
            ]}
          >
            {goal}
          </Text>
          <View style={[styles.flex, { justifyContent: "flex-end" }]}>
            <View style={styles.flex}>
              <AntDesign
                style={{ fontSize: 20, color: "#0000007e" }}
                name="check"
              />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: "#0000007e",
                  fontFamily: "Nunito_400Regular",
                  paddingVertical: 6
                }}
              >
                Done
              </Text>
            </View>
          </View>
        </Animated.View>
      )}
    </>
  );
}

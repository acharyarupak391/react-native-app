import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addGoal } from "../redux/actions";

export default function MyForm() {
  const [inputFocus, setInputFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const styles = StyleSheet.create({
    input: {
      borderBottomWidth: 1,
      borderColor: inputFocus || inputValue ? "#0000ff" : "#eee",
      backgroundColor: inputFocus || inputValue ? "#0000ff30" : "#eee",
      color: "#0000ff",
      padding: 5,
      fontSize: 15,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      width: "60%",
    },
    wrapper: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    btn: {
      padding: 10,
      paddingHorizontal: 25,
      borderRadius: 4,
      backgroundColor: inputValue ? "cyan" : "#aaaaaaa0",
      flexGrow: 1,
      marginLeft: 10,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    btnText: {
      fontSize: 18,
      fontFamily: "Nunito_600SemiBold",
      textAlign: "center",
      marginRight: 10,
    },
  });

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    if (inputValue) {
      dispatch(addGoal(inputValue));
      setInputValue("");
    }
  };

  const handleInputChange = (data) => setInputValue(data);

  return (
    <View style={styles.wrapper}>
      <TextInput
        onChangeText={handleInputChange}
        placeholder="Enter Goal!!!"
        style={styles.input}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        value={inputValue}
        onSubmitEditing={handleButtonClick} // {nativeEvent: {text}}
      />
      {/* <Button  title="Click Me" onPress={handleButtonClick} /> */}
      <TouchableOpacity
        style={styles.btn}
        onPress={handleButtonClick}
        activeOpacity={inputValue ? 0.5 : 1}
      >
        <Text style={styles.btnText}>Add</Text>
        <AntDesign name="plus" size={18} />
      </TouchableOpacity>
    </View>
  );
}

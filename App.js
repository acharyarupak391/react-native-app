import {
  useFonts,
  Nunito_300Light,
  Nunito_600SemiBold,
  Nunito_400Regular,
} from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";

import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CurrentGoals } from "./screens";
import CompletedGoals from "./screens/CompletedGoals";

const MyApp = () => {
  let [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_600SemiBold,
    Nunito_400Regular,
  });

  const GoalStack = createStackNavigator();

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <GoalStack.Navigator>
          <GoalStack.Screen
            name="currentGoals"
            component={CurrentGoals}
            options={{
              title: "Your Goals",
              headerTitle: "Hello"
            }}
          />
          <GoalStack.Screen
            name="completedGoals"
            component={CompletedGoals}
            options={{
              title: "Completed Goals",
            }}
          />
        </GoalStack.Navigator>
      </NavigationContainer>
    );
  } else return <AppLoading />;
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MyApp />
      </PersistGate>
    </Provider>
  );
}

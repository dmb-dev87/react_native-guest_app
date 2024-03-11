import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/NavigationTypes";
import { useNavigation } from "@react-navigation/native";

const LoadingScreen = () => {
  const { loading, loggedIn } = useContext(AuthContext);

  const navigation =  useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (loggedIn) {      
      navigation.replace("Logout");
    } else if (loggedIn === false) {
      navigation.replace("Login");
    }
  }, [loggedIn]);

  return (
    <View style={styles.container}>
      {loading && (
        <React.Fragment>
          <ActivityIndicator size="large" />
          <View style={{ marginTop: 10 }}>
            <Text>Please wait...</Text>
          </View>
        </React.Fragment>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;

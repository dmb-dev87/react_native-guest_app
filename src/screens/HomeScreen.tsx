import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/NavigationTypes";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const { logout, loggedIn, userData } = useContext(AuthContext);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (loggedIn === false) {
      navigation.replace("Login");
    }
  }, [loggedIn]);

  return (
    <View style={styles.container}>
      {userData && (
        <View style={styles.userContainer}>
          <Image source={{ uri: userData.picture }} />
          <View style={styles.textContainer}>
            <Text>{userData.name}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity onPress={() => logout()}>
        <Text>
          Logout
        </Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 30,
    paddingLeft: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  userContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  textContainer: {
    marginTop: 10
  },
});

export default HomeScreen;
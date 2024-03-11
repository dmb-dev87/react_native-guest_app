import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/NavigationTypes";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const { loggedIn } = useContext(AuthContext);

  const navigation =  useNavigation<StackNavigationProp<RootStackParamList>>()

  useEffect(() => {
    if (loggedIn) {
      navigation.replace("Logout");
    }
  }, [loggedIn]);

  const { login } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.appTitle}>Guest App</Text>
      </View>

      <View>
        <TouchableOpacity style={styles.signInButton} onPress={()=>login()}>
          <Text style={styles.signInButtonText}>Get Started</Text>
        </TouchableOpacity>
        <Text style={[{textAlign: 'center'}]}>
          By continuing you agree to our
        </Text>
        <Text style={[{textAlign: 'center'}]}>
          Terms of Service and Privacy Policy
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 30,
  },
  titleView: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    color: "black",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: 'center',
  },
  appTitle: {
    color: "black",
    fontSize: 48,
    fontWeight: "800",
    marginBottom: 30,
    textAlign: 'center',
  },
  signInButton: {
    borderColor: "#e1e7ee",
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,    
  },
  signInButtonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
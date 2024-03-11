import React, { useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/NavigationTypes";
import { useNavigation } from "@react-navigation/native";

const LogoutScreen = () => {
  const { logout, loggedIn, userData } = useContext(AuthContext);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (!loggedIn) {
      navigation.replace("Login");
    }
  }, [loggedIn]);

  return (
    <View style={styles.container}>
      <View style={styles.profileView}>
        <Image
          style={styles.profileImage}
          source={{uri: userData.picture}} />
        <Text style={styles.username}>{userData.name}</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.logoutButton} onPress={()=>logout()}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 30,
    backgroundColor: 'white',
  },
  profileView: {
    flex: 1,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  username: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',    
    marginTop: 15,
  },
  logoutButton: {
    borderColor: "#e1e7ee",
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    width: '100%',
    alignSelf: 'stretch',
  },
  logoutButtonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LogoutScreen;
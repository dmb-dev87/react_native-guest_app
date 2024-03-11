import React, { useEffect, useState } from "react";
import Auth0, { useAuth0 } from "react-native-auth0";
import { jwtDecode } from "jwt-decode";
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from "@env";
import SInfo from "react-native-sensitive-info";
import "core-js/stable/atob";

const auth0 = new Auth0({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
});

const AuthContext = React.createContext();

const AuthContextProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);

  const getUserData = async (id) => {
    const idToken = id ? id : await SInfo.getItem('guest_app_token', {});
    const payload = jwtDecode(idToken);
    const { name, picture, exp } = jwtDecode(idToken);

    if (exp < Date.now() / 1000) {
      throw new Error("ID token expired!");
    }

    return {
      name,
      picture,
    };
  };

  useEffect(() => {
    (async () => {
      try {
        const user_data = await getUserData();
        if (user_data) {
          setLoggedIn(true);
          setUserData(user_data);
        }
      } catch (err) {
        setLoggedIn(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (loggedIn) {
          const user_data = await getUserData();
          if (user_data) {
            setLoggedIn(true);
            setUserData(user_data);
          }
        }
      } catch (err) {
        alert('Error logging in');
      }
    })();
  }, [loggedIn]);

  const login = async () => {
    try {
      const credentials = await auth0.webAuth.authorize(
        { additionalParameters: { prompt: 'login' } },
        { ephemeralSession: true }
      );
      await SInfo.setItem('guest_app_token', credentials.idToken, {});
      const user_data = await getUserData(credentials.idToken);
      setLoggedIn(true);
      setUserData(user_data);
    } catch (err) {
      console.log(err);
      alert('Error logging in');
    }
  };

  const logout = async () => {
    try {
      await SInfo.deleteItem('guest_app_token', {});
      setLoggedIn(false);
      setUserData(null);
    } catch (err) {
      console.log(err)
      alert('Error logging out');
    }
  };

  const value = {
    loading,
    loggedIn,
    login,
    logout,
    userData,
  };
    
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import AppButton from "../components/AppButton";
import Colors from "../utils/colors";
import useStatusBar from "../hooks/useStatusBar";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native";

import {
  loginWithEmail,
  registerWithEmail,
} from "../components/Firebase/firebase";

export default function WelcomeScreen({ navigation }) {
  const [text, setText] = useState("");
  const [Mode, setMode] = useState("signUp");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmedPassword, setConfirmedPassword] = useState("");

  useStatusBar("light-content");

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          source={require("../assets/logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.tabsContainer}>
        <View style={styles.tabHeader}>
          <TouchableOpacity onPress={() => setMode("signUp")}>
            <View>
              <Text
                style={{
                  color: Mode === "signUp" ? "black" : "grey",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Registrate
              </Text>
              {Mode === "signUp" && (
                <View
                  style={{
                    width: 70,
                    height: 3,
                    backgroundColor: Colors.primary,
                    borderRadius: 30,
                  }}
                ></View>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMode("login")}>
            <View>
              <Text
                style={{
                  color: Mode === "login" ? "black" : "grey",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Ingresa
              </Text>
              {Mode === "login" && (
                <View
                  style={{
                    width: 70,
                    height: 3,
                    backgroundColor: Colors.primary,
                    borderRadius: 30,
                  }}
                ></View>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.tabContent}>
          <View style={{ height: 40, marginVertical: 0, width: "90%" }}>
            <TextInput
              left={<TextInput.Icon name="email" />}
              dense
              selectionColor={Colors.primary}
              mode="outlined"
              label="Email"
              value={Email}
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
          </View>
          <View style={{ height: 40, marginVertical: 20, width: "90%" }}>
            <TextInput
              left={<TextInput.Icon name="key" />}
              secureTextEntry
              dense
              selectionColor={Colors.primary}
              mode="outlined"
              label="Contraseña"
              value={Password}
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
          </View>
          {Mode === "signUp" && (
            <View style={{ height: 40, width: "90%" }}>
              <TextInput
                left={<TextInput.Icon name="key" />}
                secureTextEntry
                dense
                selectionColor={Colors.primary}
                mode="outlined"
                label="Confirmar Contraseña"
                value={ConfirmedPassword}
                onChangeText={(text) => setConfirmedPassword(text)}
              ></TextInput>
            </View>
          )}
        </View>
        <View style={{ bottom: -35 }}>
          <AppButton
            title={Mode === "signUp" ? "REGISTRATE" : "INGRESA"}
            color="primary"
            onPress={
              Mode === "login"
                ? () => loginWithEmail(Email, Password)
                : () => registerWithEmail(Email, Password)
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  tabHeader: {
    height: "15%",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#333333",
  },
  logoContainer: {
    position: "absolute",
    top: 80,
    alignItems: "center",
  },
  logo: {
    width: 220,
    height: 220,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "600",
    paddingVertical: 20,
    color: Colors.primary,
  },
  tabsContainer: {
    height: "55%",
    padding: 20,
    paddingBottom: 60,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

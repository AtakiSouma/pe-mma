import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
const HeaderComponent = ({ handleGoBack, handleGoHome }) => {
  return (
    <View
      style={{
        marginTop: 39,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={handleGoBack}>
        <AntDesign name="arrowleft" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGoHome}>
        <AntDesign name="home" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({});

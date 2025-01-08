import React, { memo } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

function Header() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/icons/logo.png")} />
      <Text style={styles.title}>TV Shows</Text>
      <Text style={styles.title}>Movies</Text>
      <Text style={styles.title}>My List</Text>
    </View>
  );
}

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
    marginTop: 20,
  },
  title: {
    color: "white",
    fontSize: 17,
  },
});

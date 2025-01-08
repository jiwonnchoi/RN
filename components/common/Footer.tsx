import React, { useState, memo } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

interface FooterProp {
  tab: number;
}

function Footer({ tab }: FooterProp) {
  const [isActive, setIsActive] = useState(tab); // 클릭하는 메뉴 id

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/icons/home.png")} />
      <Image source={require("../../assets/images/icons/search.png")} />
      <Image source={require("../../assets/images/icons/coming.png")} />
      <Image source={require("../../assets/images/icons/download.png")} />
      <Image source={require("../../assets/images/icons/more.png")} />
    </View>
  );
}

export default memo(Footer);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    backgroundColor: "black",
    padding: 30,
  },
});

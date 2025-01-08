import { Stack } from "expo-router";
//import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="detail" options={{ title: "Detail" }} />
    </Stack>
  );
}

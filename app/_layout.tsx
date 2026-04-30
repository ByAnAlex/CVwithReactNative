import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "ios_from_right",
        animationDuration: 520,
        gestureEnabled: true,
        contentStyle: { backgroundColor: "#040b16" },
      }}
    />
  );
}

import React from "react";
import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";
import { LightTheme, DarkTheme } from "./src/theme";
import App from "./App";

export default function App() {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

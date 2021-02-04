import React from "react";

import Providers from "./navigation";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <Providers />
    </PaperProvider>
  );
}

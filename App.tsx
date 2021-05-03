import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "react-query";
import * as Linking from "expo-linking";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import ContextProviders from "./src/context/providers";

const client = new QueryClient();

Linking.addEventListener("url", ({ url }) => {
  let { path } = Linking.parse(url);
  if (path) {
    // console.log(url);
    // Linking.openURL(path);
    // Linking.openURL(url);
  }
  console.log("from eventListiner: ", url);
});

Linking.getInitialURL().then((url) => {
  console.log("from getIntitial: ", url);
  if (url) {
    // Linking.openURL(url);
  }
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  // const url = Linking.makeUrl("https://suristore.web.app");

  // React.useEffect(() => {});

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar style={"auto"} />
        <QueryClientProvider client={client}>
          <ContextProviders>
            <Navigation colorScheme={colorScheme} />
          </ContextProviders>
        </QueryClientProvider>
      </SafeAreaProvider>
    );
  }
}

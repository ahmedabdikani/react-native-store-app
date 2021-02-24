import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "react-query";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import ContextProviders from "./src/context/Providers";

const client = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

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

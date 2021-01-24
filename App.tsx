import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "react-query";
import CartContextProvider from "./Context/CartContext";

import UserContextProvider from "./Context/User";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

const client = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <QueryClientProvider client={client}>
          <UserContextProvider>
            <CartContextProvider>
              <StatusBar style={"auto"} />
              <Navigation colorScheme={colorScheme} />
            </CartContextProvider>
          </UserContextProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    );
  }
}

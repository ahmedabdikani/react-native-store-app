import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "react-query";
import { CartProvider } from "./context/CartContext";

import { AuthProvider } from "./context/AuthContext";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { ChatProvier } from "./context/ChatContext";

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
          <AuthProvider>
            <CartProvider>
              <ChatProvier>
                <StatusBar style={"auto"} />
                <Navigation colorScheme={colorScheme} />
              </ChatProvier>
            </CartProvider>
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    );
  }
}

import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "react-query";
import { CartProvider } from "./Context/CartContext";

import { AuthProvider } from "./Context/AuthContext";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { ChatProvier } from "./Context/ChatContext";

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

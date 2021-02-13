import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "react-query";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { AuthProvider } from "./context/AuthContext";
import { ChatProvier } from "./context/ChatContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

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
          <AuthProvider>
            <ChatProvier>
              <ProductProvider>
                <CartProvider>
                  <Navigation colorScheme={colorScheme} />
                </CartProvider>
              </ProductProvider>
            </ChatProvier>
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    );
  }
}

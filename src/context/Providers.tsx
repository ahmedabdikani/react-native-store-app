import * as React from "react";

import { AuthProvider } from "./AuthContext";
import { ChatProvier } from "./ChatContext";
import { ProductProvider } from "./ProductContext";
import { CartProvider } from "./CartContext";

const ContextProviders: React.FC = ({ children }) => (
  <AuthProvider>
    <ChatProvier>
      <ProductProvider>
        <CartProvider>{children}</CartProvider>
      </ProductProvider>
    </ChatProvier>
  </AuthProvider>
);

export default ContextProviders;

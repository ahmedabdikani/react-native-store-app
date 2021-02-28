import * as React from "react";

import { AuthProvider } from "./AuthContext";
import { ChatProvier } from "./ChatContext";
import { ProductProvider } from "./ProductContext";
import { CartProvider } from "./CartContext";
import { LanguageProvider } from "./LanguageContex";

const ContextProviders: React.FC = ({ children }) => (
  <AuthProvider>
    <ChatProvier>
      <ProductProvider>
        <CartProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </CartProvider>
      </ProductProvider>
    </ChatProvier>
  </AuthProvider>
);

export default ContextProviders;

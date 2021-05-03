import * as React from "react";

import { AuthProvider } from "../auth/AuthContext";
import { ChatProvier } from "../chat/ChatContext";
import { ProductProvider } from "../product/ProductContext";
import { CartProvider } from "../cart/CartContext";
import { LanguageProvider } from "../language/LanguageContex";

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

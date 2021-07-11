import * as React from "react";

import { AuthProvider } from "../auth";
import { ChatProvier } from "../chat/ChatContext";
import { ProductProvider } from "../product";
import { CartProvider } from "../cart/CartContext";
import { FavorateProvider } from "../favorites";
import { LanguageProvider } from "../language/LanguageContex";

const ContextProviders: React.FC = ({ children }) => (
  <AuthProvider>
    <ChatProvier>
      <ProductProvider>
        <FavorateProvider>
          <CartProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </CartProvider>
        </FavorateProvider>
      </ProductProvider>
    </ChatProvier>
  </AuthProvider>
);

export default ContextProviders;

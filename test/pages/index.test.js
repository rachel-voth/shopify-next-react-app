import React from "react";
import Index from "../../pages/index";
import { ProductsContext } from "../../context/ProductsContext";
import { cleanup, render, screen, getByText } from "@testing-library/react";
import { PolarisTestProvider } from "@shopify/polaris";
import { Provider } from "@shopify/app-bridge-react";

const config = {
  apiKey: "12345",
  host: btoa("test.myshopify.com/admin"),
};

afterEach(cleanup);

describe("<Index />", () => {
  describe("when no product ids selected", () => {
    it("renders the empty state component", () => {
      const providerValue = {
        productIds: [],
        updateProductIds: jest.fn(),
      };
      render(
        <PolarisTestProvider>
          <Provider config={config}>
            <ProductsContext.Provider value={providerValue}>
              <Index />
            </ProductsContext.Provider>
          </Provider>
        </PolarisTestProvider>
      );
      expect(screen.getByText("Select products")).toBeDefined();
    });
  });
});

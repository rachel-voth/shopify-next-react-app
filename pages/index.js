import React, { useContext, useState } from "react";
import { Heading, Page, TextStyle, Layout, EmptyState } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import ResourceListWithProducts from "./components/ResourceList";
import { ProductsContext } from "../context/ProductsContext";

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

const Index = () => {
  // set up state variables and Products Context
  const [open, setOpen] = useState(false);
  const { productIds, updateProductIds } = useContext(ProductsContext);

  const handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    // update Products Context with newly selected product ids
    updateProductIds(idsFromResources);
    setOpen(false);
  };

  return (
    <Page>
      <TitleBar
        primaryAction={{
          content: "Select products",
          onAction: () => setOpen(true),
        }}
      />
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={open}
        onSelection={(resources) => handleSelection(resources)}
        onCancel={() => setOpen(false)}
      />
      {productIds.length > 0 ? (
        <ResourceListWithProducts ids={productIds} />
      ) : (
        <Layout>
          <EmptyState
            heading="Select your products"
            action={{
              content: "Select products",
              onAction: () => setOpen(true),
            }}
            image={img}
          >
            <p>Select products to change their price temporarily.</p>
          </EmptyState>
        </Layout>
      )}
    </Page>
  );
};

export default Index;

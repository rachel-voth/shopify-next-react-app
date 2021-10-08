import React, { useContext } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
  Card,
  ResourceList,
  Stack,
  TextStyle,
  Thumbnail,
} from "@shopify/polaris";

// GraphQL query to retrieve products by IDs.
// The price field belongs to the variants object because
// variations of a product can have different prices.
const GET_PRODUCTS_BY_ID = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title

        handle

        descriptionHtml

        id

        images(first: 1) {
          edges {
            node {
              originalSrc

              altText
            }
          }
        }

        variants(first: 1) {
          edges {
            node {
              price

              id
            }
          }
        }
      }
    }
  }
`;

// original tutorial used store-js to get the ids
// now we are passing them in as a prop after getting them from Products Context
const ResourceListWithProducts = ({ ids }) => {
  return (
    // GraphQL query to retrieve products and their prices
    <Query query={GET_PRODUCTS_BY_ID} variables={{ ids: ids }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading…</div>;
        if (error) return <div>{error.message}</div>;

        return (
          <Card>
            <ResourceList
              showHeader
              resourceName={{ singular: "Product", plural: "Products" }}
              items={data.nodes}
              renderItem={(item) => {
                const media = (
                  <Thumbnail
                    source={
                      item.images.edges[0]
                        ? item.images.edges[0].node.originalSrc
                        : ""
                    }
                    alt={
                      item.images.edges[0]
                        ? item.images.edges[0].node.altText
                        : ""
                    }
                  />
                );
                const price = item.variants.edges[0].node.price;
                return (
                  <ResourceList.Item
                    id={item.id}
                    media={media}
                    accessibilityLabel={`View details for ${item.title}`}
                    onClick={() => {
                      // not doing anything here yet
                      console.log("on click");
                    }}
                  >
                    <Stack>
                      <Stack.Item fill>
                        <h3>
                          <TextStyle variation="strong">{item.title}</TextStyle>
                        </h3>
                      </Stack.Item>
                      <Stack.Item>
                        <p>${price}</p>
                      </Stack.Item>
                    </Stack>
                  </ResourceList.Item>
                );
              }}
            />
          </Card>
        );
      }}
    </Query>
  );
};

export default ResourceListWithProducts;

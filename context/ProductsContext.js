import React, { createContext } from "react";

// const productContextObject = {
//   productIds: ["1", "2"],
//   udpateProductIds: () => {
//     console.log("update");
//   },
// };

export const ProductsContext = React.createContext({});
export const ProductsProvider = ProductsContext.Provider;

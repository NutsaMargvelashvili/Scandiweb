import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import React from "react";

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});


export const getCategories = async () => {
  const result = await client
    .query({
      query: gql`
    query{
    categories{
      name,
      products {
        name,
        id,
        inStock,
        gallery,
        description,
        category,
        brand,
        prices {
          amount,
          currency{
              label,
              symbol
          }
        }
      }
    }
  }

    `,
    })

  return result.data.categories
}

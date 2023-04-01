import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import React from "react";
import category from "../modules/Category";

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
          name
        }
      }`,
    })

  return result.data.categories
}

export const getProductByID = async (id: string) => {
  const result = await client.query({
    query: gql`
      query {
        product(id: "${id}") {
          name
          id
          inStock
          gallery
          description
          category
          attributes {
           name
           type
           items {
              displayValue
              value
              id
            }
          }
          prices {
            currency {
              symbol
              label
            }
            amount
          }
          brand
        }
      }`
  })
  return result.data.product
}
export const getProductsByCategory = async (category: string) => {
  const result = await client.query({
    query: gql`
      query {
      category(input: {title :"${category}"}) {
        name
        products {
          name
          id
          inStock
            attributes {
           name
           type
           items {
              displayValue
              value
              id
            }
          }
          prices {
            currency {
              symbol
              label
            }
            amount
          }
          gallery
          prices { 
          currency {
            symbol
            label
          }
          amount
         }
        }
      }
    }`
  })
  return result.data.category
}
export const getCurrencies = async () => {
  const result = await client.query({
    query: gql`
    query {
      currencies {
        symbol
        label
      }
    }`
  })
  return result.data.currencies
}

import { gql } from "@apollo/client";

export const getAllColors = gql`
  query Query {
    colors {
      id
      hex
      name
    }
}`
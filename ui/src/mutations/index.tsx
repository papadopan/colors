import { gql } from '@apollo/client';

export const ADD_NEW_COLOR = gql`
  mutation AddNewColor($hex: String!, $name: String!) {
    addNewColor(hex: $hex, name: $name) {
      id
      name
      hex
    }
  }
`;
export const DELETE_COLOR = gql`
  mutation DeleteColor($name: String!) {
    deleteColor(name: $name) {
      id
      name
      hex
    }
  }
`;
export const UPDATE_COLOR = gql`
  mutation UpdateColor($name: String!, $hex: String!) {
    updateColor(name: $name, hex: $hex) {
      id
      name
      hex
    }
  }
`;

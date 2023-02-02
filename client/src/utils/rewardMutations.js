import { gql } from "@apollo/client";

export const CREATE_REWARD = gql`
    mutation createReward($_idAdmin: String!, $name: String!, $cost: Int) {
        createReward(_idAdmin: $_idAdmin, name: $name, cost: $cost) {
            _id
            name
            cost
        }
    }
`;

export const UPDATE_REWARD = gql`
    mutation updateReward($_id: String!, $name: String!, $cost: Int!) {
        updateReward(_id: $_id, name: $name, cost: $cost) {
            _id
            name
            cost
        }
    }
`;

export const DELETE_REWARD = gql`
    mutation deleteReward($_id: String!) {
        deleteReward(_id: $_id) {
            _id
        }
    }
`;
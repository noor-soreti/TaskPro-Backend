const { gql } = require('apollo-server-express')

const typeDefs = gql`
    # Types
        type User {
            _id : ID
            email: String!
            password: String!
            firstname: String!
            lastname: String!
        }

    # Query
        type Query {
            getAllUsers: [User!]!
            login(email: String!, password: String!): User
        }

    # Mutation
    type Mutation {
        register(
            email: String!
            password: String!
            firstname: String!
            lastname: String!
        ): User
    }
`

module.exports = { typeDefs }

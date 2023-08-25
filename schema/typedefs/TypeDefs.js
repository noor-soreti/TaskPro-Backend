import { gql } from "apollo-server-express";

/* 
task: [Task!]!   
 [] -> indicates this field represents a list or array of items
 Task! -> type of each item if list/array and (!) indicates each item is non-nullable (list itself can be empty but each task should be valid)
 ! -> list itself is non-nullable
*/

export const typeDefs = gql`
    # Types
        type User {
            _id : ID!
            email: String!
            task: [Task!]! 
        } 
        type Task {
            _id: ID!
            title: String!
            dueDate: String
            setDate: String!
            priority: Int
            owner: User!
        }
        type AuthPayload {
            user: User
        }

    # Query
        type Query {
            loginUser(email: String!, password: String!): AuthPayload
            logoutUser: Boolean
        }

    # Mutation
    type Mutation {
        createTask(
            id: ID!, 
            title: String!, 
            dueDate: String, 
            setDate: String!, 
            priority: Int
        ): Task
        registerUser(
            email: String!, 
            password: String!
        ): AuthPayload
    }
`
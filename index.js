import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone' // using startStandaloneServer to create standalone GraphQL server that does not require external web framework Express (whereas using applyMiddleware is used when integrating Apollo Server w/ existing Express.js app)
import { typeDefs } from "./schema/typedefs/TypeDefs.js";
import { resolvers } from './schema/resolver/Resolvers.js'
import 'firebase/app'
import dotenv from 'dotenv/config'

import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";

import { getAuth, onAuthStateChanged } from 'firebase/auth'


// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth();


const server = new ApolloServer({
    typeDefs,
    resolvers,
})


await startStandaloneServer(server, {
    port: 4000,
    context: async () => {
        let currentUser = auth.currentUser
        if (currentUser !== null) {
            console.log(currentUser.email);
        } else {
            // console.log("NULL");
        }

        return { db, auth, currentUser }
    }

});


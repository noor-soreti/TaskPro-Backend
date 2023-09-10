import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone' // using startStandaloneServer to create standalone GraphQL server that does not require external web framework Express (whereas using applyMiddleware is used when integrating Apollo Server w/ existing Express.js app)
import { typeDefs } from "./schema/typedefs/TypeDefs.js";
import { resolvers } from './schema/resolver/Resolvers.js'
import 'firebase/app'
import dotenv from 'dotenv/config'

import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";

import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { expressApp } from './app.js'

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

const getCurrentUser = async () => {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user ? user.uid : null);
        });
    });
}

await startStandaloneServer(server, {
    port: 8000,
    context: async ({ req, res }) => {
        let currentUser = await getCurrentUser()
        // console.log(currentUser);
        const token = req.headers.authorization || ''

        return { db, auth, currentUser }

    }

});


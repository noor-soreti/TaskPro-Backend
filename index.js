// import { ApolloServer } from '@apollo/server'
// import { typeDefs } from "./schema/typedefs/TypeDefs.js";
// import { resolvers } from './schema/resolver/Resolvers.js'

// import { startStandaloneServer } from '@apollo/server/standalone'
// const server = new ApolloServer({ typeDefs, resolvers })




// const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
// });

// console.log(`🚀  Server ready at: ${url}`);


import { ApolloServer } from 'apollo-server'
import { startStandaloneServer } from '@apollo/server/standalone' // using startStandaloneServer to create standalone GraphQL server that does not require external web framework Express (whereas using applyMiddleware is used when integrating Apollo Server w/ existing Express.js app)
import { typeDefs } from "./schema/typedefs/TypeDefs.js";
import { resolvers } from './schema/resolver/Resolvers.js'
import 'firebase/app'
import express from 'express'

import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import 'firebase/auth'

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAl233ZhHVEVDcUx4CzPKf4rQB7N6khSp0",
    authDomain: "react-app-dd4a6.firebaseapp.com",
    projectId: "react-app-dd4a6",
    storageBucket: "react-app-dd4a6.appspot.com",
    messagingSenderId: "225505533450",
    appId: "1:225505533450:web:908c276e0b3351185cc9f3",
    measurementId: "G-41TPEHLX5J"
};

const firebaseApp = initializeApp(firebaseConfig)
const firestore = getFirestore(firebaseApp)

const server = new ApolloServer({
    typeDefs,
    resolvers,

})

const app = express()
startStandaloneServer(server, {port: 4000})



const { ApolloServer } = require('apollo-server-express')
const { typeDefs } = require('./typedefs/TypeDefs')
const { resolvers } = require('./resolver/Resolvers')
const express = require('express')
const app = express()
const server = new ApolloServer({ typeDefs, resolvers })

const port = 3000

server.start().then(res => {
    server.applyMiddleware({ app });
    app.listen({ port }, () =>
        console.log(`Gateway API running at port: localhost:${port}${server.graphqlPath}`)
    );
});

// // Passing an ApolloServer instance to the `startStandaloneServer` function:
// //  1. creates an Express app
// //  2. installs your ApolloServer instance as middleware
// //  3. prepares your app to handle incoming requests
// const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
// });

// console.log(`🚀  Server ready at: ${url}`);
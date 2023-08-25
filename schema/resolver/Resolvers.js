// import { initializeApp } from 'firebase/app'
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyAl233ZhHVEVDcUx4CzPKf4rQB7N6khSp0",
//     authDomain: "react-app-dd4a6.firebaseapp.com",
//     projectId: "react-app-dd4a6",
//     storageBucket: "react-app-dd4a6.appspot.com",
//     messagingSenderId: "225505533450",
//     appId: "1:225505533450:web:908c276e0b3351185cc9f3",
//     measurementId: "G-41TPEHLX5J"
// };

// Resolvers define how to fetch the types defined in your schema.
export const resolvers = {
    Query: {
        loginUser: async (_, { email, password }) => {
            const user = await User.find({ email: email, password: password })
            console.log(user[0])
            return user[0]
        },
        logoutUser: (_) => {
            return true
        }
    },
    Mutation: {
        registerUser: async (_, { email, password }) => {
            const newUser = new User({ email: email, password: password })

            return new Promise((resolve, reject) => {
                newUser.save((err) => {
                    if (err) {
                        reject(err)
                    } else resolve(newUser)
                })
            })
        }
    }
}

// module.exports = { resolvers }
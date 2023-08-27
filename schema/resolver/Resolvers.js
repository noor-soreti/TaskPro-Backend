import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export const resolvers = {
    Query: {
        loginUser: async (_, { email, password }, context) => {
            const { auth, db } = context;
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Access user properties from 'user' and return an AuthPayload
                return {
                    user: {
                        _id: user.uid,
                        email: user.email,
                        // Add other user properties here
                    }
                };
            } catch (error) {
                console.error('Login error:', error.message);
                throw new Error('Unable to log in.');
            }




        },
        logoutUser: (_) => {
            return true
        }
    },
    Mutation: {
        registerUser: async (_, { email, password }, context) => {
            const { auth, currentUser } = context
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user
                }).catch((e) => {
                    console.log("e");
                })


        }
    }
}


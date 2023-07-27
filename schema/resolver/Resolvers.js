const { User } = require('../../model/User')

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
    Query: {
        getAllUsers: async (root) => {
            const user = await User.find({})
            return user;
        },
        login: async (root, { email, password }) => {
            const user = await User.find({ email: email, password: password })
            console.log(user[0])
            return user[0]
        }
    },
    Mutation: {
        register: async (root, { email, password, firstname, lastname }) => {
            const newUser = new User({ email: email, password: password, firstname, firstname, lastname: lastname })

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

module.exports = { resolvers }
import { collection, query, where, getDocs, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export const resolvers = {
    Query: {
        loginUser: async (_, { email, password }, context) => {
            const { auth } = context;
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                return {
                    user: {
                        _id: user.uid,
                        email: user.email,
                        password: "user.password"
                    }
                };
            } catch (e) {
                console.error('Login error:', e.message);
                throw new Error('Unable to log in.');
            }

        },
        getTasks: async (_, args, context) => {

            const { db, currentUser } = context

            try {
                let taskList = new Array()

                const q = query(collection(db, "tasks"), where("ownerId", "==", currentUser));
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {
                    let newDoc = doc.data()
                    newDoc.uid = doc.id
                    taskList.push(newDoc)
                });
                console.log(taskList);
                return taskList
            } catch (e) {
                console.log(e.message);
            }
        },
        currentUser: (_, args, context) => {
            const { currentUser } = context
            return currentUser
        },
        signOut: (_, context) => {
            const { auth } = context;
            console.log(auth);
            console.log("signOut");
            signOut(auth)
            return true
        },
        testQuery: (_, args, context) => {
            console.log("TEST QUERY");
            return "testQuery"
        }
    },
    Mutation: {
        registerUser: async (_, { email, password }, context) => {
            const { auth } = context
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                return true

            } catch (e) {
                console.error('Registration error:', e.message);
                throw new Error('Registration error:', e.message);
            }
        },
        addTask: async (_, { title, dueDate, setDate, priority }, context) => {
            const { db, currentUser } = context

            const task = {
                title: title,
                dueDate: dueDate ? dueDate : null,
                setDate: setDate,
                priority: priority ? priority : 1,
                ownerId: currentUser
            }

            try {
                const newTaksRef = doc(collection(db, "tasks"))
                await setDoc(newTaksRef, task)
                return task
            } catch (e) {
                console.log("Create task error:", e.message);
            }
        },
        updateTask: async (_, { id, title, dueDate, setDate, priority }, context) => {
            const { db, currentUser } = context

            try {
                const docRef = doc(db, "tasks", "hGn8TUbTrPK1UfILgeR4")
                const awaitDoc = await updateDoc(docRef, {
                    title: title,
                    dueDate: dueDate ? dueDate : null,
                    setDate: setDate,
                    priority: priority ? priority : 1,
                    ownerId: currentUser
                })

            } catch (e) {
                console.log("updateTask() ERROR : ", e.message);
            }

        },
        deleteTask: async (_, { id }, context) => {
            const { db } = context
            try {
                await deleteDoc(doc(db, "tasks", id))
                return true
            } catch (e) {
                console.log("deleteTask() ERROR : ", e.message);
                return false
            }
        }

    }
}


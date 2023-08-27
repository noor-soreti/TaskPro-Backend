import { onAuthStateChanged, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth();
export const user = auth.currentUser;

onAuthStateChanged(auth, (user) => {
    if (user != null) {
        console.log(user);
    } else {
        console.log("null");
    }
})

if (user !== null) {
    user.providerData.forEach((profile) => {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
    });
}


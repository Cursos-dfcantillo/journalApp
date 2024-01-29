import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword
} from "firebase/auth";
import { FirebaseAuth } from "./config";
import { AuthState } from "../store/auth";


const googleProvider = new GoogleAuthProvider();


export const singnInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credential:any = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        // The signed-in user info.
        const { displayName, email, photoURL, uid } = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        return {
            ok: true,
            displayName, email, photoURL, uid
        }

    } catch (error: any) {
        return {
            ok: false,
            error: error.message
        }
    }
}


export const registerUserWithEmailPassword = async (data: AuthState) => {
    try {
        const {displayName,email ="",password=""} = data;

        const response = await createUserWithEmailAndPassword(FirebaseAuth,email,password);
        ///Actualizar el displayName
        if(FirebaseAuth.currentUser){
           await  updateProfile(FirebaseAuth.currentUser,{displayName});
        }
        const {uid,photoURL} = response.user;
        return {
            ok: true,
            displayName,email,photoURL,uid
        }
    } catch (error: any) {
        return {
            ok: false,
            error: error.message
        }
    }

}



export const loginWithEmailPassword = async (email:string, password:string) => {
    try {
        const response = await signInWithEmailAndPassword(FirebaseAuth,email,password);
        const {uid,photoURL,displayName} = response.user;
        return{
            ok: true,
            uid,photoURL,displayName
        }
    } catch (error:any) {
        return {
            ok: false,
            error: error.message
        }
    }
}





export const logoutFirebase = async () => {

    return await FirebaseAuth.signOut();
}

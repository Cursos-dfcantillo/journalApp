import { Dispatch } from "@reduxjs/toolkit"
import { checkingCredentials, login, logout } from ".."
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singnInWithGoogle } from "../../../firebase/firebaseServices"
import { useSweealert } from "../../../hooks"
import { clearNotesLogout } from "../../journal"

export const checkingAuthentication = () => {
    return async (dispatch: Dispatch)=>{
        dispatch(checkingCredentials())

    }
}

export const startGoogleSignIn = () => {
    return async (dispatch: Dispatch) => {
        dispatch(checkingCredentials())
        const result = await singnInWithGoogle();
        if(!result.ok) return dispatch(logout(result?.error));

        dispatch(login(result));
        
    }
}

export const startCretingUserWithEmailPassword = (auth: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(checkingCredentials())
        const result = await registerUserWithEmailPassword(auth);
        const {showSwal} = useSweealert();
        
        if(!result.ok){
            const message = result.error ==="Firebase: Error (auth/email-already-in-use)." ? "Usuario ya existe": result.error;
            if(result?.error)showSwal("Mensaje",message);
             return dispatch(logout(result?.error))
        };
        dispatch(login(result));
        
    }
}

export const startLoginWithEmailPassword = (email:string,password:string) => {
    return async (dispatch: Dispatch)=>{
        dispatch(checkingCredentials());
        const result = await loginWithEmailPassword(email,password);
        if(!result.ok){
            const {showSwal} = useSweealert();
            const message = result.error ==="Firebase: Error (auth/invalid-credential)." ? "Correo o contraseña incorrectos": result.error;
            if(result?.error)showSwal("Mensaje",message);
             return dispatch(logout(result?.error))
        };

        dispatch(login(result));
        
    }
}


export const startLogoutFirebase = () => {
    return async (dispatch: Dispatch)=>{
        await logoutFirebase();
        dispatch(logout(null));
        dispatch(clearNotesLogout());
        
    }
}
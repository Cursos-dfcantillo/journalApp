import  { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '.';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';
import { startLoadingNotes } from '../store/journal';

export const useStatusFirebase = () => {
    const {status} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
      onAuthStateChanged(FirebaseAuth, (user)=>{
           if(!user) return dispatch(logout(""));
           const {email,displayName,photoURL,uid} = user;
           dispatch(login({email,displayName,photoURL,uid}))
           dispatch(startLoadingNotes());//Se obtienen las notas de firebase

            
      } )
      
    }, [])


    return{
        status
    }
    
}

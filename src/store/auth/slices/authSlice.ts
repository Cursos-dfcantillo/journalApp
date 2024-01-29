import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AuthState {
    status: string; //checking , not-authenticated, or authenticated
    uid?:string;
    email?: string; 
    displayName?: string;
    photoURL?: string;
    errorMessage?: string;
    password?: string;

}

const initialState: AuthState = {
      status: "checking",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state,  {payload}: PayloadAction<any>  ) => {
            state.status ="authenticated";
            state.displayName = payload?.displayName;
            state.uid = payload?.uid;
            state.email = payload?.email;
            state.photoURL = payload?.photoURL;
        },
        logout: (state,action: PayloadAction<any>)=>{
            state.status = "not-authenticated";
            state.uid = "";
            state.email= "";
            state.displayName= "";
            state.photoURL= "";
            state.errorMessage= action?.payload;
        },
        checkingCredentials: (state)=>{
            state.status = "checking";
        }
    }
});


// Action creators are generated for each case reducer function
export const { login,logout,checkingCredentials } = authSlice.actions;
import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from "../layout/AuthLayout";
import { useAppDispatch, useAppSelector, useForm } from "../../hooks";
import { FormEvent, useMemo } from "react";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";

const initialFormState ={
  email: "",
    password: ""
}

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const {status} = useAppSelector(state => state.auth);
  const {onInputChange, formState} = useForm(initialFormState);
  const isAuthenticated = useMemo(() => status === "checking", [status])

  
  const onLogin = (e:FormEvent) =>{
    e.preventDefault();
    const {email,password} = formState;
    dispatch(startLoginWithEmailPassword(email,password));
    if(status ==="authenticated"){
      // navigate("/",{replace:true});
    }
    // console.log(formState.email);
    //  navigate("/",{replace:true})
     
  }

  const onGoogleSignIn = () => {
    console.log("Google");
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={onLogin} className='animate__animated animate__fadeIn animate_faster'>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              name="email"
              onChange={onInputChange}
              placeholder='correo@google.com'
              value={formState?.email}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              name="password"
              onChange={onInputChange}
              value={formState?.password}
              placeholder='Contraseña'
              fullWidth
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button type="submit" variant='contained' fullWidth disabled={isAuthenticated}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant='contained' fullWidth onClick={onGoogleSignIn} disabled={isAuthenticated}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>


  )
}

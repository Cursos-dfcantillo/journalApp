import { FormEvent, useMemo, useState } from "react";
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Link as RouterLink } from 'react-router-dom';
import { FormValidation, useAppDispatch, useAppSelector, useForm } from "../../hooks";
import {  startCretingUserWithEmailPassword } from "../../store/auth";
import {isEmail} from 'validator';

const formValidations:FormValidation = {
  email: [(value:string )=> isEmail(value), 'El correo debe no es valido'],
  password: [(value:string )=>value.length >=6, 'El password debe tener más de 6 caracteres'],
  displayName: [(value:string )=>value.length >=1, 'El nombre es obligatorio'],
  
};

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const {status} = useAppSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === "checking", [status]);

  const  [formSubmitted, setFormSubmitted] = useState(false);
  
  const {formState,onInputChange,formValidation,isFormValid} = useForm({
    displayName: "",
    email: "",
    password: ""
  },formValidations)

  // useEffect(() => {
  //   if(errorMessage)
  //   showSwal("Mensaje",errorMessage);
  // }, [errorMessage])
  

  
  const onSubmit = (e:FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!isFormValid) return;
    
    dispatch(startCretingUserWithEmailPassword(formState))
    
    // console.log(formState);
  }
  return (
    <AuthLayout title="Crear Cuenta">
      <h1>FormValid :{isFormValid ? 'Valido': 'Invalido'}</h1>
     <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate_faster'>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                name="displayName"
                onChange={onInputChange}
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
                error={!!formValidation.displayNameValid && formSubmitted}
                helperText={formValidation.displayNameValid}
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                name="email"
                onChange={onInputChange}
                placeholder='correo@google.com' 
                fullWidth
                error={!!formValidation.emailValid && formSubmitted}
                helperText={formValidation.emailValid}
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                name="password"
                onChange={onInputChange}
                value={formState.password}
                placeholder='Contraseña' 
                fullWidth
                error={!!formValidation.passwordValid && formSubmitted}
                helperText={formValidation.passwordValid}
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button variant='contained' fullWidth type="submit" disabled={isCheckingAuthentication}>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}

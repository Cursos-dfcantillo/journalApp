import { Grid, Typography } from '@mui/material'
import React from 'react'
import { ChildrenComponent } from '../../interfaces/childrenComponent';

// Interfaz extendida
interface ChildrenComponentExtend extends ChildrenComponent {
    title: string;
}

export const AuthLayout: React.FC<ChildrenComponentExtend> = ({ children, title }) => {
    return (

        
        <Grid
        
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: "primary.main", padding: 4 }}
        >
            <Grid item className="box-shadow"
                xs={3}
                sx={{width:{sm:450}, backgroundColor: 'white', padding: 3, borderRadius: 2 }}
            >

                <Typography variant="h5" sx={{ mb: 1 }}>{title}</Typography>
                {/* //Componente Hijos */}
                {children}
            </Grid>
        </Grid>


    )
}

import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { startLogoutFirebase } from '../../store/auth'

export const Navbar: FC<{ drawerWidth?: number }> = ({ drawerWidth=240 }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const logout= () => {
        dispatch(startLogoutFirebase())
        navigate("auth/login",{replace: true})
    }
    return (
        <AppBar
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' noWrap component='div'> JournalApp </Typography>

                    <IconButton color='error' onClick={logout}>
                        <LogoutOutlined />
                    </IconButton>
                </Grid>

            </Toolbar>
        </AppBar>
    )
}

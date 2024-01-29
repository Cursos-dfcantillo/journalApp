import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { ChildrenComponent } from '../../interfaces/childrenComponent'
import { Navbar,SideBar } from '../components';

const drawerWidth = 248;
export const JournalLayout: React.FC<ChildrenComponent> = ({children}) => {
  return (
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate_faster'>

    <Navbar drawerWidth={ drawerWidth } />

    <SideBar drawerWidth={ drawerWidth } />

    <Box 
        component='main'
        sx={{ flexGrow: 1, p: 3 }}
    >
        <Toolbar />

        { children }
        
    </Box>
</Box>
  )
}

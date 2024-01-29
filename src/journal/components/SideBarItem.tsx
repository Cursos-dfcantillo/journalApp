import { FC, useMemo } from 'react'
import { Note, setActiveNote } from '../../store/journal'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import { useAppDispatch } from '../../hooks'

export const SideBarItem: FC<{ note: Note }> = ({ note }) => {
    const dispatch = useAppDispatch();
    const {title,body}= note;
    const newTitle = useMemo(() => {
        if(!title) return "";
        return title.length>17 ? `${title.substring(0,17)} ...`:title;
    }, [title]);

    const onSetNote = (note:Note)=>{
        dispatch(setActiveNote(note))

    }

    return (
        <ListItem  disablePadding className='animate__animated animate__fadeIn animate_faster'>
            <ListItemButton onClick={()=>onSetNote(note)}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}

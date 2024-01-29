import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../view"
import { AddOutlined } from "@mui/icons-material"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { startNewNote } from "../../store/journal"

export const JournalPage = () => {
  const dispatch = useAppDispatch();
  const {isSaving,active} = useAppSelector(state => state.journal);
  
  const onNewNote = () => {
    dispatch(startNewNote())
  }
  return (
    <JournalLayout>
      {!!active?.id ? <NoteView/> :<NothingSelectedView/>}

      <IconButton disabled={isSaving} onClick={onNewNote} size="large" sx={{color:"white",backgroundColor:"error.main", 
      ':hover':{backgroundColor:"error.main",opacity: 0.9}, position:"fixed", right:50, bottom:50}}>
        <AddOutlined sx={{fontSize:31}}/>
      </IconButton>
    </JournalLayout>

  )
}

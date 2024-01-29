import {  SaveOutlined, UploadFileOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components'
import { useAppSelector, useForm } from '../../hooks';
import { useNewNote } from './hooks/useNewNote';
import { useRef } from 'react';


export const NoteView = () => {
    const { active:note, messageSaved, isSaving } = useAppSelector(state => state.journal);
    const fileInputRef = useRef<any>();
    const { formState, onInputChange, setFormState } = useForm(note);
    const { dateTime,onDelete,onFileInputChagnge,onSaveNote }=  
     useNewNote(note , formState, setFormState,messageSaved);

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light' >{dateTime} </Typography>
            </Grid>
            <Grid item>
                <input type="file" multiple
                 ref={fileInputRef}
                    onChange={onFileInputChagnge}
                    style={{display:"none"}}
                />

            <IconButton color='primary'
            disabled={isSaving} onClick={() => fileInputRef.current.click()}>
                <UploadFileOutlined/>
            </IconButton>


                <Button disabled={isSaving} color="primary" sx={{ padding: 2 }} onClick={onSaveNote}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    name='title'
                    onChange={onInputChange}
                    value={formState?.title}
                    sx={{ border: 'none', mb: 1 }}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    name='body'
                    onChange={onInputChange}
                    value={formState.body}
                    minRows={5}
                />
            </Grid>

            <Grid container justifyContent="end">
                <Button onClick={onDelete} sx={{mt:2}} color='error'>
                    Borrar
                </Button>
            </Grid>

            {/* Image gallery */}
            <ImageGallery imageUrls={note?.imageUrls} />

        </Grid>
    )
}

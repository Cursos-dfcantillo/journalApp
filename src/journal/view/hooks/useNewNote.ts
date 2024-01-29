import { FormEvent, useEffect, useMemo } from "react";
import { Note, setActiveNote, startDeletingNote, startSavingNotes, startUploadingFiles } from "../../../store/journal";
import { useAppDispatch, useSweealert } from "../../../hooks";

const emptyNote:Note ={
    title: "", body: "", date: 0
}

export const useNewNote = (active:Note=emptyNote,formState:any,setFormState:Function,messageSaved:string) => {
    const dispatch = useAppDispatch();
    const dateTime= useMemo(() => {
        const date = new Date(active?.date ? active.date: new Date);
        const monthName = date.toLocaleString('es-ES', { month: 'long' });
        const hour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return `${date.getDate()} de ${monthName}, ${date.getFullYear()} -  ${hour}`;
    }, [active?.date])
   

    useEffect(() => {
        if(active) setFormState(active);
    }, [active])

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])

    useEffect(() => {
        if (messageSaved.length) {
            const { simpleAlert } = useSweealert();
            simpleAlert("Nota Actualizada", messageSaved, "success");
        }
    }, [messageSaved]);


    const onSaveNote = () => {
        dispatch(startSavingNotes());
    }

    const onFileInputChagnge = (event: FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        if(!target.files?.length) return;
        dispatch(startUploadingFiles(target?.files));
        
    }


    const onDelete = () => {
        dispatch(startDeletingNote());
    }



    
    return {
        dateTime,onSaveNote,onDelete,onFileInputChagnge
    }
  
}

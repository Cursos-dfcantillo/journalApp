import { Dispatch } from "@reduxjs/toolkit"
import { doc, collection, setDoc, deleteDoc } from "firebase/firestore/lite";
import { RootState } from "../store";
import { FirebaseDB } from "../../firebase/config";
import { Note, addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSavings, updateNote } from ".";
import { fileUpload, loadNotes } from "../../services";
import { useSweealert } from "../../hooks";


export const startNewNote = () => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(savingNewNote());//Se avisa cuando esta guardando.
        const { uid } = getState().auth
        const newNote: Note = {
            title: "",
            body: "",
            date: new Date().getTime(),
        }
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);
        newNote.id = newDoc.id;

        //Dispatch
        dispatch(addNewEmptyNote(newNote));
        // dispatch(activarNote)
        dispatch(setActiveNote(newNote));
    }
}


export const startLoadingNotes = () => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error("New id no exists");
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));

    }
}


export const startSavingNotes = () => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        const { uid } = getState().auth;
        dispatch(setSavings());
        const { active } = getState().journal;

        const noteToFirebase = { ...active };
        delete noteToFirebase.id;

        const docRef = doc(FirebaseDB, `/${uid}/journal/notes/${active?.id}`);
        await setDoc(docRef, noteToFirebase, { merge: true });
        active && dispatch(updateNote(active))

    }
}

export const startUploadingFiles = (files:FileList) => {
    return async (dispatch: Dispatch/*, getState: () => RootState*/) => {
        //const { uid } = getState().auth;
        // dispatch(updateNote(active))
        dispatch(setSavings());
        const fileUploadedPrmises = [];
        for (const file of files) {
            // const response =  await fileUpload(file);
            fileUploadedPrmises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadedPrmises)
        dispatch(setPhotosToActiveNote(photosUrls))
    }
}


export const startDeletingNote = () => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        const { uid } = getState().auth;
        const { active:note } = getState().journal;
        const {simpleAlert} = useSweealert();
        console.log({uid,note});
        const docRef = doc(FirebaseDB, `/${uid}/journal/notes/${note?.id}`);
        await deleteDoc(docRef);
        dispatch(deleteNoteById(note?.id|| ""))
        simpleAlert("Eliminación",`Nota: <strong>${note?.title}</strong> eliminada`,"success");
    }
}
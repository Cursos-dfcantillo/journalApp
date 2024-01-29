import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Note {
    id?: string,
    title?: string,
    body?: string,
    date?: number,
    imageUrls?: string[]
}
export interface JournalState {
    isSaving: boolean,
    messageSaved: string,
    notes: Note[],
    active?: Note
}

const initialState: JournalState = {
    isSaving: false,
    messageSaved: "",
    notes: []
}

const nullNote: Note = {
    body: "",
    title: "",
    id: "",
    date: 0,
    imageUrls: []
}

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action: PayloadAction<Note>) => {
            state.notes.push(action.payload);
            state.isSaving = false
        },
        setActiveNote: (state, action: PayloadAction<any>) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action: PayloadAction<Note[]>) => {
            state.notes = action.payload;
        },
        setSavings: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action: PayloadAction<Note>) => {
            state.isSaving = false;
            state.notes = state.notes.map((note) => {
                if (note.id === action.payload.id) {
                    return action.payload;
                }
                return note;
            });
            state.messageSaved = `<strong>${action.payload.title} </strong> actualizada correctemente`;
        },
        setPhotosToActiveNote: (state, action: PayloadAction<string[]>) => {
            if (state.active) {
                state.active.imageUrls = (state.active.imageUrls)
                    ? [...state.active?.imageUrls, ...action.payload]
                    : [...action.payload]
                state.isSaving = false;
            }
        },
        deleteNoteById: (state, action: PayloadAction<string>) => {
            state.active = nullNote;
            state.notes = state.notes.filter(note => note.id !== action.payload);
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = "";
            state.active = nullNote;
            state.notes = [];
        }

    }
});



// Action creators are generated for each case reducer function
export const { addNewEmptyNote, setActiveNote, setNotes
    , setSavings, updateNote, deleteNoteById, savingNewNote, setPhotosToActiveNote, clearNotesLogout } = journalSlice.actions;



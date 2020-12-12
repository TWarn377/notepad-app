import AsyncStorage from '@react-native-async-storage/async-storage';
import getClient from '../http/axios.instance';
import { NewNote, Note } from '../models/note';

export class NoteService {
    constructor () {
    }

    public static async getNotes(): Promise<Note[]> {
        try {
            const userId = await AsyncStorage.getItem('id');
            return (await (await getClient()).get(`/notes/${userId}`)).data as Note[];
        } catch (err) {
            console.error(err);
            throw err;
        }
    } 

    public static async addNote(note: NewNote) {
        try {
            (await (await getClient()).put(`/note`, note)).data
        } catch (err) {
            console.error(err);
        }
    }

    public static async deleteNote(note: Note) {
        try {
            return (await getClient()).delete(`/note`, { data: note })
        } catch (err) {
            console.error(err);
        }
    }
}
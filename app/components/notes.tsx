import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import colors from '../colors/colors';
import { Note } from '../models/note';
import { NoteService } from '../services/note-service';

const defaultNotes: Note[] = []; 

export default function Notes() {  
    const [loading, setLoading] = React.useState(true);
    const [notes , setNotes] = React.useState(defaultNotes);
    React.useEffect(() => {
        if(loading) {
            NoteService.getNotes().then(notes => {
                setNotes(notes);
                setLoading(false);
            });
        }
    });

    const deleteNote = async (note: Note) => {
        await NoteService.deleteNote(note);
    }
    
    return (
        <View style={styles.noteListContainer}>
            {notes.map(n => (
            <View key={`note-${n.id}`} style={styles.noteContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}> {n.title} </Text>
                    <Text style={styles.body}>{n.note}</Text>
                </View>

                <View style={styles.actionRow}>
                    <TouchableOpacity
                            style={styles.shareButton}
                            onPress={() => shareNote(n)}>
                    <Image style={styles.actionIcon} source={require('../assets/share-icon.png')}/>
                    </TouchableOpacity>
                    <View style={styles.coreActions}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => modifyCategories(n)}>
                        <Image style={styles.actionIcon} source={require('../assets/darkIcons/category-icon.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => modifyPeople(n)}>
                        <Image style={styles.actionIcon} source={require('../assets/darkIcons/people-icon.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={async () => await deleteNote(n)}>
                        <Image style={styles.actionIcon} source={require('../assets/darkIcons/trash-icon.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            ))}
        </View>

    );  
}

const shareNote = (note: Note) => {
    console.log('Share Note');
}

const modifyCategories = (note: Note) => {
    console.log('Modify Categories');
}

const modifyPeople = (note: Note) => {
    console.log('Modify People');
} 




const styles = StyleSheet.create ({
    actionButton: {
        marginHorizontal: 'auto',
        marginVertical: 10,
        padding: 5,
    },
    actionIcon: {
        width: 20,
        height: 20,
    },
    actionRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    body: {
        color: colors.font,
        fontSize: 14,
    },
    coreActions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 175,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: colors.highlight,
    },
    noteContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 225,
        margin: 10,
        borderRadius: 20,
        backgroundColor: colors.noteBackground,
    },
    noteListContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: '40%',
        width: '100%',
        overflow: 'scroll',
    },
    shareButton: {
        marginHorizontal: 'auto',
        marginVertical: 10,
        padding: 5,
    },
    textContainer: {
        padding: 5,
    },
    title: {
        color: colors.font,
        fontSize: 18,
    },
});

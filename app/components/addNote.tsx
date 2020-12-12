import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, View, TextInput, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import colors from "../colors/colors";
import { NewNote, Note } from "../models/note";
import { NoteService } from "../services/note-service";

const defaultCategories: string[] = [];



export default function AddNote ({ navigation }) {
    const [title, onTitleChange] = React.useState('');
    const [body, onBodyChange] = React.useState('');
    const [categories, onCategoriesChange] = React.useState(defaultCategories);
    const [newCatergory, onNewCategoryChange] = React.useState('');
    const [addingCategory, onAddingCategoryChange] = React.useState(categories.length === 0);

    const addCategory = (category: string) => {
        const index = categories.indexOf(category);
        if (index === -1) {
            categories.push(category); 
            onCategoriesChange(categories); 
            onAddingCategoryChange(!addingCategory);
        }
    };  

    const removeCategory = (category: string) => {
        const index = categories.indexOf(category);
        if (index !== -1) {
            categories.splice(index, 1);
            onCategoriesChange([...categories]);
        }
    };

    const addNote = async() => {
        try {
            const ownerEmail = await AsyncStorage.getItem('email');
            const owner: string = ownerEmail ? ownerEmail : '';

            if (owner) {
                const note: NewNote = {
                    id: 0,
                    title: title,
                    note: body,
                    categories: categories,
                    date_created: new Date(),
                    date_modified: new Date(),
                    type: 'note',
                    shared_users: [],
                    owner: owner
                };
                await NoteService.addNote(note);
                
                
            } else {
                throw Error('Unable to get account owner information');
            }
        } catch (err) {
            throw Error('An error occured when adding a note!');
        }
    };

    return (
        <View style={styles.addSection}>
            <TextInput 
                style={styles.titleInput} 
                onChangeText={text => onTitleChange(text)}
                value={title}
                placeholder="Title"/>

            <View>
            <TextInput 
                multiline
                style={styles.bodyInput}
                onChangeText={text => onBodyChange(text)}
                placeholder="Note"/>
            </View>
            
            <View style={categoryStyles.categoryLabelRow}>
                <View style={styles.label}>
                  <Image
                    style={styles.labelIcon} 
                    source={require('../assets/category-icon.png')}/>
                  <Text style={styles.labelText}>Categories:</Text>
                </View>

                <TouchableOpacity 
                    style={styles.label}
                    onPress={() => onAddingCategoryChange(!addingCategory)}>
                    <Image
                        style={styles.labelIcon}
                        source={require('../assets/add-icon.png')}/>
                    <Text style={styles.labelText}>Add Category</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal={true}
                bounces={true}
                contentContainerStyle={categoryStyles.categoryRow}>
                {addingCategory ?
                    <View style={categoryStyles.categoryInputRow}>
                        <TextInput
                            style={categoryStyles.categoryInput}
                            onChangeText={text => onNewCategoryChange(text)}
                            value={newCatergory}
                            placeholder="Let's get these sorted!"/>
                        <TouchableOpacity
                            style={categoryStyles.categoryInputButton}
                            onPress={() => onAddingCategoryChange(!addingCategory)}>
                            <Image style={categoryStyles.categoryLabelIcon} source={require('../assets/close-icon.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={categoryStyles.categoryInputButton}
                            onPress={() => addCategory(newCatergory)}>
                            <Image style={categoryStyles.categoryLabelIcon} source={require('../assets/done-icon.png')}/>
                        </TouchableOpacity>
                    </View> :
                    
                    !addingCategory && categories.map((c,i) => { return (
                    <View key={`category-${i}`} style={categoryStyles.categoryLabel}>
                        <Text style={categoryStyles.categoryLabelText}>{c}</Text>
                        <TouchableOpacity
                            onPress={() => removeCategory(c)}>
                            <Image
                                style={categoryStyles.categoryLabelIcon}
                                source={require('../assets/cancel-icon.png')}/>
                        </TouchableOpacity>
                    </View>
                )})}
            </ScrollView>
            <View style={styles.actionRow}>
                <View style={styles.actions}>
                    <Image style={styles.icon} source={require('../assets/event-icon.png')}/>
                    <Image style={styles.icon} source={require('../assets/time-icon.png')}/>
                    <Image style={styles.icon} source={require('../assets/people-icon.png')}/>
                </View>
                <View style={styles.addLabel}>
                    <TouchableOpacity
                        style={{paddingTop: 10}}
                        onPress={() => addNote()}>
                        <Image style={styles.icon} source={require('../assets/darkIcons/add-icon.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
    );
};
  
const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
        margin: 'auto',
        marginTop: 10
    },
    actionRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        width: 200,
        justifyContent: 'space-evenly',
    },
    addSection: {
        height: '53%',
        width: '100%',
        paddingHorizontal: '5%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.foreground,
        color: colors.font,
    },
    addLabel: {
        height: 50,
        width: 50,
        marginRight: '-5%',
        borderTopLeftRadius: 20,
        backgroundColor: colors.highlight,
    },
    label: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 5,
    },
    labelIcon: {
        height: 20,
        width: 20,
        marginHorizontal: 10
    },
    labelText: {
        color: colors.font,
        marginRight: 10
    },
    titleInput: {
        height: 40,
        width: '100%',
        marginTop: 10,
        marginBottom: 5,
        paddingLeft: 15,
        borderRadius: 20,
        backgroundColor: colors.inputBackground,
        color: colors.font,
    },
    bodyInput: {
        height: 200,
        width: '100%',
        marginVertical: 5,
        padding: 15,
        borderRadius: 20,
        backgroundColor: colors.inputBackground,
        color: colors.font,
    }
  });

  const categoryStyles = StyleSheet.create ({
    categoryInput: {
        width: '80%',
        marginHorizontal: 10,
        marginVertical: 5,
        borderBottomWidth: 1,
        borderColor: colors.font,
        color: colors.font
    },
    categoryInputButton: {
        height: 20
    },
    categoryInputRow: {
        width: '100%',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    categoryLabel: {
        display: 'flex',
        width: 'auto',
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 5,
        backgroundColor: colors.highlight,
        borderRadius: 20,
    },
    categoryLabelIcon: {
        height: 20,
        width: 20,
        marginHorizontal: 10,
    },
    categoryLabelRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    categoryLabelText: {
        marginLeft: 10,
        color: colors.fontDark
    },
    categoryRow: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 40,
    }
  });

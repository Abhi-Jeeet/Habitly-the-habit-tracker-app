import { DATABASE_ID, databases, HABITLY_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ID } from "react-native-appwrite";
import { Button, SegmentedButtons, Text, TextInput, useTheme } from "react-native-paper";

const frequencies = ["daily", "weekly", "monthly"];
type frequency = (typeof frequencies)[number];
export default function AddHabitScreen(){
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [frequency, setFrequency] = useState<frequency>("daily");
    const [error, setError] = useState<string>("");
    const {user} = useAuth();
    const router = useRouter();
    const theme = useTheme();

    const handleSubmit=async()=>{
        if(!user) return;
        try{
        await databases.createDocument(DATABASE_ID, HABITLY_COLLECTION_ID, ID.unique(),
        {
            user_id: user.$id,
            title,
            description,
            frequency,
            streak_count:0,
            last_completed: new Date().toISOString(),
            created_at: new Date().toISOString()


        }
    );
    router.back();
} catch(error){
    if(error instanceof Error){
    setError(error.message);
    return;
    }
    setError("There was an error while creating the habit");
}
    }

    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Add New Habit</Text>
                
                <TextInput 
                    label='Title' 
                    mode="outlined"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />
                
                <TextInput 
                    label='Description' 
                    mode="outlined"
                    value={description}
                    onChangeText={setDescription}
                    style={styles.input}
                    multiline
                    numberOfLines={3}
                />
                
                <View style={styles.frequencyContainer}>
                    <Text style={styles.label}>Frequency</Text>
                    <SegmentedButtons
                        value={frequency}
                        onValueChange={(value)=>setFrequency(value as frequency)}
                        buttons={frequencies.map((freq)=>({
                            value: freq,
                            label: freq.charAt(0).toUpperCase() + freq.slice(1)
                        }))}
                        style={styles.segmentedButtons}
                    />
                </View>
                
                <Button 
                    mode="contained" 
                    style={styles.button}
                    disabled={!title || !description}
                    onPress={handleSubmit}
                >
                    Add Habit
                </Button>
                {error && <Text style={{color:theme.colors.error}}>{error}</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    content: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
        color: '#333'
    },
    input: {
        marginBottom: 16,
        backgroundColor: 'white'
    },
    frequencyContainer: {
        marginBottom: 24
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333'
    },
    segmentedButtons: {
        marginTop: 8
    },
    button: {
        marginTop: 8,
        paddingVertical: 8,
        borderRadius: 8
    }
})
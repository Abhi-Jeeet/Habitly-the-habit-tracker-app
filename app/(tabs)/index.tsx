import { DATABASE_ID, databases, HABITLY_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit } from "@/types/databases.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button, Text } from "react-native-paper";

export default function Index() {
  const {signOut, user} = useAuth();
  const [habits, setHabits] = useState<Habit[]>()
  useEffect(()=>{
    fetchHabits();
  },[user])
  const fetchHabits=async()=>{
    try {
      const response = await databases.listDocuments(DATABASE_ID,
        HABITLY_COLLECTION_ID,
        [Query.equal("user_id", user?.$id?? "")]
      );
      
      setHabits(response.documents as Habit[]);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View
      style={styles.view}
    >
      <View>
      <Text variant="headlineSmall">Today's Habit</Text>
      <Button mode="text" onPress={signOut} icon={"logout"}>Sign Out</Button>
    </View>
    {habits?.length===0?(
      <View><Text>No habits yet. Add your first Habit</Text></View>
    ):(
      habits?.map((habit, key)=>
      <View key={key}>
        <Text> {habit.title}</Text>
        <Text>{habit.description}</Text>
        <View>
          <View>
            <MaterialCommunityIcons name="fire" size={18} color={"#ff9800"} />
            <Text>{habit.streak_count} day streak</Text>
          </View>
          <View>
            <Text>
              {habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}
            </Text>
            </View>
        </View>
      </View>)
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
    navButton:{
      width:100,
      height:20,
      backgroundColor:"coral",
      borderRadius:8,
      textAlign:"center",

    },
})

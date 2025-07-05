import { client, DATABASE_ID, databases, HABITLY_COLLECTION_ID, HABITLY_COMPLETION_COLLECTION_ID, RealtimeResponse } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit } from "@/types/databases.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ID, Query } from "react-native-appwrite";
import { Swipeable } from "react-native-gesture-handler";
import { Button, Surface, Text } from "react-native-paper";

export default function Index() {
  const {signOut, user} = useAuth();
  const [habits, setHabits] = useState<Habit[]>()
  const SwipeableRefs=useRef<{[key:string]:Swipeable|null}>({})


  useEffect(()=>{
    if(user){
    const channel = `databases.${DATABASE_ID}.collections.${HABITLY_COLLECTION_ID}.documents`
    const habitSubscription=client.subscribe(channel,
      (response: RealtimeResponse)=>{
          if(response.events.includes("databases.*.collections.*.documents.*.create")
          ){
        fetchHabits();
        
        }else if(response.events.includes("databases.*.collections.*.documents.*.update")
          ){
        fetchHabits();
        }
        else if(response.events.includes("databases.*.collections.*.documents.*.delete")
          ){
        fetchHabits();
        }

      }
    );
    fetchHabits();
    return ()=>{
      habitSubscription();
    }
  }
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
  };
  const handleDeleteHabit=async(id:string)=>{
    try {
      await databases.deleteDocument(DATABASE_ID, HABITLY_COLLECTION_ID, id);
    } catch (error) {
      console.error(error);
      
    }
  }
  const handleCompleteHabit=async(id:string)=>{
    if(!user)return;
    try {
      const habit = habits?.find((h)=>h.$id===id);
      if(!habit)return;
      console.log("Updating habit with:", habit);
      
      await databases.createDocument(DATABASE_ID, HABITLY_COMPLETION_COLLECTION_ID, ID.unique(),
      {
        habit_id:id,
        user_id:user.$id,
        completed_at:new Date().toISOString()
      }
      );
      
      console.log("Updating habit with:", habit);
      

      await databases.updateDocument(DATABASE_ID, HABITLY_COLLECTION_ID, id, {
        streak_count:habit.streak_count+1,
        last_completed:new Date().toISOString(),
      })
    } catch (error) {
      console.error("Error completing habit:", error);
    }
  }

  const renderRightActions=()=>{
    return (
      <View style={styles.swipeActionRight}>
        <MaterialCommunityIcons
        name="check-circle-outline"
        size={32}
        color={'#fff'}
        />
      </View>
    );
  };
  const renderLeftActions=()=>{
    return (
      <View style={styles.swipeActionLeft}>
        <MaterialCommunityIcons
        name="trash-can-outline"
        size={32}
        color={'#fff'}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall">Today's Habit</Text>
        <Button mode="text" onPress={signOut} icon={"logout"}>Sign Out</Button>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
      {habits?.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No habits yet. Add your first Habit</Text></View>
      ) : (
        habits?.map((habit, key) =>
          <Swipeable
          ref={(ref)=>{
            SwipeableRefs.current[habit.$id]=ref;
          }}
          key={key}
          overshootLeft={false}
          overshootRight={false}
          renderLeftActions={renderLeftActions}
          renderRightActions={renderRightActions}
          onSwipeableOpen={(direction)=>{
              if(direction==='left'){
                handleDeleteHabit(habit.$id);
              }
              else if(direction==='right'){                
                handleCompleteHabit(habit.$id);

              }
              SwipeableRefs.current[habit.$id]?.close();
            
          }}

          >
          <Surface style={styles.card} elevation={0} key={habit.$id}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{habit.title}</Text>
            <Text style={styles.cardDescription}>{habit.description}</Text>
            <View style={styles.cardFooter}>
              <View style={styles.streakBadge}>
                <MaterialCommunityIcons name="fire" size={16} color="#ff9800" style={{ marginRight: 4 }} />
                <Text style={styles.streakText}>{habit.streak_count} day streak</Text>
              </View>
              <View style={styles.frequencyBadge}>
              <Text style={styles.frequencyText}>{habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}</Text>
              </View>
            </View>
          </View>
          </Surface>
          </Swipeable>
        )
      )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    alignItems: "center",
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: 400,
  },
  emptyState: {
    marginTop: 48,
    alignItems: "center",
  },
  emptyStateText: {
    color: "#b0a8b9",
    fontSize: 16,
    fontWeight: "500",
  },
  card: {
    width: 340,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.75)",
    marginBottom: 24,
    elevation: 6,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(99,102,241,0.08)",
    overflow: "hidden",
    // Optional: glassmorphism blur (iOS only, for Android use react-native-blur)
    // backdropFilter: "blur(8px)",
  },
  cardContent: {
    padding: 22,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6366F1",
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  cardDescription: {
    fontSize: 15,
    color: "#6c6c80",
    marginBottom: 18,
    fontWeight: "500",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff4e6",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  streakText: {
    color: "#ff9800",
    fontWeight: "bold",
    fontSize: 14,
  },
  frequencyBadge: {
    backgroundColor: "#f3f0fa",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  frequencyText: {
    color: "#b0a8b9",
    fontWeight: "800",
    fontSize: 14,
  },
  swipeActionLeft:{
    justifyContent:"center",
    alignItems:"flex-start",
    flex:1,
    backgroundColor:"#e53935",
    borderRadius:20,
    marginBottom:25,
    marginTop:1,
    paddingLeft:16

  },
  swipeActionRight:{
    justifyContent:"center",
    alignItems:"flex-end",
    flex:1,
    backgroundColor:"#4caf50",
    borderRadius:20,
    marginBottom:25,
    marginTop:1,
    paddingRight:16
  }
});

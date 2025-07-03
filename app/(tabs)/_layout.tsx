import { Tabs } from "expo-router";
import { Text } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabsLayout() {
  return (
<Tabs screenOptions={{tabBarActiveTintColor:"coral"}}>
  <Tabs.Screen name="index" options={{title:"home", tabBarIcon:({color})=>(<AntDesign name="home" size={24} color={color} />),
}} />
  <Tabs.Screen name="login" options={{title:"Login"}} />

</Tabs>

  )
  
}

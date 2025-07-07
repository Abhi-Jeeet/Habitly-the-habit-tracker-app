import { useRouter } from "expo-router";
import LottieView from 'lottie-react-native';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Onboarding from 'react-native-onboarding-swiper';

const {width, height} = Dimensions.get("window");

export default function OnboardingScreen() {
  const router = useRouter();
  
const handleDone=()=>{
  router.push('/auth')
}

const doneButton=({...props})=>{
  return(
    <TouchableOpacity{...props} style={styles.doneButton}>
    <Text>Done</Text>
  </TouchableOpacity>
  )
}
 

  
  return (
    <View style={styles.container}>
      <Onboarding
      containerStyles={{paddingHorizontal:15}}
      onDone={handleDone}
      onSkip={handleDone}
      DoneButtonComponent={doneButton}
      
      pages={[
        {
        backgroundColor: '#a78bfa',
        image: (
          <View style={styles.lottie}>
          <LottieView 
            source={require('../assets/animations/Animation.json')} 
            autoPlay 
            loop 
            style={styles.lottieAnimation}
            resizeMode="contain"
          />
          </View>
        ),
        title: 'Welcome to Habitly: The Habit Tracking App',
        subtitle: 'Build positive habits and achieve your goals every day.',
        },
        {
        backgroundColor: '#fff',
        image: (
          <View style={styles.lottie}>
          <LottieView 
            source={require('../assets/animations/Animation1.json')} 
            autoPlay 
            loop 
            style={styles.lottieAnimation}
            resizeMode="contain"
          />
          </View>
        ),
        title: 'Track Your Progress',
        subtitle: 'Easily monitor your daily habits and stay motivated.',
        },
        {
        backgroundColor: '#a7f3d0',
        image: (
          <View style={styles.lottie}>
          <LottieView 
            source={require('../assets/animations/Animation2.json')} 
            autoPlay 
            loop 
            style={styles.lottieAnimation}
            resizeMode="contain"
          />
          </View>
        ),
        title: 'Stay Consistent',
        subtitle: 'Set reminders and celebrate your achievements!',
        },
      ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white",

  },
  lottie:{
    width:300,
    height:400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieAnimation: {
    width: width*0.9,
    height: width,
  },
  doneButton:{
    padding:20,
    backgroundColor:"white",
    borderTopLeftRadius:"100%",
    borderBottomLeftRadius:"100%"

  }
})
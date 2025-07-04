import { useRouter } from "expo-router";
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from "react-native";
import Onboarding from 'react-native-onboarding-swiper';

export default function OnboardingScreen() {
  const router = useRouter();
  
  const onDone = () => {
    router.replace("/auth");
  };

  const onSkip = () => {
    router.replace("/auth");
  };
  
  return (
    <View style={styles.container}>
      <Onboarding
      containerStyles={{paddingHorizontal:15}}
      onDone={onDone}
      onSkip={onSkip}
      showSkip={true}
      showNext={true}
      showDone={true}
      pages={[
        {
        backgroundColor: '#fff',
        image: (
          <View style={styles.lottie}>
          <LottieView 
            source={require('../assets/animations/AnimationWelcome.json')} 
            autoPlay 
            loop 
            style={styles.lottieAnimation}
            resizeMode="contain"
          />
          </View>
        ),
        title: 'Welcome to Habit Tracker',
        subtitle: 'Build positive habits and achieve your goals every day.',
        },
        {
        backgroundColor: '#fff',
        image: (
          <View style={styles.lottie}>
          <LottieView 
            source={require('../assets/animations/AnimationWelcome.json')} 
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
        backgroundColor: '#fff',
        image: (
          <View style={styles.lottie}>
          <LottieView 
            source={require('../assets/animations/AnimationWelcome.json')} 
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
    width: '100%',
    height: '100%',
  }
})
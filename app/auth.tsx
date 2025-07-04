import { useAuth } from "@/lib/auth-context";
import { theme } from "@/theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function AuthScreen() {
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const[error, setError] = useState<string | null>("");

  const theme = useTheme();
  const router = useRouter();

  const handleAuth = async()=>{
    if(!email || !password){
        setError("Please fill in all the fields")
        return;
    }
    if(password.length < 6){
        setError("Password must be atleast 6 characters")
        return;
    }
    setError(null);
    if(isSignup){
      const error = await signUp(email, password);
      if(error){
        setError(error);
        return;
      }
    }
    else{
      const error = await signIn(email, password);
      if(error){
        setError(error);
        return;
      }
      router.replace("/(tabs)")
    }
   
  }

  const{signIn, signUp}=useAuth();

  const handleSwitch = () => {
    setIsSignup((prev) => !prev);
  };

  

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <Text style={styles.title}>
            {isSignup ? "Create Account" : "Welcome Back"}
          </Text>
          <TextInput
            label="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="example@gmail.com"
            mode="outlined"
            style={styles.input}
            onChangeText={setEmail}
          />
          <TextInput
            label="Password"
            autoCapitalize="none"
            secureTextEntry
            placeholder="Password"
            mode="outlined"
            style={styles.input}
            onChangeText={setPassword}
          />
          {error && <Text style={{color:theme.colors.error}}>{error}</Text>}
          <Button mode="contained" style={styles.button} onPress={handleAuth}>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <Button
            mode="text"
            onPress={handleSwitch}
            style={styles.switchButton}
          >
            {isSignup
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardView: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
    color: theme.colors.onBackground,
  },
  input: {
    width: "100%",
    marginBottom: 16,
  },
  button: {
    width: "100%",
    marginTop: 16,
    marginBottom: 16,
  },
  switchButton: {
    marginTop: 8,
  },
});



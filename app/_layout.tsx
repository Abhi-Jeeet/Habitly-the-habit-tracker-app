import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "@/theme";
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { user, isLoadingUser } = useAuth();
  const segments = useSegments();
  
  useEffect(() => {
    // Set mounted after a short delay to ensure proper initialization
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Only navigate after component is mounted and user loading is complete
    if (!isMounted || isLoadingUser) return;
    
    const inAuthGroup = segments[0] === '(tabs)';
    const inOnboarding = segments[0] === 'onboardingScreen';
    const inAuth = segments[0] === 'auth';
    
    if (user) {
      // User is signed in, redirect to main app if not already there
      if (!inAuthGroup) {
        router.replace("/(tabs)");
      }
    } else {
      // User is not signed in, redirect to onboarding if not already there
      if (!inOnboarding && !inAuth) {
        router.replace("/onboardingScreen");
      }
    }
  }, [segments, isMounted, user, isLoadingUser]);
  
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <AuthProvider>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <RouteGuard>
            <Stack>
              <Stack.Screen name="onboardingScreen" options={{ headerShown: false }} />
              <Stack.Screen name="auth" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </RouteGuard>
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
    </GestureHandlerRootView>
  );
}

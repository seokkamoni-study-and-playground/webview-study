import { Stack } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from 'react';
import { sleep } from '@/src/utils/sleep';

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await sleep(2000);
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  
  return (
    <GestureHandlerRootView 
      style={styles.container}
      onLayout={onLayoutRootView} 
    >
      <SafeAreaView style={styles.safeAreaView}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: 'Cat Gallery' }}
          />
          <Stack.Screen
            name="cat/[id]"
            options={{ title: 'Cat Detail' }}
          />
        </Stack>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
});
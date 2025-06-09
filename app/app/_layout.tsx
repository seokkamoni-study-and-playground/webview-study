import { Stack } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
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
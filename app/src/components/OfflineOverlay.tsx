import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetwork } from "@/src/contexts/NetworkContext";

export default function OfflineOverlay() {
  const { isOffline } = useNetwork();

  if (!isOffline) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📡 오프라인 상태입니다</Text>
      <Text style={styles.subscription}>인터넷 연결을 확인해주세요</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    zIndex: 9999,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subscription: {
    color: '#ccc',
    marginTop: 10,
  },
});

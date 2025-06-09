
import { StyleSheet, ScrollView, View } from 'react-native';
import { WebView as ReactNativeWebView } from 'react-native-webview';
import useWebViewController from '../hooks/useWebViewController';

interface WebViewProps{
    pageKey: string;
}

export default function WebView({ pageKey }:WebViewProps) {
  const { uri, ProgressBar, onLoadProgress, requestOnMessage } = useWebViewController(pageKey);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ProgressBar />
        <ReactNativeWebView
          onMessage={requestOnMessage()}
          source={{ uri }}
          originWhitelist={['*']}
          startInLoadingState={true}
          cacheEnabled={true}
          allowUniversalAccessFromFileURLs={true}
          javaScriptEnabled={true}
          onLoadProgress={onLoadProgress}
          setSupportMultipleWindows={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 5,
    },
  });
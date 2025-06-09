import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Component, useCallback, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { WebViewMessageEvent, WebViewProgressEvent } from "react-native-webview/lib/WebViewTypes";
import { TARGET_URL } from "../constants/route";
import { Href, useRouter } from "expo-router";

interface WebViewProgressProps {
    navigation?: NavigationProp<ParamListBase>;
}
  
interface WebViewProgressState {
    contentLoaded: number;
}
  
class WebViewProgress extends Component<WebViewProgressProps, WebViewProgressState> {
  SCREEN_WIDTH = Dimensions.get('window').width;
  STYLES = StyleSheet.create({
    mainContainer: {
      height: 2,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    progressView: {
      backgroundColor: '#135EAC',
      height: 2,
      left: 0,
      position: 'absolute',
      top: 0,
    },
  });

  constructor(props: WebViewProgressProps) {
    super(props);
    this.state = { contentLoaded: 0 };
  }

  setProgress = (val: number) => {
    this.setState({ contentLoaded: val });
  };

  render() {
    if (this.state.contentLoaded === 1) return null;

    return (
      <View style={this.STYLES.mainContainer}>
        <View
          style={[
            this.STYLES.progressView,
            {
              width: this.SCREEN_WIDTH * this.state.contentLoaded,
            },
          ]}
        ></View>
      </View>
    );
  }
}

type PostMessageTypes = {
    type: string;
    path: string;
  };
  
  export default function useWebViewController(pagePath: string) {
    const router = useRouter();
    const webProgressRef = useRef<WebViewProgress>(null);
  
    const onLoadProgress = useCallback(({ nativeEvent }: WebViewProgressEvent) => {
      if (!webProgressRef.current) {
        return;
      }
      webProgressRef.current.setProgress(nativeEvent.progress);
    }, []);
  
    const requestOnMessage = () =>
      async ({ nativeEvent }: WebViewMessageEvent): Promise<void> => {
        try {
          const postMessage: PostMessageTypes = JSON.parse(nativeEvent.data) || {};
          if (!postMessage) {
            return;
          }
  
          if (postMessage.type === 'ROUTER_EVENT') {
            const { path } = postMessage;
    
            if (path === 'back' && router.canGoBack()) {
              router.back();
            }

            return router.push(path as Href);
          }

        } catch (error) {
          return;
        }
      };
  
    return {
      uri: `${TARGET_URL}${pagePath}`,
      ProgressBar: WebViewProgress,
      onLoadProgress,
      requestOnMessage,
    };
  };
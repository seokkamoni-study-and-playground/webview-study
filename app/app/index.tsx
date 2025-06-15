import OfflineOverlay from "@/src/components/OfflineOverlay";
import WebView from "@/src/components/WebView";
import { NetworkProvider } from "@/src/contexts/NetworkContext";

export default function Index() {
  return (
    <NetworkProvider>
      <WebView pagePath="/" />
      <OfflineOverlay />
    </NetworkProvider>
  );
}

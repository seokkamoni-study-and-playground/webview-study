import OfflineOverlay from "@/src/components/OfflineOverlay";
import WebView from "@/src/components/WebView";
import { NetworkProvider } from "@/src/contexts/NetworkContext";
import { useLocalSearchParams } from "expo-router";

export default function CatDetail() {
  const { id } = useLocalSearchParams();

  return (
    <NetworkProvider>
      <WebView pagePath={`/cat/${id}`} />
      <OfflineOverlay />
    </NetworkProvider>
  );
}

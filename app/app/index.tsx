import OfflineOverlay from "@/src/components/OfflineOverlay";
import WebView from "@/src/components/WebView";

export default function Index() {
  return (
    <>
      <WebView pagePath="/" />
      <OfflineOverlay />
    </>
  );
}

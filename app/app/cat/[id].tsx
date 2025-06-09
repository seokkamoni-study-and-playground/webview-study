import WebView from "@/src/components/WebView";
import { useLocalSearchParams } from "expo-router";

export default function CatDetail() {
  const { id } = useLocalSearchParams();

  return (
    <WebView pagePath={`/cat/${id}`} />
  );
}

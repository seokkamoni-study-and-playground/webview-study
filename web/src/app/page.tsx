import CatGallery from "@/components/CatGallery";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CatGallery />
    </Suspense>
  );
}

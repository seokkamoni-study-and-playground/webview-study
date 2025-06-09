import CatGallery from "@/components/CatGallery";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CatGallery />
    </Suspense>
  );
}

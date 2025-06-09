import CatDetail from "@/components/CatDetail";
import { Suspense } from "react";

export default function CatDetailPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <CatDetail />
      </Suspense>
    );
}
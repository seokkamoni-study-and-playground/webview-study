'use client';

import { useCatDetail } from "@/hooks/queries/useCatDetail";
import { useParams } from "next/navigation";

export default function CatDetail() {
  const params = useParams();
  const id = params.id as string;
  const { data: cat } = useCatDetail(id);

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '40px auto',
        padding: '0 16px',
        textAlign: 'center',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={cat.id}
        src={cat.url}
        alt={`cat-${cat.id}`}
        style={{
          width: '100%',
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          marginBottom: 24,
          objectFit: 'cover',
        }}
      />
    </div>
  );
}

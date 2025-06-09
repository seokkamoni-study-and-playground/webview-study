'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteCats } from '@/hooks/queries/useInfiniteCats';
import useAppRouter from '@/hooks/common/useAppRouter';

const CatGallery = () => {
  const router = useAppRouter();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCats();

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleCatClick = (catId: string) => {
    router.push(`/cat/${catId}`);
  }

  
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
        }}
      >
        {data.pages.flatMap((page) =>
          page.cats.map((cat) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={cat.id}
              onClick={() => handleCatClick(cat.id)}
              src={cat.url}
              alt={`cat-${cat.id}`}
              style={{ width: '100%', borderRadius: '12px' }}
            />
          ))
        )}
      </div>
      <div ref={ref} style={{ height: '100px' }} />
      {isFetchingNextPage && <p>Loading more cats...</p>}
    </>
  );
};

export default CatGallery;

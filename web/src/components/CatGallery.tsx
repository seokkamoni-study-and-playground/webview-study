'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteCats } from '@/hooks/useInfiniteCats';

const CatGallery = () => {
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
              src={cat.url}
              alt="cat"
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

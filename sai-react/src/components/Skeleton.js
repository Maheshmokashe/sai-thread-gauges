import React from 'react';

export function CardSkeleton() {
  return (
    <div className="skel-card">
      <div className="skel skel-img" />
      <div className="skel skel-line" style={{ width: '75%', marginTop: 18 }} />
      <div className="skel skel-line sm" />
      <div className="skel skel-line" style={{ width: '40%', margin: '18px 18px' }} />
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid-cards">
      {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );
}

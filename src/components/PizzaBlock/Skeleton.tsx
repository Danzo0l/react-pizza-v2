import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={457}
      viewBox="0 0 280 457"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="130" cy="130" r="130" />
      <rect x="0" y="275" rx="10" ry="10" width="280" height="24" />
      <rect x="0" y="310" rx="10" ry="10" width="280" height="84" />
      <rect x="0" y="410" rx="10" ry="10" width="95" height="27" />
      <rect x="125" y="405" rx="24" ry="24" width="152" height="45" />
    </ContentLoader>
  );
};

export default Skeleton;

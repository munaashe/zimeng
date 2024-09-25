import React from 'react';

const SlugPage = ({ params }: { params: { slug: string } }) => {
  console.log(params)
  return (
    <div>
      <h1>Dynamic Page for: {params.slug}</h1>
      <p>This is content for the slug: {params.slug}</p>
    </div>
  );
};

export default SlugPage;
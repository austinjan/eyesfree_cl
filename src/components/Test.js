import React from 'react';

const Test = props => {
  const { a, ...rest } = props;
  return (
    <div>
      <h1>TEST</h1>
    </div>
  );
};

export default Test;

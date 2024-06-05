// pages/TestPage.tsx

import React from 'react';
import Circle from '../components/Circle';

const TestPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Circle circleColor="#380356" radius={250} />
    </div>
  );
};

export default TestPage;
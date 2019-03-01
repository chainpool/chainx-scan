import React from 'react';

import BestBlocks from './BestBlocks';
import BestTransactions from './BestTransactions';

const Home = function Home() {
  return (
    <section className="blockTransaction">
      <BestBlocks />
      <BestTransactions />
    </section>
  );
};

export default Home;

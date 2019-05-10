import React from 'react';
import logo from './logo-new.svg';
const Navbar = () => {
  return (
    <div style={{ display: 'flex' }}>
      <img
        src={logo}
        alt={'Atop'}
        style={{ width: '80px', height: '40px', margin: 'auto 0px' }}
      />
      <h2 style={{ color: 'white' }}>Atop IOT demo system</h2>
    </div>
  );
};

export default Navbar;

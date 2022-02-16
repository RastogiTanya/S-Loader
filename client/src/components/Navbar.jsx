import React from 'react';
import "../styles/Navbar.css"

function Navbar() {
  return (
      <div className='navbar'>
          <h2 className='nav-brand'>
              S-Loader
          </h2>
          {/* <ul className='nav-items'>
              <li>Monitor</li>
              <li>Logout</li>
          </ul> */}
      </div>
  );
}

export default Navbar;

import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className='site-footer'>
      <div className='footer-nav width-control'>
        <div className='nav-left'>
          <div className='nav-item'>
            <h5 className='footer-h5'>Spring 2023</h5>
          </div>
        </div>
        <div className='nav-right mobile-hide'>
          <div className='nav-item'>
            <h5 className='footer-h5'><a className="footer-link" href='https://www.gatech.edu/' target="_blank">Georgia Institute of Technology</a></h5>
          </div>
          <div className='nav-item'>
            <h5 className='footer-h5'><a className="footer-link" href='https://www.cc.gatech.edu/' target="_blank">College of Computing</a></h5>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
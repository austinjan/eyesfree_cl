import React from 'react';
import { Link } from 'react-router-dom';

const mobielRedirct = () => {
  return (
    <div>
      <h2> 頁面不支援行動裝置 </h2>
      <Link to="/monitorDevices"> 裝置狀態頁面 </Link>
      <Link to="/customerService"> 客服頁面 </Link>
    </div>
  );
};

export default mobielRedirct;

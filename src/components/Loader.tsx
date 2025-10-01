import React from 'react';

const Loader = ({ message }: { message: string }) => (
  <div className="loader-container">
    <div className="loader-spinner"></div>
    <p>{message}</p>
  </div>
);

export default Loader;
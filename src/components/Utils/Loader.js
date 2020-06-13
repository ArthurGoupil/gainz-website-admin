import React from 'react';

const Loader = ({ width, height }) => {
  return (
    <div className='loader-container d-flex justify-center align-center'>
      <div className='loader d-flex justify-center align-center'></div>
      <style>{`
        .loader-container {
          width: 100%;
          height: 100%;
        }
        .loader {
          width: 70px;
          height: ${height ? height : '70px'};
          background-image: url('/loader/loader.png');
          background-size: cover;
          background-repeat: no repeat;
          animation: rotation 1s infinite linear;
        }
        @keyframes rotation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(359deg);
          }
        }
        .loader-container {
          width: ${width ? width : '100%'};
          height: ${height ? height : '100%'};
        }
      `}</style>
    </div>
  );
};

export default Loader;

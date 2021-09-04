import React from 'react';

export default function Loader({ status }) {
  return (
    status && (
      <div className='loader'>
        <img src={'https://cdn.dribbble.com/users/2441534/screenshots/5695972/loader.gif'} alt=""/>
      </div>
    )
  );
}

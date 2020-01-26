import React from 'react';
import appConfig from '../../shared/app';

const Index = () => {
  const changeCookie = () => {
    document.cookie = `${appConfig.cookies.token}=heslo; path=/`;
  };
  const clearCookie = () => {
    document.cookie = `${appConfig.cookies.token}=; path=/`;
  };
  return (
    <div>
      A
      <div>
        <button onClick={changeCookie}>Click</button>
      </div>
      <div>
        <button onClick={clearCookie}>Clear</button>
      </div>
    </div>
  );
};

export default Index;

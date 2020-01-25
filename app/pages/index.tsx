import React from 'react';
import Link from 'next/link';

import cookies from 'next-cookies';
import config from '@template/shared/config';

const Index = props => {
  const changeCookie = () => {
    document.cookie = `${config.cookies.token}=ahoj; path=/`;
  };

  return (
    <>
      <div>
        Ahoj
        <Link href={{ pathname: '/a' }}>a</Link>
        <button onClick={changeCookie}>a</button>
      </div>
    </>
  );
};

Index.getInitialProps = ctx => {
  return { cookie: cookies(ctx).template };
};

export default Index;

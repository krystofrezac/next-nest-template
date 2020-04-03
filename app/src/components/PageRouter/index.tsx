import React, { useState } from 'react';

import { useRouter } from 'next/router';

import { PageRouterProps } from './types';

const PageRouter = (props: PageRouterProps) => {
  const router = useRouter();
  const defaultPage = props.pages.find(p => p.default) || props.pages[0];
  const [query, setQuery] = useState({});

  const renderPage = props.pages.find(p => p.name === router.asPath) || defaultPage;
  const RenderPage = renderPage.component;

  return (
    <>
      <RenderPage
        {...renderPage.props}
        redirect={(name: string, q?: any) => {
          setQuery(q);
          props.onPageChange(name);
          router.push(router.pathname, name);
        }}
        query={query}
      />
    </>
  );
};

export default PageRouter;

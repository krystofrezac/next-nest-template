import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import withApollo from 'lib/apollo/withApollo';

const USER_GET_LOGGED = gql`
  {
    userGetLogged {
      id
    }
  }
`;

const Test = () => {
  const { data, error } = useQuery(USER_GET_LOGGED);
  return (
    <>
      <div>
        data:
        {JSON.stringify(data)}
      </div>
      <div>
        err:
        {JSON.stringify(error)}
      </div>
    </>
  );
};

export default withApollo(Test);

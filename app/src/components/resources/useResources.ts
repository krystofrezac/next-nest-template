import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import rolesToResources from 'components/resources/rolesToResources';
import hasAccess from 'components/resources/hasAccess';
import { UserGetLogged } from './types';

const USER_GET_LOGGED = gql`
  {
    userGetLogged {
      id
      roles {
        id
        resources {
          id
          name
        }
      }
    }
  }
`;

const useResources = (requiredResource: string[][]) => {
  const { data } = useQuery<UserGetLogged>(USER_GET_LOGGED, {
    fetchPolicy: 'cache-and-network',
  });
  const resources = rolesToResources(data?.userGetLogged.roles || []);
  return hasAccess(resources, requiredResource);
};

export default useResources;

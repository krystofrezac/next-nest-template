import { gql } from 'apollo-boost';

const roleFragment = gql`
  fragment Roles on User {
    roles {
      id
      name
    }
  }
`;

export default roleFragment;

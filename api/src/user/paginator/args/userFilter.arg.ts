import { Field, InputType } from 'type-graphql';

@InputType()
class UserFilterArg {
  @Field({ nullable: true, defaultValue: '' })
  email?: string = '';

  @Field({ nullable: true, defaultValue: '' })
  name?: string;

  @Field({ nullable: true, defaultValue: '' })
  surname?: string;
}

export default UserFilterArg;

export const getUserFilterArgDefaultValue = () => {
  const defaultValue = new UserFilterArg();
  defaultValue.email = '';
  defaultValue.name = '';
  defaultValue.surname = '';
  return defaultValue;
};

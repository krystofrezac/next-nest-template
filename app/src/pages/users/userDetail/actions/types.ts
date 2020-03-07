export interface UserResetPassword {
  userResetPassword: {
    id: number;
    email: string;
    generatedPassword: string;
  };
}

export interface UserResetPasswordVars {
  userId: number;
}

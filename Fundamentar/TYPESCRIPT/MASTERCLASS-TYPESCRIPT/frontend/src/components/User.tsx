import React from "react";

interface IUser {
  name: string;
  email?: string;
}
interface UserProps {
  user: IUser;
}

export const User: React.FunctionComponent<UserProps> = ({ user }) => {
  return (
    <div>
      <strong>Nome: {user.name}</strong>
      <br />
      <strong>Email: {user.email || "não possui e-mail"}</strong>
      <br />
    </div>
  );
};

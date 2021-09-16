import React from "react";
import { UserContext } from "../contexts/userContext";

export const Home = () => {
  const { user } = React.useContext(UserContext);
  return (
    <>
      {user.googleId ? (
        <h1>Hello {user.firstName}</h1>
      ) : (
        <h1>Vous n'êtes pas connecté</h1>
      )}
    </>
  );
};

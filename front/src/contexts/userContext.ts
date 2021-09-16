import React from "react";
import { emptyUser } from "../types/user";

export const UserContext = React.createContext({user: emptyUser});

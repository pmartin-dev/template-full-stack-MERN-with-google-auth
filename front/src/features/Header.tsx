import { Popover } from "@headlessui/react";
import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import ExternalLink from "../utils/externalLink";

export default function Header() {
  const { user } = React.useContext(UserContext);
  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt=""
              />
            </Link>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <Link
              to="/test"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Pricing
            </Link>
            <Link
              to="/test"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Docs
            </Link>
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {!user.googleId && (
              <div className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                <ExternalLink href="http://localhost:3030/google">
                  Sign in with Google
                </ExternalLink>
              </div>
            )}
            {user.googleId && (
              <>
                <div className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                  {user.firstName}
                </div>
                <div className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  <ExternalLink href="http://localhost:3030/logout">
                    Log out
                  </ExternalLink>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Popover>
  );
}

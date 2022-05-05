import React from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/router";

import { CURRENT_USER_QUERY } from "hooks/useCurrentUser";

const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

function Signout() {
  const router = useRouter();

  const [signout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [CURRENT_USER_QUERY],
  });

  const signoutAndRedirect = async () => {
    await signout();
    router.push("/");
  };

  return (
    <button onClick={signoutAndRedirect} className="dark:text-white">
      Signout
    </button>
  );
}

export default Signout;

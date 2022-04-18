import React from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { CURRENT_USER_QUERY } from "hooks/useCurrentUser";

const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

function Signout() {
  const [signout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [CURRENT_USER_QUERY],
  });
  return <button onClick={signout}>Signout</button>;
}

export default Signout;

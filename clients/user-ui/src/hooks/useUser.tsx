import { useQuery } from "@apollo/client/react";
import { GET_USER } from "../graphql/actions/getUser.action";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  address?: string | null;
}

interface ErrorType {
  message: string;
  code?: string;
}

interface LoginResponse {
  user?: User | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  error?: ErrorType | null;
}

interface GetUserData {
  getLoggedInUser: LoginResponse;
}

const useUser = () => {
  const { loading, data } = useQuery<GetUserData>(GET_USER);

  return {
    loading,
    user: data?.getLoggedInUser?.user,
    accessToken: data?.getLoggedInUser?.accessToken,
  };
};

export default useUser;

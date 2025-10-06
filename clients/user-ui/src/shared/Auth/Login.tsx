import { LOGIN_USER } from "@/src/graphql/actions/login.action";
import styles from "@/src/utils/style";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// --- START: Type Definitions for GraphQL Response ---

/** Defines the structure of the user object returned on successful login. */
interface LoginUser {
  id: string;
  name: string;
  email: string;
  password?: string; // Should typically not be returned, but based on your GQL action, I include it as optional/string
  address: string;
  phone_number: string;
}

/** Defines the overall structure of the response from the 'LoginUser' mutation. */
interface LoginResponse {
  Login: {
    user: LoginUser | null;
    accessToken: string | null;
    refreshToken: string | null;
    error: {
      message: string;
    } | null;
  };
}

// --- END: Type Definitions for GraphQL Response ---

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long!"),
});

type LoginSchema = z.infer<typeof formSchema>;

const Login = ({
  setActiveState,
  setOpen,
}: {
  setActiveState: (e: string) => void;
  setOpen: (e: boolean) => void;
}) => {
  // FIX: Apply LoginResponse as the type for the mutation data
  const [Login, { loading }] = useMutation<LoginResponse, LoginSchema>(
    LOGIN_USER
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(formSchema),
  });

  const [show, setShow] = useState(false);

  const onSubmit = async (data: LoginSchema) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };

    try {
      // response.data is now correctly typed as LoginResponse | undefined
      const response = await Login({
        variables: loginData,
      });

      // Safely check for response data before accessing properties
      if (response.data && response.data.Login.user) {
        toast.success("Login Successful!");
        // The properties are now known to exist on the object
        Cookies.set("refresh_token", response.data.Login.refreshToken!);
        Cookies.set("access_token", response.data.Login.accessToken!);
        setOpen(false);
        reset();
        window.location.reload();
      } else if (response.data && response.data.Login.error) {
        // Handle GraphQL error message from the response payload
        toast.error(response.data.Login.error.message);
      } else {
        // Fallback for unexpected response structure
        toast.error("An unknown login error occurred.");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Login mutation failed:", error);
      toast.error("Login failed. Check your network connection.");
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Login with Anouar Web Site</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={`${styles.label}`}>Enter your Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="loginmail@gmail.com"
          className={`${styles.input}`}
        />
        {errors.email && (
          <span className="text-red-500 block mt-1">
            {`${errors.email.message}`}
          </span>
        )}

        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter your password
          </label>
          <input
            {...register("password")}
            type={!show ? "password" : "text"}
            placeholder="password!@%"
            className={`${styles.input}`}
          />

          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && (
          <span className="text-red-500">{`${errors.password.message}`}</span>
        )}

        <div className="w-full mt-5">
          <span
            className={`${styles.label} text-[#2190ff] block text-right cursor-pointer`}
            // onClick={() => setActiveState("Forgot-Password")}
          >
            Forgot your password?
          </span>
          <input
            type="submit"
            value="login"
            disabled={isSubmitting || loading}
            className={`${styles.button} mt-3`}
          />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[16px] text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Not have any account?
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setActiveState("Signup")}
          >
            Sign up
          </span>
        </h5>
        <br />
      </form>
    </div>
  );
};

export default Login;

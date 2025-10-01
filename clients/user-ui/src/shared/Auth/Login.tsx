import styles from "@/src/utils/style";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8characters long!"),
});

type LoginSchema = z.infer<typeof formSchema>;

const Login = () => {
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
    console.log(data);
    reset();
    // const loginData = {
    //   email: data.email,
    //   password: data.password,
    // };
    // const response = await Login({
    //   variables: loginData,
    // });
    // if (response.data.Login.user) {
    //   toast.success("Login Successful!");
    //   Cookies.set("refresh_token", response.data.Login.refreshToken);
    //   Cookies.set("access_token", response.data.Login.accessToken);
    //   setOpen(false);
    //   reset();
    //   window.location.reload();
    // } else {
    //   toast.error(response.data.Login.error.message);
    // }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Login with Anouar</h1>
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
          {errors.password && (
            <span className="text-red-500">{`${errors.password.message}`}</span>
          )}
          {/* {!show ? (
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
          )} */}
        </div>

        <div className="w-full mt-5">
         <input
         type="submit"
         value="login"
         disabled={isSubmitting}
         className={`${styles.button}`}
         />
        </div>
        <br />
      </form>
    </div>
  );
};

export default Login;

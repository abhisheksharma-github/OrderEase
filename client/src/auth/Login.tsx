import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoginInputState, loginSchema } from "@/schema/userSchema";

// type LoginInputState = {
//   email: string;
//   password: string;
// };

const Login = () => {
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  const loginSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    // form validation start
    const result = loginSchema.safeParse(input);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setErrors(fieldError as Partial<LoginInputState>);
    }
    console.log(input);
  };

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loading = false;

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={loginSubmitHandler}
        className="md:p-8 max-w-md bg-white md:border border-gray-200 rounded-lg mx-4 shadow-md"
      >
        <div className="mb-6 text-center">
          <h1 className="font-bold text-2xl">OrderEase</h1>
        </div>

        {/* Email Field */}
        <div className="relative mb-4">
          <Mail className="absolute inset-y-0 left-3 w-5 h-5 text-gray-500 my-auto pointer-events-none" />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="pl-10 py-5 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="relative mb-4">
          <LockKeyhole className="absolute inset-y-0 left-3 w-5 h-5 text-gray-500 my-auto pointer-events-none" />
          <Input
            type={showPassword ? "text" : "password"} // Dynamic input type
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="pl-10 pr-10 py-5 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none"
            style={{ background: "transparent", border: "none", padding: 0 }}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
          {errors && (
            <span className="text-sm text-red-500">{errors.password}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          {loading ? (
            <button
              className="w-full bg-rose-500 hover:bg-rose-400 text-white text-lg flex items-center justify-center hover:border-rose-500"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-400 hover:border-red-500 text-white text-lg"
            >
              LOGIN
            </button>
          )}
          <div className="pt-4">
            <Link
              to="/Forget-password"
              className="hover:text-blue-400 text-blue-200 hover:underline"
            >
              Forget password
            </Link>
          </div>
        </div>
        <Separator />
        <p className="mt-2">
          Create new account
          <Link to="/signup" className="text-blue-400">
            {" "}
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

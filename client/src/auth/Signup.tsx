import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  PhoneOutgoing,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { SignupInputState, signupSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner"; // ✅ Ensure toast notifications

const Signup = () => {
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
  });

  const [errors, setErrors] = useState<Partial<SignupInputState>>({});
  const { signup, loading } = useUserStore(); // ✅ Ensure useUserStore() provides these
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const SignupSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // ✅ Form validation using Zod
    const result = signupSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
      return;
    }

    // ✅ Password match validation
    if (input.password !== input.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match!" });
      return;
    }

    // ✅ Signup API call
    try {
      await signup(input);
      toast.success("Signup successful! Please verify your email.");
      navigate("/verify-email");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed!");
    }
  };

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={SignupSubmitHandler}
        className="md:p-8 max-w-md bg-white md:border border-gray-200 rounded-lg mx-4 shadow-md"
      >
        <div className="mb-6 text-center">
          <h1 className="font-bold text-2xl">OrderEase</h1>
        </div>

        {/* Full Name Field */}
        <div className="relative mb-4">
          <User className="absolute inset-y-0 left-3 w-5 h-5 text-gray-500 my-auto pointer-events-none" />
          <Input
            type="text"
            placeholder="Full Name"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            className="pl-10 py-5 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          />
          {errors.fullname && (
            <span className="text-sm text-red-500">{errors.fullname}</span>
          )}
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
            className="pl-10 py-5 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="relative mb-4">
          <LockKeyhole className="absolute inset-y-0 left-3 w-5 h-5 text-gray-500 my-auto pointer-events-none" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="pl-10 pr-10 py-5 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 text-gray-500 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
          {errors.password && (
            <span className="text-sm text-red-500">{errors.password}</span>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="relative mb-4">
          <LockKeyhole className="absolute inset-y-0 left-3 w-5 h-5 text-gray-500 my-auto pointer-events-none" />
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={changeEventHandler}
            className="pl-10 pr-10 py-5 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-3 text-gray-500 focus:outline-none"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
          {errors.confirmPassword && (
            <span className="text-sm text-red-500">
              {errors.confirmPassword}
            </span>
          )}
        </div>

        {/* Contact Field */}
        <div className="relative mb-4">
          <PhoneOutgoing className="absolute inset-y-0 left-3 w-5 h-5 text-gray-500 my-auto pointer-events-none" />
          <Input
            type="text"
            placeholder="Contact"
            name="contact"
            value={input.contact}
            onChange={changeEventHandler}
            className="pl-10 py-5 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          />
          {errors.contact && (
            <span className="text-sm text-red-500">{errors.contact}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          {loading ? (
            <Button disabled className="w-full bg-rose-500 hover:bg-rose-400">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-400"
            >
              Signup
            </Button>
          )}
        </div>

        <Separator />
        <p className="mt-2">
          Already have an account?
          <Link to="/login" className="text-blue-400">
            {" "}
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

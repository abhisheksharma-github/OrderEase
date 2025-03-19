import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";

const Verifyemail = () => {
  const [otp, setotp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<any>([]);
  const handleChange = (index: number, value: string) => {
    {
      const newOtp = [...otp];
      newOtp[index] = value;
      setotp(newOtp);
    }
    //to move next
    if (value !== "" && index < 5) {
      inputRef.current[index + 1].focus();
    }
    // to delete the enteries
    if (value === "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };
  return (
    <div className="flex items-center justify-center ">
      <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-500">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Verify your Email</h1>
          <p className="text-sm text-gray-600 mb-1">
            {" "}
            Enter Your 6 digit Number
          </p>
        </div>
        <form action="">
          <div className="flex justify-between gap-2">
            {otp.map((letter: string, idx: number) => (
              <Input
                type="text"
                key={idx}
                ref={(element) => (inputRef.current[idx] = element)}
                maxLength={1}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(idx, e.target.value)
                }
                value={letter}
                className="md:h-12 md:w-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            ))}
          </div>
          <div className="mt-4">
            {" "}
            <button className="w-full bg-orange-500 hover:bg-orange-400 text-white text-lg flex items-center justify-center hover:border-rose-500">
              Password Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verifyemail;

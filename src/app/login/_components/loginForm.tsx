"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/redux/slice/authSlice";
import { getUserProfile } from "@/lib/redux/slice/userProfileSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().nonempty({
    message: "Username is required",
  }),
  password: z.string().nonempty({
    message: "Password is required",
  }),
});

const LoginForm = () => {
  const router = useRouter();

  //redux variable
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading: loginLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const { isLoading: profileLoading } = useSelector(
    (state: RootState) => state.userProfile
  );
  //redux variable

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleSignIn(values: z.infer<typeof loginSchema>) {
    try {
      const data = await dispatch(signIn(values));
      if (data?.payload?.data?.token) {
        const profleData = await dispatch(getUserProfile());
        if (profleData?.payload?.role == "ADMIN") {
          router.push("/admin");
        } else if (profleData?.payload?.role == "PESERTA") {
          router.push("/quiz");
        } else {
          toast.error("Somethink wrong");
          form.resetField("password");
        }
      } else {
        toast.error("username or password is incorrect");
        form.resetField("password");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="min-w-[400px] border-[#3674B5] shadow-lg bg-white/70 backdrop-blur-md">
      <CardHeader>
        <CardTitle>SignIn</CardTitle>
        <CardDescription>Please enter your details to sign up</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((e) => handleSignIn(e))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button id="signIn" className="hidden">
              submit
            </button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => document.getElementById("signIn")?.click()}
          className="bg-[#3674B5] cursor-pointer hover:bg-[#578FCA] w-full"
          disabled={profileLoading || loginLoading}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleSignIn(values: z.infer<typeof loginSchema>) {
    console.log(values);
    router.push('/admin')
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
            onSubmit={form.handleSubmit(handleSignIn)}
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
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;

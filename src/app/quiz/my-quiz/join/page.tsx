"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  code: z.string().min(1, { message: "Code is required" }),
});

const Page = () => {
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  return (
    <section className="flex items-center justify-center h-[calc(80vh)] gap-4">
      <Form {...form}>
        <form
          action=""
          className="flex flex-col gap-4 w-full max-w-sm bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-md"
          onSubmit={form.handleSubmit((data) => {
            console.log(data);
          })}
        >
          <div>
            <h1 className="text-2xl font-bold">Join Quiz</h1>
            <p className="text-sm text-gray-500">
              Insert your code to join the quiz
            </p>
          </div>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <>
                <Input
                  placeholder="Insert your code here"
                  {...field}
                  className="w-full h-10 bg-white/50 border border-[#1E56A0] rounded-lg shadow-md"
                />
                <FormMessage />
              </>
            )}
          />
          <div className="grid grid-cols-5 gap-2">
            <Button
              type="button"
              variant="outline"
              className="col-span-1"
              onClick={() => {
                router.back();
              }}
            >
              <ArrowLeft />
            </Button>
            <Button type="submit" className="bg-blue-600 col-span-4">
              Join
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default Page;

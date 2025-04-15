"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QuestionSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddReadingQuestion = () => {
  const form = useForm<z.infer<typeof QuestionSchema>>({
    defaultValues: {
      type: "reading",
      question: "",
      answer: "",
      options: [
        {
          options: "",
        },
        {
          options: "",
        },
        {
          options: "",
        },
        {
          options: "",
        },
      ],
    },
    resolver: zodResolver(QuestionSchema),
  });

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Link className="flex gap-3" href={"./"}>
          <ArrowLeft />
          Add Reading Question
        </Link>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => {
            document.getElementById("submitReadingQuestion")?.click();
          }}
        >
         <PlusIcon/> Add Question
        </Button>
      </div>
      <hr className="w-full" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => console.log(e))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Textarea
                    rows={6}
                    {...field}
                    placeholder="Lorem ipsum ......"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Lorem ipsum"
                    value={field.value}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Lorem ipsum" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            {form.watch("options").map((option, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`options.${index}.options`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Option ${index + 1}`}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Lorem ipsum" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <button
            type="submit"
            className="d-none"
            id="submitReadingQuestion"
          ></button>
        </form>
      </Form>
    </div>
  );
};

export default AddReadingQuestion;

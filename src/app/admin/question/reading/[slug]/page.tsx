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
import { getReadingQuestionById } from "@/lib/redux/slice/readingQuestionSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { QuestionSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

const EditReadingQuestion = () => {
  const { slug } = useParams();
  const {data : questionData , isLoading} = useSelector((state : RootState) => state.readingQuestion);
  const dispatch = useDispatch<AppDispatch>()
  console.log(questionData)

  async function handleGetReadingQuestionById() {
    const res = await dispatch(getReadingQuestionById(slug as string));
  }
  useEffect(()=>{
    handleGetReadingQuestionById()
  },[slug])

  const ExtendedQuestionSchema = QuestionSchema.extend({
    id: z.string().nonempty(),
  });

  const form = useForm<z.infer<typeof ExtendedQuestionSchema>>({
    defaultValues: {
      id: slug as string,
      type: questionData[0]?.type || "reading",
      question: questionData[0]?.question || "",
      answer: questionData[0]?.answer || "",
      options: [
        {
          options: questionData[0]?.options[0]?.options || "",
        },
        {
          options: questionData[0]?.options[1]?.options || "",
        },
        {
          options:  questionData[0]?.options[2]?.options || "",
        },
        {
          options:  questionData[0]?.options[3]?.options || "",
        },
      ],
    },
    resolver: zodResolver(QuestionSchema.extend({
      id: z.string().nonempty(),
    })), // Use the extended schema for validation
  });

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Link className="flex gap-3" href={"./"}>
          <ArrowLeft />
          Edit Reading Question
        </Link>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => {
            document.getElementById("submitReadingQuestion")?.click();
          }}
        >
          <PlusIcon /> Edit Question
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
                    value={field.value}
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
                  <Input {...field} placeholder="Lorem ipsum" value={field.value}/>
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
                      <Input {...field} placeholder="Lorem ipsum" value={field.value}/>
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

export default EditReadingQuestion;

"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const questionId = searchParams.get("question_id");
  return (
    <section>
      <div className="">
        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">
          <p>
            {questionId}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
            perferendis dolorem voluptas quibusdam! Voluptatum excepturi maiores
            et vitae voluptate doloribus non nesciunt id eum culpa odio illo
            distinctio autem, explicabo iusto impedit quasi enim amet, quis,
            dolor quos? Facere perspiciatis totam modi repellendus laboriosam
            ratione reprehenderit praesentium, eveniet soluta hic repudiandae ut
            maxime libero explicabo, ducimus nemo illum, ab excepturi rerum
            aspernatur sunt velit laudantium. Harum ullam, natus, voluptatem
            pariatur, autem quaerat deserunt voluptate praesentium modi laborum
            eveniet at beatae perspiciatis ducimus. Magni reiciendis nihil
            animi, sapiente incidunt necessitatibus? Eligendi commodi fuga
            accusantium beatae iusto ea dicta, error rem obcaecati!
          </p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md mt-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Button variant={"outline"}>{"Jawaban a"}</Button>
            <Button variant={"ghost"}>{"Jawaban a"}</Button>
            <Button variant={"ghost"}>{"Jawaban a"}</Button>
            <Button variant={"ghost"}>{"Jawaban a"}</Button>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button variant={"outline"}>Prev</Button>
        <Button variant={"outline"}>Next</Button>
      </div>
    </section>
  );
};

export default Page;

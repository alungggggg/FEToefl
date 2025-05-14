"use client";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const { quiz_id } = useParams();
  const router = useRouter();
  console.log(quiz_id)
  return (
    <section className="grid grid-cols-12 gap-4">
      <div className="col-span-8 bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis in
          aliquam quam harum perferendis soluta nam? Atque assumenda similique
          quod.
        </p>
      </div>
      <div className="col-span-4 bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md space-y-8">
        <div className="grid grid-cols-2 gap-1 text-sm">
          <div>Duration</div>
          <div className="text-end font-bold">{"25"} min</div>
          <div>Total Question</div>
          <div className="text-end font-bold">{"25"}</div>
          <div>Type</div>
          <div className="text-end font-bold">{"Listening"}</div>
        </div>
        <Button
          className="w-full bg-blue-600 font-bold"
          onClick={() => router.push("./begin/camera/live")}
        >
          Start
        </Button>
      </div>
    </section>
  );
};

export default Page;

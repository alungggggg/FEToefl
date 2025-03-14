import { Button } from "@/components/ui/button";

const DeleteUser = () => {
  return (
    <section className="w-full flex justify-center space-x-2 mt-4">
      <Button className="w-full bg-red-500">Delete</Button>
      <Button className="w-full bg-blue-500">Cancel</Button>
    </section>
  );
};

export default DeleteUser;

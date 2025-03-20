import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddUser from "./addUser";
import EditUsers from "./editUsers";
import DeleteUser from "./deleteUser";

export function DialogUsers({
  isOpen,
  setIsOpen,
  action,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  action: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          {action == "add" ? (
            <>
              <DialogTitle>Add User</DialogTitle>
              <DialogDescription>
                Please enter the user details
              </DialogDescription>
            </>
          ) : action == "edit" ? (
            <>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Please enter the user details
              </DialogDescription>
            </>
          ) : action == "delete" ? (
            <>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this user?
              </DialogDescription>
            </>
          ) : (
            ""
          )}
        </DialogHeader>
        {action == "add" ? (
          <AddUser setIsOpen={(e)=>setIsOpen(e)} />
        ) : action == "edit" ? (
          <EditUsers />
        ) : action == "delete" ? (
          <DeleteUser/>
        ) : (
          <div>Error Operation</div>
        )}
      </DialogContent>
    </Dialog>
  );
}

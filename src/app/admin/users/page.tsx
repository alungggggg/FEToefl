"use client";

import Pagination from "@/components/page/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { UsersInterface } from "@/lib/interface";
import { getUsers } from "@/lib/redux/slice/usersSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import DialogUsers from "@/app/admin/users/_components/dialog/dialogUser";
import UsersTable from "@/app/admin/users/_components/usersTable";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UsersPage = () => {
  const { data: usersData, isLoading } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch<AppDispatch>();

  const [showedDataIndex, setShowedDataIndex] = useState<{
    start: number;
    end: number;
  }>();

  //dialog
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dialogAction, setDialogAction] = useState<string>("");
  const [selectedUser, setSelectedUsers] = useState<UsersInterface>();
  //dialog

  //filter data
  const [searchParam, setSearchParam] = useState<string>("");
  const filteredData = usersData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchParam.toLowerCase()) ||
      item.username.toLowerCase().includes(searchParam.toLowerCase()) ||
      item.exam.toLowerCase().includes(searchParam.toLowerCase())
  );
  const showedData = filteredData.slice(
    showedDataIndex?.start,
    (showedDataIndex?.end || 0) + 1
  );
  //filter data

  async function getData() {
    await dispatch(getUsers());
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isLoading ? (
        <section>
          <div className="flex justify-between items-center mb-3">
            <Input
              className="max-w-[300px]"
              placeholder="Search"
              type="search"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
            />
            <Button
              className="bg-[#1E56A0]"
              onClick={() => {
                setIsOpen(true);
                setDialogAction("add");
              }}
            >
              Add Users <PlusIcon />
            </Button>
          </div>
          <UsersTable
            usersData={showedData}
            setDialogAction={(e) => setDialogAction(e)}
            setIsOpen={(e) => setIsOpen(e)}
            setSelectedUsers={(e: UsersInterface) => setSelectedUsers(e)}
          />
          <div className="flex w-full justify-end mt-6">
            <Pagination
              dataLength={filteredData.length}
              showedDataNumber={10}
              setShowedDataIndex={setShowedDataIndex}
            />
          </div>
        </section>
      ) : (
        <section>
          <div className="flex justify-between items-center mb-3">
            <Skeleton className="h-8 w-[300px]" />
            <Skeleton className="h-8 w-[150px]" />
          </div>
          <div className="grid grid-cols-12 gap-y-3">
            <Skeleton className="col-span-12 h-8" />
            <Skeleton className="col-span-12 h-8" />
            <Skeleton className="col-span-12 h-8" />
          </div>
        </section>
      )}
      <DialogUsers
        selectedUser={selectedUser || ({} as UsersInterface)}
        isOpen={isOpen}
        setIsOpen={(e) => setIsOpen(e)}
        action={dialogAction}
      />
    </>
  );
};

export default UsersPage;

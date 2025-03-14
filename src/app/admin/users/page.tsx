"use client";

import Pagination from "@/components/page/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dummyUsersData } from "@/lib/constant";
import { UsersInterface } from "@/lib/interface";
import { DialogUsers } from "@/pages/users/dialog/dialogUser";
import UsersTable from "@/pages/users/usersTable";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [usersData, setUsersData] = useState<UsersInterface[]>([]);
  const [showedDataIndex, setShowedDataIndex] = useState<{
    start: number;
    end: number;
  }>();

  //dialog
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dialogAction, setDialogAction] = useState<string>("");
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

  useEffect(() => {
    setUsersData(dummyUsersData);
  }, []);

  return (
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
          className="bg-[#3674B5]"
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
      />
      <div className="flex w-full justify-end mt-6">
        <Pagination
          dataLength={filteredData.length}
          showedDataNumber={10}
          setShowedDataIndex={setShowedDataIndex}
        />
      </div>
      <DialogUsers
        isOpen={isOpen}
        setIsOpen={(e) => setIsOpen(e)}
        action={dialogAction}
      />
    </section>
  );
};

export default UsersPage;

'use client'

import NoDataMessage from "@/app/admin/_components/page/noDataMessage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsersInterface } from "@/lib/interface";
import { SquarePen, Trash} from "lucide-react";
import React from "react";

const tHeadItems = ["No", "Name", "Username", "exam id", "action"];

const UsersTable = ({
  usersData,
  setDialogAction,
  setIsOpen,
  setSelectedUsers
}: {
  usersData: Array<UsersInterface>;
  setDialogAction: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedUsers : React.Dispatch<UsersInterface>
}) => {
  return (
    <Table>
      <TableHeader className="bg-[#1E56A0] text-white">
        <TableRow>
          {tHeadItems.map((item) => (
            <TableHead
              key={item}
              className={`text-white ${
                item == "No" ? "w-[40px]" : item == "action" ? "w-[80px]" : ""
              }`}
            >
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      {usersData?.length > 0 ? (
        <TableBody>
          {usersData.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.username}</TableCell>
              <TableCell>{item.exam}</TableCell>
              <TableCell className="flex z-10">
                <SquarePen
                  onClick={() => {
                    setDialogAction("edit");
                    setIsOpen(true);
                    setSelectedUsers(item)
                  }}
                  className="cursor-pointer"
                />
                <Trash
                  onClick={() => {
                    setDialogAction("delete");
                    setIsOpen(true);
                    setSelectedUsers(item)
                  }}
                  className="cursor-pointer"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody>
          <TableRow>
            <TableCell colSpan={5}>
              <section className="flex justify-center items-center my-6">
                <NoDataMessage />
              </section>
            </TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  );
};

export default UsersTable;

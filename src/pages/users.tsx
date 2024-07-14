// import { Button } from "@/components/ui/button";
// import { DataTable } from "@/components/ui/data-table";
// import { ColumnDef } from "@tanstack/react-table";
// import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import UserForm from "@/components/form/user-form";
// import { useQuery } from "@tanstack/react-query";
// import { getUsers } from "@/services";
// import { useState } from "react";
// import { LoadingSpinner } from "@/components/ui/loading-spinner";

// type User = {
//   id: number;
//   name: string | null;
//   isBanned: boolean;
//   email: string;
//   role: "ADMIN" | "USER";
// };

// export default function Users() {
//   const { data, isLoading } = useQuery({
//     queryKey: ["users"],
//     queryFn: getUsers,
//   });
//   const [modalInfo, setModalInfo] = useState<{
//     isOpen: boolean;
//     data: User | null;
//     type: 'add' | 'edit';
//   }>({
//     isOpen: false,
//     data: null,
//     type: 'add'
//   });

//   const columns: ColumnDef<User>[] = [
//     {
//       accessorKey: "name",
//       header: "Name",
//       cell: ({ row }) => (
//         <div className="capitalize">{row.getValue("name")}</div>
//       ),
//     },
//     {
//       accessorKey: "email",
//       header: ({ column }) => {
//         return (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           >
//             Email
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         );
//       },
//       cell: ({ row }) => (
//         <div className="lowercase">{row.getValue("email")}</div>
//       ),
//     },
//     {
//       accessorKey: "role",
//       header: "Role",
//     },
//     {
//       accessorKey: "isBanned",
//       header: "Status",
//       cell: ({ row }) => (
//         <div className="capitalize">
//           {row.getValue("isBanned") ? "Banned" : "Active"}
//         </div>
//       ),
//     },
//     {
//       id: "actions",
//       enableHiding: false,
//       cell: ({ row }) => (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => {
//                 setModalInfo({
//                   isOpen: true,
//                   data: row.original,
//                   type: 'edit'
//                 })
//               }}
//             >
//               Edit
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       ),
//     },
//   ];

//   return isLoading ? (
//     <main className="flex items-center justify-center h-[85vh] w-full">
//       <LoadingSpinner />
//     </main>
//   ) : (
//     <main className="flex-1">
//       <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
//         <div className="mb-6 flex items-center justify-between">
//           <h1 className="text-2xl font-bold">User Management</h1>
//           <Button>
//             <UserForm modalInfo={modalInfo} setModalInfo={setModalInfo} key={"user-form"}  />
//           </Button>
//         </div>
//         <div className="overflow-x-auto">
//           {data && <DataTable columns={columns} data={data} />}
//         </div>
//       </div>
//     </main>
//   );
// }
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserForm from "@/components/form/user-form";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type User = {
  id: number;
  name: string | null;
  isBanned: boolean;
  email: string;
  role: "ADMIN" | "USER";
};

type ModalInfo = {
  isOpen: boolean;
  data: User | null;
  type: "add" | "edit";
};

export default function Users() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    isOpen: false,
    data: null,
    type: "add",
  });

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "isBanned",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("isBanned") ? "Banned" : "Active"}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                setModalInfo({
                  isOpen: true,
                  data: row.original,
                  type: "edit",
                })
              }
            >
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const handleAddUser = () => {
    setModalInfo({
      isOpen: true,
      data: null,
      type: "add",
    });
  };

  if (isLoading) {
    return (
      <main className="flex items-center justify-center h-[85vh] w-full">
        <LoadingSpinner />
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Button onClick={handleAddUser}>Add User</Button>
        </div>
        <div className="overflow-x-auto">
          {data && <DataTable columns={columns} data={data} />}
        </div>
      </div>
      <UserForm
        modalInfo={modalInfo}
        setModalInfo={setModalInfo}
        key="user-form"
      />
    </main>
  );
}

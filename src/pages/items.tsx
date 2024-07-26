import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import ItemForm from "@/components/form/item-form";
import { Item } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteItem, getItems } from "@/services";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleIcon } from "lucide-react";

export default function Items() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [modalInfo, setModalInfo] = useState<{
    isOpen: boolean;
    data: Item | null;
    type: "add" | "edit";
  }>({
    isOpen: false,
    data: null,
    type: "add",
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast({
        title: "Item deleted",
        description: "The item has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete item: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleEdit = useCallback((item: Item) => {
    setModalInfo({
      isOpen: true,
      data: item,
      type: "edit",
    });
  }, []);

  const handleDelete = useCallback(
    (id: number) => {
      deleteMutation.mutate(id);
    },
    [deleteMutation]
  );

  const categories = ["PROTEIN", "STARCH", "VEGETABLE", "OTHER"];

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <Alert variant="destructive">
        <TriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <main className="flex-1">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Item Management</h1>
          <ItemForm
            modalInfo={modalInfo}
            setModalInfo={setModalInfo}
            key="item-form"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <article
              key={category}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-lg font-bold mb-4">{category}</h2>
              <div className="space-y-4">
                {data &&
                  data
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-gray-100 rounded-lg p-4 flex justify-between items-center"
                      >
                        <h3 className="text-md font-bold">{item.name}</h3>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                {data &&
                  data.filter((item) => item.category === category).length ===
                    0 && (
                    <p className="text-gray-500 text-sm">
                      No items in this category
                    </p>
                  )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

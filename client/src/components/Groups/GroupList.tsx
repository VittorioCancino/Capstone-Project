import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";
import AddDeleteButton from "./AddDeleteButton";
import { GetAllTypes } from "../../api/TypeApi";
import GroupInfo from "./GroupInfo";

interface Group {
  Name: string;
}

const GroupList = () => {

  const queryClient = useQueryClient();

  const [showDropdown, setShowDropdown] = useState(false);
  const [filter, setFilter] = useState(null);
  const [group, setGroup] = useState<Group[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [addOrDelete, setAddOrDelete] = useState("");

  const { data, error, isError, isLoading } = useQuery(
    "groups",
    GetAllTypes,
    {
      onSuccess: (data) => {
        setGroup(data.data);
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const handleFilterClick = (filterValue) => {
    setFilter(filterValue);
  };

  const filteredGroups = filter
    ? group.filter((Group) => Group.Name === filter)
    : group;

  return (
    <>
      <div>
        <h1 className="text-4xl underline text-center mt-6">Groups</h1>
        <div className="relative mt-8 mb-8">
          <div className="flex items-center space-x-4">
            <AddDeleteButton />
          </div>
        </div>
        <GroupInfo groups={filteredGroups} />
      </div>



    </>
  );
};

export default GroupList;


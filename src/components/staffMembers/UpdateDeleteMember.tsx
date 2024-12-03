import { ChangeEvent, useContext, useState } from "react";
import IStaffContext from "../../interfaces/staffMembers/IStaffContext";
import { StaffMemberContext } from "../../contexts/StaffMembersContext";
import IStaff from "../../interfaces/staffMembers/Istaff";
import StaffMembersService from "../../services/StaffMembersService";

const UpdateDeleteMember = () => {
  const { getMemberByName, putMember, deleteMember } = useContext(
    StaffMemberContext
  ) as IStaffContext;

  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<null | File>(null);
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "image":
        const file = e.target.files ? e.target.files[0] : null;
        setImage(file);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "title":
        setTitle(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
    }
  }

  const getByNameFromContext = async () => {
    try {
      const member = await getMemberByName(name);
      if (member) {
        setId(member.id ?? null);
        setName(member.name ?? "");
        setImage(member.image ?? null);
        setDescription(member.description ?? "");
        setTitle(member.title ?? "");
        setEmail(member.email ?? "");
      } else {
        alert(`Member with name "${name}" not found.`);
      }
    } catch (error) {
      console.error("Error fetching member:", error);
      alert("An error occurred while fetching the member.");
    }
  };

  const updateMemberWithContext = async () => {
    if (id === null) {
      alert("Cannot update. Member not found.");
      return;
    }

    const memberToUpdate: IStaff = {
      id: id,
      name: name,
      image: image?.name || "",
      description: description,
      title: title,
      email: email,
    };

    const result = await putMember(memberToUpdate, image);
    if (result) {
      alert("Member updated successfully.");
    }
  };

  const deleteMemberWithContext = async () => {
    if (id === null) {
      alert("Cannot delete. Member not found.");
      return;
    }

    deleteMember(id);
    alert(`Member with ID ${id} deleted.`);
  };

  return (
    <section className="flex flex-col md:flex-row gap-6 p-4">
      <section className="bg-white w-full md:w-1/3 p-6 shadow-md rounded-lg">
        <header className="text-3xl mb-4 text-blue-950">
          Update or Delete Member
        </header>
        <div className="space-y-4">
          <div className="mb-4">
            <label className="font-semibold text-sm">Get Member by Name:</label>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                className="w-full text-zinc-700 bg-gray-200 p-2 rounded-md"
                aria-label="Member Name"
              />
              <button
                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-500 shadow-lg text-sm"
                onClick={getByNameFromContext}
              >
                Get Member
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="font-semibold text-sm">Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-md"
              aria-label="Member Image"
            />
          </div>

          <div className="mb-4">
            <label className="font-semibold text-sm">Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-md"
              aria-label="Member Title"
            />
          </div>

          <div className="mb-4">
            <label className="font-semibold text-sm">Email:</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-md"
              aria-label="Member Email"
            />
          </div>

          <div className="flex gap-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 shadow-lg text-sm"
              onClick={updateMemberWithContext}
            >
              Update
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 shadow-lg text-sm"
              onClick={deleteMemberWithContext}
            >
              Delete
            </button>
          </div>
        </div>
      </section>

      <div className="flex-1 p-6 bg-white shadow-md rounded-lg overflow-auto">
        {image !== null && (
          <div className="grid gap-4 text-center">
            <div>
              <span className="font-bold">Name:</span> {name}
            </div>
            <div>
              <span className="font-bold">Email:</span> {email}
            </div>
            <div>
              <span className="font-bold">Title:</span> {title}
            </div>
            <img
              src={StaffMembersService.getImageEndpoint() + image}
              alt={name}
              className="w-40 h-40 object-cover mx-auto border rounded-md"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default UpdateDeleteMember;

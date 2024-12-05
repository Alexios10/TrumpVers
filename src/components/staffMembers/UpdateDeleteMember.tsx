import { ChangeEvent, useContext, useState } from "react";
import IStaffContext from "../../interfaces/staffMembers/IStaffContext";
import { StaffMemberContext } from "../../contexts/StaffMembersContext";
import IStaff from "../../interfaces/staffMembers/Istaff";
import StaffMembersService from "../../services/StaffMembersService";

const UpdateDeleteMember = () => {
  const { getMemberById, getMemberByName, putMember, deleteMember } =
    useContext(StaffMemberContext) as IStaffContext;

  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<null | File>(null);
  const [currentImageName, setCurrentImageName] = useState<string | null>(null); // Stores current image
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : null;
    switch (e.target.name) {
      case "id":
        setId(Number(e.target.value));
        break;
      case "name":
        setName(e.target.value);
        break;
      case "image":
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

  const getByIdFromContext = async () => {
    if (!id) {
      alert("Please enter member id");
      return;
    }
    try {
      const member = await getMemberById(id);
      if (member) {
        setId(member.id ?? null);
        setName(member.name ?? "");
        setDescription(member.description ?? "");
        setTitle(member.title ?? "");
        setEmail(member.email ?? "");
        setCurrentImageName(member.image ?? null);
        setImage(null);
      } else {
        alert(`Member with id "${id}" not found.`);
      }
    } catch (error) {
      console.error("Error fetching merch:", error);
    }
  };

  const getByNameFromContext = async () => {
    if (!name) {
      alert("Please enter members name");
      return;
    }

    try {
      const member = await getMemberByName(name);
      if (member) {
        setId(member.id ?? null);
        setName(member.name ?? "");
        setDescription(member.description ?? "");
        setTitle(member.title ?? "");
        setEmail(member.email ?? "");
        setCurrentImageName(member.image ?? null);
        setImage(null);
      } else {
        alert(`Member with name "${name}" not found.`);
      }
    } catch (error) {
      console.error("Error fetching member:", error);
    }
  };

  const updateMemberWithContext = async () => {
    if (!id) {
      alert("Cannot update. Member not found.");
      return;
    }

    const memberToUpdate: IStaff = {
      id: id,
      name: name,
      image: image ? image.name : currentImageName,
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
      <section
        className="flex flex-col items-center "
        style={{ flex: "1 1 40%" }}
      >
        <header className="text-3xl mb-2 text-blue-950">
          Update or Delete Member
        </header>
        <div className="mx-3 mb-5">
          <div className="mb-4">
            <label className="font-semibold text-sm">Get Member by Name:</label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                className="flex-grow text-zinc-700 bg-gray-200 p-2 rounded-sm"
                aria-label="Member Name"
              />
              <button
                className="w-35 bg-blue-900 text-white p-2 rounded-sm hover:bg-blue-500 shadow-lg text-xs"
                onClick={getByNameFromContext}
              >
                GET BY NAME
              </button>
            </div>
            {/* get by ID */}
            <div className="flex mt-5 gap-2 items-center">
              <input
                type="number"
                name="id"
                onChange={handleChange}
                className="flex-grow text-zinc-700 bg-gray-200 p-2 rounded-sm"
                aria-label="Member Name"
              />
              <button
                className="h-auto w-35 bg-blue-900 text-white p-2 rounded-sm hover:bg-blue-500 shadow-lg text-xs"
                onClick={getByIdFromContext}
              >
                GET BY ID
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="font-semibold text-sm">Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
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
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
              aria-label="Member Title"
            />
          </div>

          <div className="mb-4">
            <label className="font-semibold text-sm">Description:</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
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
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
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
              className="bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600 shadow-lg text-sm"
              onClick={deleteMemberWithContext}
            >
              Delete
            </button>
          </div>
        </div>
      </section>

      <div
        className="flex-1 p-4 shadow-md rounded-sm h-[42rem] overflow-x-hidden overflow-y-auto"
        style={{ flex: "1 1 60%" }}
      >
        {currentImageName && (
          <div className="grid gap-2 text-center">
            <div>
              <span className="font-bold">ID:</span> {id}
            </div>
            <div>
              <span className="font-bold">Name:</span> {name}
            </div>
            <div>
              <span className="font-bold">Description:</span> {description}
            </div>
            <div>
              <span className="font-bold">Email:</span> {email}
            </div>
            <div>
              <span className="font-bold">Title:</span> {title}
            </div>
            <img
              src={StaffMembersService.getImageEndpoint() + currentImageName}
              alt={name}
              className="w-40 h-40 object-cover mx-auto border rounded-sm"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default UpdateDeleteMember;

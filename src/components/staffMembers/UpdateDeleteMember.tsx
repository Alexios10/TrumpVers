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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      default:
        break;
    }
  };

  const getByIdFromContext = async () => {
    if (!id) {
      alert("Please enter member ID");
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
        alert(`Member with ID "${id}" not found.`);
      }
    } catch (error) {
      console.error("Error fetching member:", error);
    }
  };

  const getByNameFromContext = async () => {
    if (!name) {
      alert("Please enter member name");
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
    <section className="flex -ml-10 flex-col lg:flex-row gap-6">
      <section
        className="flex flex-col items-center bg-white rounded-lg p-2 flex-1"
        style={{ minWidth: "460px" }}
      >
        <header className="text-xl font-bold mb-4 text-blue-900 text-center">
          Update or Delete Member
        </header>
        <div className="space-y-4 ">
          <div>
            <label className="text-sm">Get Member by Name:</label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                className="flex-grow text-zinc-700 bg-gray-100 p-2 rounded-md border focus:ring focus:ring-blue-500"
                aria-label="Member Name"
              />
              <button
                className="w-28 bg-blue-900 text-white p-2 rounded-md hover:bg-blue-500 shadow text-xs"
                onClick={getByNameFromContext}
              >
                GET NAME
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm">Get Member by ID:</label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                name="id"
                onChange={handleChange}
                className="flex-grow text-zinc-700 bg-gray-100 p-2 rounded-md border focus:ring focus:ring-blue-500"
                aria-label="Member ID"
              />
              <button
                className="w-28 bg-blue-900 text-white p-2 rounded-md hover:bg-blue-500 shadow text-xs"
                onClick={getByIdFromContext}
              >
                GET ID
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm">Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-100 p-2 rounded-md border focus:ring focus:ring-blue-500"
              aria-label="Member Image"
            />
          </div>
          <div>
            <label className="text-sm">Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-100 p-2 rounded-md border focus:ring focus:ring-blue-500"
              aria-label="Member Title"
            />
          </div>
          <div>
            <label className="text-sm">Description:</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-100 p-2 rounded-md border focus:ring focus:ring-blue-500"
              aria-label="Member Description"
            />
          </div>
          <div>
            <label className="text-sm">Email:</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-100 p-2 rounded-md border focus:ring focus:ring-blue-500"
              aria-label="Member Email"
            />
          </div>
          <div className="flex gap-4 justify-center">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 shadow"
              onClick={updateMemberWithContext}
            >
              UPDATE
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 shadow"
              onClick={deleteMemberWithContext}
            >
              DELETE
            </button>
          </div>
        </div>
      </section>

      {currentImageName && (
        <div className="space-y-2 flex flex-col w-80 border-2 border-cyan-400 p-5">
          <img
            src={StaffMembersService.getImageEndpoint() + currentImageName}
            alt={name}
            className="w-32 h-32 object-cover rounded-md"
          />
          <p>
            <strong>ID:</strong> {id}
          </p>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Title:</strong> {title}
          </p>
        </div>
      )}
    </section>
  );
};

export default UpdateDeleteMember;

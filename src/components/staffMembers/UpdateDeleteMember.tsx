import { ChangeEvent, useContext, useState } from "react";
import IStaffContext from "../../interfaces/staffMembers/IStaffContext";
import { StaffMemberContext } from "../../contexts/StaffMembersContext";
import IStaff from "../../interfaces/staffMembers/Istaff";
import StaffMembersService from "../../services/StaffMembersService";
import { LuMail } from "react-icons/lu";

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
        className="flex flex-col justify-center items-center bg-white rounded-lg p-2 "
        style={{ flex: "1 1 40%" }}
      >
        <header className="text-xl font-bold mb-4 text-blue-900 text-center">
          Update or Delete Member
        </header>
        <div className="space-y-4 ">
          <div>
            <label className="text-sm">Get Member by Name</label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                className="flex-grow text-zinc-700 bg-gray-100 p-2 rounded-sm border "
                aria-label="Member Name"
              />
              <button
                className="w-28 bg-blue-900 text-white p-2 rounded-sm hover:bg-blue-500 shadow text-xs"
                onClick={getByNameFromContext}
              >
                GET NAME
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm">Get Member by ID</label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                name="id"
                onChange={handleChange}
                className="flex-grow text-zinc-700 bg-gray-100 p-2 rounded-sm border "
                aria-label="Member ID"
              />
              <button
                className="w-28 bg-blue-900 text-white p-2 rounded-sm hover:bg-blue-500 shadow text-xs"
                onClick={getByIdFromContext}
              >
                GET ID
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-100 p-2 rounded-sm border"
              aria-label="Member Image"
            />
          </div>
          <div>
            <label className="text-sm">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-100 p-2 rounded-sm border"
              aria-label="Member Title"
            />
          </div>
          <div>
            <label className="text-sm">Description</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-100 p-2 rounded-sm border"
              aria-label="Member Description"
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-100 p-2 rounded-sm border"
              aria-label="Member Email"
            />
          </div>
          <div className="flex gap-4 justify-center">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-sm hover:bg-green-600 shadow"
              onClick={updateMemberWithContext}
            >
              UPDATE
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600 shadow"
              onClick={deleteMemberWithContext}
            >
              DELETE
            </button>
          </div>
        </div>
      </section>

      {currentImageName && (
        <div className="flex flex-col justify-center items-center ml-20 h-auto w-[80%] max-w-[800px] border-2 border-opacity-20 border-blue-500 rounded-md shadow-lg p-6 bg-zinc-100">
          <div className="w-40 h-40 mb-4" >
            <img
              src={StaffMembersService.getImageEndpoint() + currentImageName}
              alt={name}
              className="w-40 h-40 object-cover mx-auto rounded-full border-2 border-red-600 shadow-md"
            />
          </div>
          <div className="flex flex-col justify-start w-full text-center text-gray-800">
            <p className="text-lg font-bold text-blue-700 mt-4">{name}</p>
            <p className="text-sm font-medium">ID: {id}</p>
            <p className="text-sm font-medium text-red-500">{title}</p>
            <p className="text-xs italic text-gray-600 mt-2">{description}</p>
            <a
              href={`mailto:${email}`}
              className="w-full text-xs inline-flex items-center justify-center mt-4 font-medium text-blue-600 hover:text-red-600 hover:underline transition duration-200"
            >
              <LuMail className="mr-2" />
              {email}
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default UpdateDeleteMember;

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
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "image":
        setImage(e.target.value);
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
        setImage(member.image ?? "");
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
      image: image,
      description: description,
      title: title,
      email: email,
    };

    const result = await putMember(memberToUpdate);
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
    <section className="ml-5">
      <header>Staff Members</header>
      <section className="my-5 ">
        <div className="flex">
          <label>Get Member by name:</label>
          <input
            className="input"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <button
            className="border border-red-700 mx-2 rounded-lg p-1 bg-cyan-200"
            onClick={getByNameFromContext}
          >
            Get Member
          </button>
        </div>
        <div className="flex my-2">
          <label>Description:</label>
          <input
            className="input"
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div className="flex my-2">
          <label>Title:</label>
          <input
            className="input"
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="flex my-2">
          <label>Email:</label>
          <input
            className="input"
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <button
          className="border border-red-700 mr-10 rounded-lg p-1 bg-cyan-200"
          onClick={updateMemberWithContext}
        >
          Update
        </button>
        <button
          className="border rounded-lg p-1 border-red-700 bg-cyan-200"
          onClick={deleteMemberWithContext}
        >
          delete
        </button>
      </section>

      {name !== null && (
        <div className="space-y-2">
          <div>
            <span className="font-bold mr-2">Name:</span>
            <span>{name}</span>
          </div>
          <div>
            <span className="font-bold mr-2">Email:</span>
            <span>{email}</span>
          </div>
          <div>
            <span className="font-bold mr-2">Title:</span>
            <span>{title}</span>
          </div>
          <div className="flex-1 m-8 w-52">
            <img
              src={StaffMembersService.getImageEndpoint() + image}
              alt={name}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default UpdateDeleteMember;

import { FC } from "react";
import IStaff from "../../interfaces/staffMembers/Istaff";
import StaffMembersService from "../../services/StaffMembersService";

const StaffMemberItems: FC<IStaff> = ({
  name,
  image,
  description,
  title,
  email,
}) => {
  return (
    <article className="mx-5 w-96 rounded-sm p-2 my-2 shadow-lg border-solid border-2 border-blue-950 border-opacity-20">
      <div className="space-y-2 ">
        <img
          src={StaffMembersService.getImageEndpoint() + image}
          alt={name}
          className="object-contain w-28 h-full rounded-md"
        />
        <h3 className="text-sm">
          <span className="font-bold">Name: </span> {name}
        </h3>
        <p>
          <span className="font-bold">Title: </span> {title}
        </p>
        <p>
          <span className="font-bold">Description: </span> {description}
        </p>

        <p className="text-base">
          <span className="font-bold">Contact: </span> {email}
        </p>
      </div>
    </article>
  );
};

export default StaffMemberItems;

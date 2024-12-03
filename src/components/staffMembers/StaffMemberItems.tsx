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
    <article className="my-2 rounded-sm p-1 shadow-lg border-solid border-2 border-blue-950 border-opacity-20">
      <div className="m-2">
        <div className="space-y-4">
          <h3 className="text-sm align-text-top">
            <span className="font-bold">Name: </span> {name}
          </h3>
          <p>
            <span className="font-bold">Title: </span> {title}
          </p>
          <p className="mt-2 text-base">{description}</p>
          <p className="mt-2 text-base">
            <span className="font-bold">Contact: </span> {email}
          </p>
          <img
            src={StaffMembersService.getImageEndpoint() + image}
            alt={name}
            className="object-contain w-28 h-full rounded-md"
          />
        </div>
      </div>
    </article>
  );
};

export default StaffMemberItems;

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
    <article className="flex p-4 ">
      <div className="flex flex-col w-96 h-auto">
        <div className="flex-1 ">
          <img
            src={StaffMembersService.getImageEndpoint() + image}
            alt={name}
            className="object-contain w-full h-40"
          />
        </div>

        <div className="flex flex-col justify-center text-center bg-blue-950 bg-opacity-30 text-white font-bold m-2 h-36 ">
          <h3 className="text-xl">{name}</h3>
          <p>{title}</p>
          <p>{description}</p>

          <p className="flex justify-center text-sm">
            <svg
              className="mr-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <rect x="3" y="5" width="18" height="14" rx="2" />{" "}
              <polyline points="3 7 12 13 21 7" />
            </svg>{" "}
            {email}
          </p>
        </div>
      </div>
    </article>
  );
};

export default StaffMemberItems;

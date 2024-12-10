import { useContext } from "react";
import { StaffMemberContext } from "../../contexts/StaffMembersContext";
import IStaffContext from "../../interfaces/staffMembers/IStaffContext";
import StaffMemberItems from "./StaffMemberItems";

const StaffmemberList = () => {
  const { members } = useContext(StaffMemberContext) as IStaffContext;

  const createAndGetStaffAdminJSX = () => {
    const staffMemberJSX = members.map((member) => {
      return (
        <StaffMemberItems
          key={member.id}
          id={member.id}
          name={member.name}
          image={member.image}
          description={member.description}
          title={member.title}
          email={member.email}
        />
      );
    });

    return staffMemberJSX;
  };

  return (
    <section className="">
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-2">
        {createAndGetStaffAdminJSX()}
      </div>
    </section>
  );
};

export default StaffmemberList;

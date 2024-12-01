import { useContext } from "react";
import { StaffMemberContext } from "../../contexts/StaffMembersContext";
import IStaffContext from "../../interfaces/staffMembers/IStaffContext";
import StaffMemberItems from "./StaffMemberItems";

const StaffmemberList = () => {
  const { members } = useContext(StaffMemberContext) as IStaffContext;

  const createAndGetThoughtJSX = () => {
    const staffMemberJSX = members.map((member) => {
      return (
        <StaffMemberItems
          key={member.id}
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

  return <section>{createAndGetThoughtJSX()}</section>;
};

export default StaffmemberList;

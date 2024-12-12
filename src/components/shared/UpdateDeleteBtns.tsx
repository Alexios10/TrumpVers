import { FC } from "react";

interface UpdateDeleteButtonsProps {
  update: () => void;
  ondelete: () => void;
}

const UpdateDeleteBtns: FC<UpdateDeleteButtonsProps> = ({
  update,
  ondelete,
}) => {
  return (
    <div>
      <button
        className="update-delete-btns bg-green-500 hover:bg-green-600"
        onClick={update}
      >
        UPDATE
      </button>
      <button
        className="update-delete-btns bg-red-500 hover:bg-red-600"
        onClick={ondelete}
      >
        DELETE
      </button>
    </div>
  );
};

export default UpdateDeleteBtns;

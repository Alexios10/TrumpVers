import { FC } from "react";

interface UpdateDeleteButtonsProps {
  update: () => void;
  onDelete: () => void;
}

const UpdateDeleteBtns: FC<UpdateDeleteButtonsProps> = ({
  update,
  onDelete,
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
        onClick={onDelete}
      >
        DELETE
      </button>
    </div>
  );
};

export default UpdateDeleteBtns;

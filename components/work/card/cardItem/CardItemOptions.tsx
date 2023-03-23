import React from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { CardTypes } from "../../../../features/card/CardType";
import useClassGetter from "../../../../features/class/useClassGetter";
import Option from "../../../elements/Option";

interface Props {
  setIsEditing: any;
  setHovered: any;
  card: CardTypes;
  setIsDeleting: any;
  userId: string | undefined;
  hovered: boolean;
  allowOption: boolean;
}
function CardItemOptions({
  setIsEditing,
  setHovered,
  card,
  setIsDeleting,
  userId,
  hovered,
  allowOption,
}: Props) {
  const class_ = useClassGetter().getClass();
  const options = () => {
    let ret = [
      {
        text: "edit",
        icon: <HiOutlinePencil />,
        action: () => {
          setIsEditing(true);
          setHovered(false);
        },
      },
      {
        text: "delete",
        icon: <HiOutlineTrash />,
        action: () => {
          if (card?.sample) {
            return alert(
              "sample card will not be deleted. you can always add, edit and delete your own card instead."
            );
          }
          setIsDeleting(true);
        },
      },
    ];
    let notAllowed = [{ text: "you're not allowed" }];
    if (userId) {
      return userId == card?.userId || class_?.sample ? ret : notAllowed;
    } else {
      return class_?.sample ? ret : notAllowed;
    }
  };

  return (
    <span className="relative flex justify-end p-1 ">
      <div className="absolute">
        {allowOption && (
          <Option show={hovered} options={options()} left={true} />
        )}
      </div>
    </span>
  );
}

export default CardItemOptions;

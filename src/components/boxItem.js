import React from "react";
import { FaTimes, FaRegCircle, FaRegEdit } from "react-icons/fa";

const BoxItem = (props) => {
  const { icon, click, activeClass } = props;
  let iconToShow = null;
  switch (icon) {
    case "one":
      iconToShow = <FaTimes />;
      break;
    case "two":
      iconToShow = <FaRegCircle />;
      break;

    default:
      iconToShow = <FaRegEdit />;
      break;
  }
  return (
    <div className={`col-4  cell-content ${activeClass}`} onClick={click}>
      {iconToShow}
    </div>
  );
};
export default BoxItem;

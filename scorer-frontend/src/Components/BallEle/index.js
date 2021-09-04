import React from "react";

export default function BallEle({ type, value }) {
  const ballClass = (type) => {
    let className = "";
    switch (value) {
      case 4:
        className = "border-primary bg-primary text-white font-weight-bold";
        break;
      case 6:
        className = "border-info bg-info text-white font-weight-bold";
        break;

      default:
        break;
    }

    switch (type) {
      case "wkt":
        className = "border-danger bg-danger text-white font-weight-bold";

        break;

      default:
        break;
    }

    return className;
  };

  return (
    <div className="text-center  mr-2 mb-1">
      <div className={`run-value ${ballClass(type)}`}>{value}</div>
      <div>{type === "Run" ? "" : type}</div>
    </div>
  );
}

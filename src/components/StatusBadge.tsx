import React from "react";

interface StatusBadgeProps {
  text: string;
  bgColor: string | undefined;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ text, bgColor }) => {
  return (
    <span className={`text-white py-1 px-2 rounded-full ${bgColor}`}>
      {text}
    </span>
  );
};

export default StatusBadge;

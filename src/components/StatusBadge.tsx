import React from "react";

interface StatusBadgeProps {
  text: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ text }) => {
  const bgColor = (() => {
    switch (text) {
      case "未完了":
        return "bg-red-500";
      case "完了":
        return "bg-blue-500";
      case "途中":
        return "bg-green-500";
      default:
        return "bg-slate-500";
    }
  })();
  
  return (
    <span className={`text-white py-1 px-2 rounded-full ${bgColor}`}>
      {text}
    </span>
  );
};

export default StatusBadge;

import React from "react";

interface OverlayProps {
  show: boolean;
}

const Overlay: React.FC<OverlayProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"></div>
  );
};

export default Overlay;

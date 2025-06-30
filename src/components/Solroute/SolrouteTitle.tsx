import React from "react";

const SolrouteTitle: React.FC = () => {
  return (
    <div className="w-full h-50 py-4 flex justify-between items-center text-primary-950 text-sm font-normal leading-tight">
      <div className="w-42 h-42 pl-16 inline-flex justify-start items-center">
        <span>Solroute</span>
      </div>
      <div className="w-42 h-42 pr-16 inline-flex justify-end items-center">
        <span>Title</span>
      </div>
    </div>
  );
};

export default SolrouteTitle;
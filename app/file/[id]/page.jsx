import { getDocAPI } from "@/app/endpoints/docs";
import React from "react";

const FilePage = async ({ params }) => {
  const { id } = await params;

  const data = await getDocAPI(id);
  return (
    <div className="max-w-screen-sm mx-auto mt-20 border p-4 flex items-center justify-between">
      <h4 className="font-bold text-lg">{data.title}</h4>
      <a href={data.file_url} className="bg-slate-800 text-white rounded-md py-1 px-2">
        Download File
      </a>
    </div>
  );
};

export default FilePage;

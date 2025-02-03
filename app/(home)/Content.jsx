"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DeleteIcon from "./components/DeleteIcon";
import EditIcon from "./components/EditIcon";
import UploadForm from "./components/UploadForm";
import { createClient } from "../utils/client";
import { deleteDocAPI } from "../endpoints/docs";

const Content = ({ data }) => {
  const [edit, setEdit] = useState(null);
  const [docs, setDocs] = useState(data);
  const supabase = createClient();

  useEffect(() => {
    const data = supabase
      .channel("docChannel")
      .on(
        "postgres_changes",

        { event: "*", schema: "public", table: "docs" },
        (payload) => {
          console.log(payload);
          if (payload.eventType === "INSERT") {
            setDocs([payload.new, ...docs]);
          } else if (payload.eventType === "DELETE") {
            setDocs((prev) => prev.filter((el) => el.id !== payload.old.id));
          } else if (payload.eventType === "UPDATE") {
            setDocs((prev) =>
              prev.map((item) =>
                item.id === payload.new.id ? payload.new : item
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      data.unsubscribe();
    };
  }, []);

  const handleDelete = async (item) => {
    await deleteDocAPI(item);
  };

  return (
    <section>
      <div className="max-w-96 mx-auto">
        <UploadForm edit={edit} setEdit={setEdit} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mt-10">
        {docs.map((item) => (
          <div key={item.id} className="border rounded-md shadow-md p-4">
            <Link href={`/file/${item.id}`}>
              <h4 className="font-bold text-lg">{item.title}</h4>
            </Link>
            <div className="flex justify-between">
              <small>{item.date}</small>
              <div className="flex space-x-4">
                <EditIcon onClick={() => setEdit(item)} />
                <DeleteIcon onClick={() => handleDelete(item)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Content;

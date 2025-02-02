import Content from "./Content";
import { createClient } from "../utils/server";
import { redirect } from "next/navigation";

const data = [
  { id: 1, title: "Title one", date: new Date().toDateString() },
  { id: 2, title: "Title two", date: new Date().toDateString() },
  { id: 3, title: "Title three", date: new Date().toDateString() },
];

export default async function Home() {
  const supabase = await createClient();
  const res = await supabase.auth.getUser();

  if (!res.data.user) {
    redirect("/login");
  }
  return <Content data={data} />;
}

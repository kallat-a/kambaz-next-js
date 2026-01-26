import { redirect } from "next/navigation";

export default function Kambaz() {
  redirect("/account/signin");
  return (
    <div id="wd-kambaz">
      <h1>Kambaz</h1>
    </div>
  );
}

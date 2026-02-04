import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to login page - client app doesn't have a landing page
  redirect("/login");
}

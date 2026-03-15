import { redirect } from "next/navigation";

const validSlugs = ["premium-apartment", "standard-apartment"];

export default function AccommodationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!validSlugs.includes(params.slug)) {
    redirect("/accommodations");
  }

  redirect(`/accommodations#${params.slug}`);
}

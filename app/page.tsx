import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "Eden Little Ones Activity Centre | Lavington, Nairobi",
  description:
    "Where children learn through play. Book activities, birthday parties, school field trips and membership at Eden Little Ones in Lavington, Nairobi.",
};

export default function Home() {
  return <HomeContent />;
}

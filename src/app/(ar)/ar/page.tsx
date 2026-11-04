import { setRequestLocale } from "next-intl/server";
import { HomePage } from "@/components/pages/home-page";

export default function Page() {
  setRequestLocale("ar");
  return <HomePage />;
}

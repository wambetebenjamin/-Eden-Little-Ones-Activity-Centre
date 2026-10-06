import {
  Palette,
  ChefHat,
  FlaskConical,
  BookOpen,
  Music2,
  Code2,
  Sun,
  Waves,
  Drama,
  Bot,
  Leaf,
  LucideProps,
} from "lucide-react";
import { Activity } from "@/lib/data/activities";

// Strict icon map per the brief: "Palette for arts, flask for science,
// music-2 for music, code-2 for coding, sun for outdoor, cake for birthdays,
// users for groups, star (ratings only), calendar for booking,
// check-circle for inclusions, shield for safety, camera for gallery."
const ICONS: Record<Activity["icon"], React.ComponentType<LucideProps>> = {
  palette: Palette,
  "chef-hat": ChefHat,
  "flask-conical": FlaskConical,
  "book-open": BookOpen,
  "music-2": Music2,
  "code-2": Code2,
  sun: Sun,
  waves: Waves,
  drama: Drama,
  bot: Bot,
  leaf: Leaf,
};

export default function ActivityIcon({ icon, ...props }: { icon: Activity["icon"] } & LucideProps) {
  const Icon = ICONS[icon];
  return <Icon {...props} />;
}

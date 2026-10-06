export type AgeGroup = "toddlers" | "explorers" | "tweens";

export interface Activity {
  slug: string;
  name: string;
  ageGroup: AgeGroup;
  ageRange: string;
  duration: string;
  priceKES: number;
  schedule: string;
  image: string;
  icon:
    | "palette"
    | "chef-hat"
    | "flask-conical"
    | "book-open"
    | "music-2"
    | "code-2"
    | "sun"
    | "waves"
    | "drama"
    | "bot"
    | "leaf";
  shortDescription: string;
  description: string;
  willLearn: string[];
  materialsProvided: string[];
  whatToBring: string[];
}

export const ageGroups: { id: AgeGroup; label: string; range: string }[] = [
  { id: "toddlers", label: "Toddlers", range: "2 to 4" },
  { id: "explorers", label: "Little Explorers", range: "5 to 8" },
  { id: "tweens", label: "Tweens", range: "9 to 12" },
];

export const activities: Activity[] = [
  {
    slug: "arts-and-crafts",
    name: "Arts and Crafts",
    ageGroup: "toddlers",
    ageRange: "2 to 4",
    duration: "45 minutes",
    priceKES: 800,
    schedule: "Tue & Thu, 9:00am - 9:45am",
    image: "/images/activities/arts-and-crafts.jpg",
    icon: "palette",
    shortDescription: "Finger painting, collage and colour play for little hands.",
    description:
      "A sensory-rich art session where toddlers explore colour, texture and shape using paint, paper and safe, washable materials. Facilitators guide gently while letting imaginations lead.",
    willLearn: ["Colour recognition", "Fine motor control", "Following simple steps", "Sharing materials"],
    materialsProvided: ["Washable paints", "Aprons", "Paper and card", "Brushes and sponges"],
    whatToBring: ["A change of clothes", "Closed shoes"],
  },
  {
    slug: "storytelling",
    name: "Storytelling",
    ageGroup: "toddlers",
    ageRange: "2 to 4",
    duration: "30 minutes",
    priceKES: 600,
    schedule: "Mon, Wed & Fri, 10:00am - 10:30am",
    image: "/images/activities/storytelling.jpg",
    icon: "book-open",
    shortDescription: "Interactive tales, puppets and songs to build early language.",
    description:
      "Facilitators bring African folktales and picture books to life with puppets, songs and gentle movement, helping toddlers build vocabulary, listening skills and a love of stories.",
    willLearn: ["Early vocabulary", "Listening skills", "Turn-taking", "Imagination"],
    materialsProvided: ["Picture books", "Puppets", "Story mats"],
    whatToBring: ["Water bottle"],
  },
  {
    slug: "music-and-rhythm",
    name: "Music and Rhythm",
    ageGroup: "toddlers",
    ageRange: "2 to 4",
    duration: "40 minutes",
    priceKES: 700,
    schedule: "Wed, 11:00am - 11:40am",
    image: "/images/activities/music-and-rhythm.jpg",
    icon: "music-2",
    shortDescription: "Drums, shakers and singing games for rhythm and joy.",
    description:
      "A joyful mix of African drumming, nursery rhymes and movement games that develop rhythm, coordination and confidence in a warm group setting.",
    willLearn: ["Rhythm and beat", "Gross motor movement", "Group participation"],
    materialsProvided: ["Drums and shakers", "Song sheets for parents"],
    whatToBring: ["Comfortable clothing"],
  },
  {
    slug: "cooking-for-kids",
    name: "Cooking for Kids",
    ageGroup: "explorers",
    ageRange: "5 to 8",
    duration: "60 minutes",
    priceKES: 1200,
    schedule: "Sat, 9:00am - 10:00am",
    image: "/images/activities/cooking-for-kids.jpg",
    icon: "chef-hat",
    shortDescription: "No-bake treats and simple recipes, hygienically supervised.",
    description:
      "Children prepare simple, no-flame recipes such as fruit skewers and sandwiches, learning kitchen hygiene, measuring and teamwork under close facilitator supervision.",
    willLearn: ["Kitchen hygiene", "Measuring and counting", "Teamwork", "Healthy eating"],
    materialsProvided: ["Ingredients", "Aprons and chef hats", "Utensils"],
    whatToBring: ["None — allergies noted at booking"],
  },
  {
    slug: "science-lab",
    name: "Science Lab",
    ageGroup: "explorers",
    ageRange: "5 to 8",
    duration: "60 minutes",
    priceKES: 1300,
    schedule: "Tue & Thu, 2:00pm - 3:00pm",
    image: "/images/activities/science-lab.jpg",
    icon: "flask-conical",
    shortDescription: "Safe, hands-on experiments that spark curiosity.",
    description:
      "From fizzing volcanoes to colour-changing liquids, children run safe experiments guided by qualified facilitators, learning the basics of the scientific method.",
    willLearn: ["Cause and effect", "Scientific method basics", "Observation skills"],
    materialsProvided: ["All experiment kits", "Safety goggles", "Lab coats"],
    whatToBring: ["Closed shoes"],
  },
  {
    slug: "dance-and-movement",
    name: "Dance and Movement",
    ageGroup: "explorers",
    ageRange: "5 to 8",
    duration: "45 minutes",
    priceKES: 900,
    schedule: "Mon & Wed, 4:00pm - 4:45pm",
    image: "/images/activities/dance-and-movement.jpg",
    icon: "music-2",
    shortDescription: "Afrobeat, traditional and creative dance for confidence.",
    description:
      "A high-energy class blending Afrobeat and traditional Kenyan dance with creative movement, building confidence, coordination and fitness.",
    willLearn: ["Coordination", "Confidence on stage", "Cultural dance styles"],
    materialsProvided: ["Sound system", "Costume props for showcases"],
    whatToBring: ["Comfortable clothing", "Water bottle"],
  },
  {
    slug: "outdoor-adventure",
    name: "Outdoor Adventure",
    ageGroup: "explorers",
    ageRange: "5 to 8",
    duration: "90 minutes",
    priceKES: 1000,
    schedule: "Sat, 10:30am - 12:00pm",
    image: "/images/activities/outdoor-adventure.jpg",
    icon: "sun",
    shortDescription: "Obstacle courses, treasure hunts and team games outdoors.",
    description:
      "Set in our shaded Lavington garden, children tackle obstacle courses and treasure hunts that build teamwork, gross motor skills and a love of the outdoors.",
    willLearn: ["Teamwork", "Problem solving", "Physical fitness"],
    materialsProvided: ["Obstacle equipment", "Sunscreen station", "First aid on site"],
    whatToBring: ["Sun hat", "Closed shoes", "Water bottle"],
  },
  {
    slug: "coding-for-kids",
    name: "Coding for Kids",
    ageGroup: "tweens",
    ageRange: "9 to 12",
    duration: "60 minutes",
    priceKES: 1500,
    schedule: "Tue & Thu, 4:00pm - 5:00pm",
    image: "/images/activities/coding-for-kids.jpg",
    icon: "code-2",
    shortDescription: "Block-based coding and simple game building.",
    description:
      "Tweens learn programming logic through block-based coding tools, building simple games and animations, and progressing toward basic text-based coding concepts.",
    willLearn: ["Logical sequencing", "Problem decomposition", "Basic coding syntax"],
    materialsProvided: ["Laptops and tablets", "Coding worksheets"],
    whatToBring: ["None required"],
  },
  {
    slug: "robotics-basics",
    name: "Robotics Basics",
    ageGroup: "tweens",
    ageRange: "9 to 12",
    duration: "75 minutes",
    priceKES: 1800,
    schedule: "Sat, 1:00pm - 2:15pm",
    image: "/images/activities/robotics-basics.jpg",
    icon: "bot",
    shortDescription: "Build and programme simple robots with starter kits.",
    description:
      "Using beginner robotics kits, children build simple robots and programme basic movement and sensor behaviours, introducing STEM and engineering thinking.",
    willLearn: ["Basic engineering", "Sensor logic", "Collaboration"],
    materialsProvided: ["Robotics kits", "Tablets for programming"],
    whatToBring: ["None required"],
  },
  {
    slug: "drama-club",
    name: "Drama Club",
    ageGroup: "tweens",
    ageRange: "9 to 12",
    duration: "60 minutes",
    priceKES: 1000,
    schedule: "Mon & Wed, 4:00pm - 5:00pm",
    image: "/images/activities/drama-club.jpg",
    icon: "drama",
    shortDescription: "Improvisation, scripts and a termly showcase.",
    description:
      "Children build confidence through improvisation games, script reading and rehearsal, culminating in a termly showcase performance for parents.",
    willLearn: ["Public speaking", "Memory and expression", "Collaboration"],
    materialsProvided: ["Scripts", "Costumes for showcase"],
    whatToBring: ["Comfortable clothing"],
  },
  {
    slug: "nature-explorers",
    name: "Nature Explorers",
    ageGroup: "tweens",
    ageRange: "9 to 12",
    duration: "90 minutes",
    priceKES: 1100,
    schedule: "Sat, 9:00am - 10:30am",
    image: "/images/activities/nature-explorers.jpg",
    icon: "leaf",
    shortDescription: "Garden ecology, planting and nature journaling.",
    description:
      "Children explore our garden and nearby green spaces, learning about local plants, insects and ecology while keeping a nature journal of their discoveries.",
    willLearn: ["Basic ecology", "Observation and journaling", "Environmental care"],
    materialsProvided: ["Magnifying glasses", "Nature journals", "Planting tools"],
    whatToBring: ["Sun hat", "Closed shoes"],
  },
  {
    slug: "swimming-lessons",
    name: "Swimming Lessons",
    ageGroup: "explorers",
    ageRange: "5 to 8",
    duration: "40 minutes",
    priceKES: 1400,
    schedule: "Fri, 3:00pm - 3:40pm",
    image: "/images/activities/swimming-lessons.jpg",
    icon: "waves",
    shortDescription: "Water confidence and basic strokes with certified instructors.",
    description:
      "Qualified swim instructors build water confidence and basic strokes in our shallow learner pool, with a strict ratio of instructors to children at all times.",
    willLearn: ["Water safety", "Floating and basic strokes", "Breathing technique"],
    materialsProvided: ["Pool access", "Floatation aids", "Certified lifeguard on duty"],
    whatToBring: ["Swimsuit", "Towel", "Swim cap"],
  },
];

export function getActivityBySlug(slug: string) {
  return activities.find((a) => a.slug === slug);
}

export function getActivitiesByAgeGroup(group: AgeGroup) {
  return activities.filter((a) => a.ageGroup === group);
}

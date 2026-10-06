export interface TeamMember {
  name: string;
  specialisation: string;
  qualifications: string;
  funFact: string;
  image: string;
}

export const team: TeamMember[] = [
  {
    name: "Achieng Otieno",
    specialisation: "Arts & Crafts Lead",
    qualifications: "Diploma in Early Childhood Education, First Aid Certified",
    funFact: "Can fold an origami giraffe in under a minute.",
    image: "/images/team/facilitator-1.jpg",
  },
  {
    name: "Wanjiru Kamau",
    specialisation: "Science Lab Facilitator",
    qualifications: "BSc Chemistry, Child Safeguarding Certified",
    funFact: "Once built a volcano model that erupted three metres high.",
    image: "/images/team/facilitator-2.jpg",
  },
  {
    name: "Brian Mutiso",
    specialisation: "Outdoor & Sports Coordinator",
    qualifications: "Certificate in Sports Coaching, First Aid Certified",
    funFact: "Former national junior athletics coach.",
    image: "/images/team/facilitator-3.jpg",
  },
  {
    name: "Faith Nyambura",
    specialisation: "Music & Dance Instructor",
    qualifications: "Diploma in Performing Arts, Child Safeguarding Certified",
    funFact: "Has performed with a children's choir on national TV.",
    image: "/images/team/facilitator-4.jpg",
  },
  {
    name: "Samuel Kiptoo",
    specialisation: "Robotics & Coding Lead",
    qualifications: "BSc Computer Science, First Aid Certified",
    funFact: "Builds robot kits from recycled electronics on weekends.",
    image: "/images/team/facilitator-5.jpg",
  },
  {
    name: "Grace Adhiambo",
    specialisation: "Centre Director",
    qualifications: "MEd Early Childhood Development, Child Safeguarding Lead",
    funFact: "Has worked in child development across three East African countries.",
    image: "/images/team/facilitator-6.jpg",
  },
];

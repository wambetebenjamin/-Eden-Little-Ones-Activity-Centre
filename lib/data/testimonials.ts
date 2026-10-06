export interface Testimonial {
  parentName: string;
  childAge: number;
  activity: string;
  review: string;
  rating: number;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    parentName: "Mercy Wambui",
    childAge: 6,
    activity: "Science Lab",
    review:
      "My daughter now asks to do 'experiments' every weekend! The facilitators at Eden Little Ones made science so much fun for her.",
    rating: 5,
    image: "/images/testimonials/parent-1.jpg",
  },
  {
    parentName: "James Odhiambo",
    childAge: 9,
    activity: "Robotics Basics",
    review:
      "We booked the Eden Explorer Party for his birthday and it was flawless. The robotics taster during the party was a brilliant touch.",
    rating: 5,
    image: "/images/testimonials/parent-2.jpg",
  },
  {
    parentName: "Grace Chebet",
    childAge: 3,
    activity: "Arts and Crafts",
    review:
      "The staff are so patient and gentle with toddlers. It's clearly a safe, well-run place in Lavington and my son loves going every week.",
    rating: 5,
    image: "/images/testimonials/parent-3.jpg",
  },
  {
    parentName: "Peter Mwangi",
    childAge: 11,
    activity: "Coding for Kids",
    review:
      "Excellent curriculum-aligned programme. Our school brought 30 pupils for a field trip and the organisation was outstanding.",
    rating: 5,
    image: "/images/testimonials/parent-4.jpg",
  },
];

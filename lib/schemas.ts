import { z } from "zod";

export const phoneRegex = /^(\+254|0)[17]\d{8}$/;

export const bookingSchema = z.object({
  sessionId: z.string().min(1, "Please select a session"),
  numberOfChildren: z.coerce.number().min(1).max(20),
  childrenAges: z.string().min(1, "Please list the ages of attending children"),
  parentName: z.string().min(2, "Please enter your full name"),
  phone: z.string().regex(phoneRegex, "Enter a valid Kenyan phone number"),
  email: z.string().email("Enter a valid email address"),
  recaptchaToken: z.string().optional(),
});

export const birthdaySchema = z.object({
  parentName: z.string().min(2, "Please enter your full name"),
  phone: z.string().regex(phoneRegex, "Enter a valid Kenyan phone number"),
  email: z.string().email("Enter a valid email address"),
  childName: z.string().min(1, "Please enter the birthday child's name"),
  childAge: z.coerce.number().min(1).max(17),
  preferredDate: z.string().min(1, "Please choose a preferred date"),
  numberOfGuests: z.coerce.number().min(1).max(100),
  selectedPackage: z.string().min(1, "Please choose a package"),
  notes: z.string().optional(),
  recaptchaToken: z.string().optional(),
});

export const schoolBookingSchema = z.object({
  schoolName: z.string().min(2, "Please enter the school name"),
  teacherName: z.string().min(2, "Please enter the teacher's name"),
  phone: z.string().regex(phoneRegex, "Enter a valid Kenyan phone number"),
  email: z.string().email("Enter a valid email address"),
  numberOfChildren: z.coerce.number().min(15, "Group bookings require 15 or more children"),
  ages: z.string().min(1, "Please describe the age range"),
  preferredDate: z.string().min(1, "Please choose a preferred date"),
  activitiesOfInterest: z.string().min(1, "Please list activities of interest"),
  recaptchaToken: z.string().optional(),
});

export const membershipSchema = z.object({
  parentName: z.string().min(2, "Please enter your full name"),
  phone: z.string().regex(phoneRegex, "Enter a valid Kenyan phone number"),
  email: z.string().email("Enter a valid email address"),
  tier: z.string().min(1, "Please choose a membership tier"),
  numberOfChildren: z.coerce.number().min(1).max(5),
  recaptchaToken: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().regex(phoneRegex, "Enter a valid Kenyan phone number").optional().or(z.literal("")),
  message: z.string().min(10, "Please enter a short message"),
  recaptchaToken: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  childAgeGroup: z.enum(["toddlers", "explorers", "tweens"]),
  recaptchaToken: z.string().optional(),
});

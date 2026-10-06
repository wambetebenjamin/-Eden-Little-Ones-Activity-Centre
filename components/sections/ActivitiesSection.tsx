"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ageGroups, getActivitiesByAgeGroup, AgeGroup } from "@/lib/data/activities";
import ActivityCard from "@/components/sections/ActivityCard";
import { Reveal } from "@/components/MotionReveal";

export default function ActivitiesSection({
  activeGroup,
  onSelectGroup,
}: {
  activeGroup: AgeGroup;
  onSelectGroup: (g: AgeGroup) => void;
}) {
  const activitiesForGroup = getActivitiesByAgeGroup(activeGroup);

  return (
    <section id="activities" className="bg-light py-20">
      <div className="container-eden">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow mb-4">Our Activities</span>
          <h2 className="mb-4 text-3xl sm:text-4xl">Hands-On Activities for Every Age</h2>
          <p className="text-body text-ink">
            Arts, science, music, movement, coding and more — tabbed by age group so
            you can find the right fit for your child.
          </p>
        </Reveal>

        <div className="mb-10 flex gap-3 overflow-x-auto pb-2 sm:justify-center">
          {ageGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => onSelectGroup(group.id)}
              className={`btn-eden min-h-[48px] shrink-0 ${
                activeGroup === group.id
                  ? "btn-eden-primary"
                  : "border-2 border-dark bg-white text-dark hover:bg-primary/10"
              }`}
            >
              {group.label} ({group.range})
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {activitiesForGroup.map((activity, i) => (
              <ActivityCard key={activity.slug} activity={activity} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

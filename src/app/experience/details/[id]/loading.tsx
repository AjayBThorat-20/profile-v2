import ExperienceDetailsSkeleton from "@/Components/Skeletons/ExperienceDetailsSkeleton";

// Next renders this automatically while the route segment is in flight. The
// pages themselves are statically generated, so on a fast connection it barely
// shows - but a client-side navigation still has to fetch the segment's RSC
// payload, and on a slow one that was previously a blank pause on the old page
// with no sign anything was happening.
export default function Loading() {
  return <ExperienceDetailsSkeleton />;
}

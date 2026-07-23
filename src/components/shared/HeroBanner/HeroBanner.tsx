import { Sparkles } from "lucide-react";

import StatCard from "../StatCard/StatCard";

interface HeroBannerProps {
  username?: string;
  postsCount: number;
  photosCount: number;
}

const HeroBanner = ({ username, postsCount, photosCount }: HeroBannerProps) => {
  const greeting = username ? `Welcome back, ${username}` : "Welcome back";

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-indigo-500/20 bg-gradient-to-br from-slate-900 via-indigo-900 to-violet-700 p-8 text-white shadow-[0_30px_80px_-20px_rgba(79,70,229,0.55)]">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-indigo-100 backdrop-blur">
            <Sparkles size={14} />
            Live content board
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.6rem]">
            {greeting}, your next story is waiting.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-indigo-100/90 sm:text-base">
            Discover the newest posts and photos in a vibrant workspace built for quick browsing,
            smooth navigation, and a polished dashboard experience.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <StatCard label="Posts" value={postsCount} />
          <StatCard label="Photos" value={photosCount} />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

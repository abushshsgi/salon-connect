import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MapPin, Star, ChevronRight, Bell } from "lucide-react";
import { useTranslation } from "react-i18next";
import { salons, userProfile, notifications } from "@/lib/mock-data";
import type { Category } from "@/lib/mock-data";
import { SalonCard } from "@/components/SalonCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "mysaloon.uz — Sartaroshxona va salon bron qiling" },
      {
        name: "description",
        content: "O'zbekistondagi sartaroshlar va go'zallik salonlarini online bron qiluvchi platforma.",
      },
    ],
  }),
  component: Home,
});

const CATEGORIES: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "Barchasi" },
  { key: "barber", label: "Barber" },
  { key: "beauty", label: "Go'zallik" },
  { key: "nails", label: "Manikyur" },
  { key: "spa", label: "Spa" },
];

function Home() {
  const { t } = useTranslation();
  const [cat, setCat] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");
  const unread = notifications.filter((n) => !n.read).length;

  const firstName = userProfile.name.split(" ")[0];
  const filtered = salons.filter(
    (s) =>
      (cat === "all" || s.category === cat) &&
      (query === "" || s.name.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div>
      {/* Header */}
      <header
        className="px-5 pt-4 pb-3"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 16px)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {t("home.greeting")}
            </p>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight">
              {firstName} 👋
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/notifications"
              className="relative grid h-11 w-11 place-items-center rounded-full bg-surface active:scale-95"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" strokeWidth={2} />
              {unread > 0 && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-foreground ring-2 ring-background" />
              )}
            </Link>
            <Link
              to="/profile"
              className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-foreground text-background"
              aria-label="Profile"
            >
              <span className="text-sm font-bold">
                {firstName.slice(0, 1).toUpperCase()}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="px-5 pt-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("common.search")}
            className="w-full rounded-2xl border-0 bg-surface py-3.5 pl-11 pr-4 text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto px-5">
        {CATEGORIES.map((c) => {
          const active = cat === c.key;
          return (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-[12px] font-bold tracking-wide transition-colors",
                active
                  ? "bg-foreground text-background"
                  : "bg-surface text-foreground",
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Nearby */}
      <section className="mt-8 px-5">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-lg font-bold tracking-tight">{t("home.nearby")}</h2>
          <Link
            to="/map"
            className="flex items-center text-[12px] font-bold text-foreground"
          >
            {t("common.viewMap")} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-5">
          {filtered.map((s) => (
            <SalonCard key={s.id} salon={s} />
          ))}
        </div>
      </section>

      {/* Mini map */}
      <section className="mt-8 px-5">
        <Link
          to="/map"
          className="relative block h-32 overflow-hidden rounded-2xl bg-surface"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(45deg, transparent 48%, oklch(0.88 0.018 85) 49%, oklch(0.88 0.018 85) 51%, transparent 52%), linear-gradient(-45deg, transparent 48%, oklch(0.88 0.018 85) 49%, oklch(0.88 0.018 85) 51%, transparent 52%)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 rounded-full bg-background px-4 py-2 shadow-lg">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-bold">{t("common.viewMap")}</span>
            </div>
          </div>
          <div className="absolute left-1/3 top-1/3 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground ring-4 ring-foreground/15 animate-pulse" />
          <div className="absolute right-1/4 bottom-1/3 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground ring-4 ring-foreground/15" />
        </Link>
      </section>

      {/* Trust strip */}
      <section className="mx-5 mt-8 rounded-2xl border border-border bg-surface/50 p-5">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xl font-bold">120+</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Salon
            </p>
          </div>
          <div className="border-x border-border">
            <p className="text-xl font-bold">450+</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Usta
            </p>
          </div>
          <div>
            <p className="text-xl font-bold">4.9</p>
            <p className="mt-1 flex items-center justify-center gap-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              <Star className="h-3 w-3 fill-foreground" /> Reyting
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

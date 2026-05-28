import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Star, SlidersHorizontal, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { salons, shortPrice } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Xarita — mysaloon.uz" },
      { name: "description", content: "Yaqin atrofdagi salonlar va ustalarni xaritada toping." },
    ],
  }),
  component: MapView,
});

function MapView() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"salons" | "barbers">("salons");
  const [active, setActive] = useState(salons[0].id);
  const activeSalon = salons.find((s) => s.id === active) ?? salons[0];

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-surface">
      {/* Fake map */}
      <div className="absolute inset-0">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(45deg, transparent 48%, oklch(0.92 0.018 85) 49%, oklch(0.92 0.018 85) 51%, transparent 52%), linear-gradient(-45deg, transparent 48%, oklch(0.92 0.018 85) 49%, oklch(0.92 0.018 85) 51%, transparent 52%), linear-gradient(0deg, oklch(0.945 0.014 85), oklch(0.945 0.014 85))",
            backgroundSize: "48px 48px, 48px 48px, 100% 100%",
          }}
        />
        {/* Markers */}
        {salons.map((s, i) => {
          const positions = [
            { top: "30%", left: "40%" },
            { top: "45%", left: "60%" },
            { top: "55%", left: "30%" },
            { top: "65%", left: "55%" },
          ];
          const pos = positions[i % positions.length];
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <div
                className={cn(
                  "grid place-items-center rounded-full text-background transition-all",
                  isActive
                    ? "h-12 w-12 bg-foreground ring-4 ring-foreground/20"
                    : "h-9 w-9 bg-foreground/80",
                )}
              >
                <MapPin className="h-4 w-4 fill-background" strokeWidth={0} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Top header */}
      <div className="absolute inset-x-0 top-0 z-10">
        <PageHeader showBack transparent right={
          <button className="grid h-10 w-10 place-items-center rounded-full bg-background shadow-sm active:scale-95">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        } />

        {/* Tab pill */}
        <div className="mx-auto mt-2 flex w-fit gap-1 rounded-full bg-background p-1 shadow-lg">
          {(["salons", "barbers"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={cn(
                "rounded-full px-5 py-2 text-[12px] font-bold tracking-wide transition-colors",
                tab === k ? "bg-foreground text-background" : "text-foreground",
              )}
            >
              {t(`map.${k}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom card */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 px-4"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 88px)" }}
      >
        <Link
          to="/salon/$id"
          params={{ id: activeSalon.id }}
          className="block rounded-2xl bg-background p-4 shadow-2xl"
        >
          <div className="flex gap-3">
            <div
              className="h-20 w-20 shrink-0 rounded-xl"
              style={{
                background: `linear-gradient(135deg, oklch(0.85 0.04 ${(Number(activeSalon.id) * 80) % 360}), oklch(0.55 0.06 ${(Number(activeSalon.id) * 80 + 50) % 360}))`,
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="truncate text-base font-bold">{activeSalon.name}</h3>
                <button className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-1 truncate text-xs font-medium text-muted-foreground">
                {activeSalon.address}
              </p>
              <div className="mt-2 flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 font-bold">
                  <Star className="h-3 w-3 fill-foreground" />
                  {activeSalon.rating}
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="font-bold">{activeSalon.distanceKm} km</span>
                <span className="text-muted-foreground">·</span>
                <span className="font-bold">{shortPrice(activeSalon.priceFrom)}+</span>
              </div>
            </div>
          </div>
          <button className="mt-3 w-full rounded-xl bg-foreground py-2.5 text-[12px] font-bold tracking-wide text-background">
            {t("salon.bookNow")}
          </button>
        </Link>
      </div>
    </div>
  );
}

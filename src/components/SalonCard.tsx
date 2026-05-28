import { Link } from "@tanstack/react-router";
import { Star, MapPin } from "lucide-react";
import type { Salon } from "@/lib/mock-data";
import { shortPrice } from "@/lib/mock-data";

export function SalonCard({ salon }: { salon: Salon }) {
  return (
    <Link
      to="/salon/$id"
      params={{ id: salon.id }}
      className="group block active:scale-[0.98] transition-transform"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, oklch(0.85 0.04 ${(Number(salon.id) * 80) % 360}), oklch(0.55 0.06 ${(Number(salon.id) * 80 + 50) % 360}))`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-[11px] font-bold">
          <Star className="h-3 w-3 fill-foreground" />
          {salon.rating.toFixed(1)}
        </div>
        <div className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-[0.15em] text-background/80">
          {salon.category}
        </div>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold tracking-tight">{salon.name}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{salon.address}</span>
            <span>·</span>
            <span className="shrink-0">{salon.distanceKm} km</span>
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
            dan
          </p>
          <p className="text-sm font-bold">{shortPrice(salon.priceFrom)}</p>
        </div>
      </div>
    </Link>
  );
}

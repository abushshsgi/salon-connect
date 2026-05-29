import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useAudience, type AudienceFilter } from "@/hooks/use-audience";

const OPTS: { key: AudienceFilter; tKey: string; fallback: string }[] = [
  { key: "all", tKey: "audience.all", fallback: "Hammasi" },
  { key: "men", tKey: "audience.men", fallback: "Erkaklar" },
  { key: "women", tKey: "audience.women", fallback: "Ayollar" },
];

export function AudienceSwitch() {
  const { t } = useTranslation();
  const { audience, setAudience } = useAudience();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5"
      role="tablist"
      aria-label="Audience filter"
    >
      {OPTS.map((o) => {
        const active = audience === o.key;
        return (
          <button
            key={o.key}
            role="tab"
            aria-selected={active}
            onClick={() => setAudience(o.key)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-[12px] font-bold tracking-wide transition-colors",
              active
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-foreground/70 hover:text-foreground",
            )}
          >
            <span suppressHydrationWarning>
              {mounted ? t(o.tKey) : o.fallback}
            </span>
          </button>
        );
      })}
    </div>
  );
}

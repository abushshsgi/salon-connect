import { Users, User as UserIcon, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useAudience, type AudienceFilter } from "@/hooks/use-audience";

const OPTS: { key: AudienceFilter; icon: typeof Users; tKey: string }[] = [
  { key: "all", icon: Users, tKey: "audience.all" },
  { key: "men", icon: UserIcon, tKey: "audience.men" },
  { key: "women", icon: UserRound, tKey: "audience.women" },
];

export function AudienceSwitch() {
  const { t } = useTranslation();
  const { audience, setAudience } = useAudience();

  return (
    <div className="grid grid-cols-3 gap-1 rounded-2xl bg-surface p-1">
      {OPTS.map((o) => {
        const active = audience === o.key;
        const Icon = o.icon;
        return (
          <button
            key={o.key}
            onClick={() => setAudience(o.key)}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[12px] font-bold tracking-wide transition-all",
              active
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground active:scale-95",
            )}
            aria-pressed={active}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={2.4} />
            {t(o.tKey)}
          </button>
        );
      })}
    </div>
  );
}

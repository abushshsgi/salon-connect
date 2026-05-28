import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { chatThreads } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "Chat — mysaloon.uz" }] }),
  component: ChatList,
});

function ChatList() {
  const { t } = useTranslation();

  if (chatThreads.length === 0) {
    return (
      <>
        <PageHeader title={t("chat.title")} />
        <EmptyState icon={<MessageSquare className="h-7 w-7" />} title={t("chat.empty")} />
      </>
    );
  }

  return (
    <div>
      <PageHeader title={t("chat.title")} />
      <div className="divide-y divide-border">
        {chatThreads.map((c) => (
          <Link
            key={c.id}
            to="/chat/$id"
            params={{ id: c.id }}
            className="block px-5 py-4 transition-colors active:bg-surface"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="truncate text-sm font-bold">{c.barberName}</h3>
              <span className="shrink-0 text-[11px] font-bold text-muted-foreground">
                {c.lastTime}
              </span>
            </div>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {c.salonName}
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <p className="truncate flex-1 text-xs text-muted-foreground">
                {c.lastMessage}
              </p>
              {c.unread > 0 && (
                <span className="grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-foreground px-1.5 text-[10px] font-bold text-background">
                  {c.unread}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

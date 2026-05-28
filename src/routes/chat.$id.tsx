import { createFileRoute, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { chatMessages, chatThreads } from "@/lib/mock-data";
import { PageHeader } from "@/components/PageHeader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat/$id")({
  head: () => ({ meta: [{ title: "Chat — mysaloon.uz" }] }),
  component: ChatThread,
});

function ChatThread() {
  const { t } = useTranslation();
  const { id } = useParams({ from: "/chat/$id" });
  const thread = chatThreads.find((c) => c.id === id) ?? chatThreads[0];
  const [messages, setMessages] = useState(chatMessages[id] ?? []);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `m${prev.length + 1}`,
        fromMe: true,
        text: input,
        time: new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setInput("");
  };

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <PageHeader
        showBack
        title={thread.barberName}
        sticky
        right={
          <div className="grid h-10 w-10 place-items-center rounded-full bg-foreground text-sm font-bold text-background">
            {thread.barberName.split(" ").map((n) => n[0]).join("")}
          </div>
        }
      />

      <div className="flex-1 space-y-3 px-4 py-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn("flex", m.fromMe ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[78%] rounded-2xl px-4 py-2.5",
                m.fromMe
                  ? "bg-foreground text-background rounded-br-md"
                  : "bg-surface text-foreground rounded-bl-md",
              )}
            >
              <p className="text-sm font-medium">{m.text}</p>
              <p
                className={cn(
                  "mt-1 text-[10px] font-bold",
                  m.fromMe ? "text-background/60" : "text-muted-foreground",
                )}
              >
                {m.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="sticky bottom-0 z-20 border-t border-border bg-background/95 px-3 pt-3 backdrop-blur-md lg:left-[240px]"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 88px)" }}
      >
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={t("chat.placeholder")}
            className="flex-1 rounded-2xl border-0 bg-surface px-4 py-3 text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={cn(
              "grid h-12 w-12 shrink-0 place-items-center rounded-full transition-all",
              input.trim()
                ? "bg-foreground text-background active:scale-95"
                : "bg-surface-2 text-muted-foreground",
            )}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

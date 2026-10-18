import type { IconName } from "@/components/ui/Icon";
import type { RouteKey } from "./routes";

export type BusinessLineKey = "trading" | "ai";

/** Visual identity for each business line (route, icon, accent hue, image). */
export const businessLines: Record<
  BusinessLineKey,
  { route: RouteKey; icon: IconName; text: string; softBg: string; image: string }
> = {
  trading: {
    route: "trading",
    icon: "trading",
    text: "text-trading",
    softBg: "bg-trading-soft",
    image: "/images/placeholders/trading.svg",
  },
  ai: {
    route: "ai",
    icon: "ai",
    text: "text-ai",
    softBg: "bg-ai-soft",
    image: "/images/placeholders/ai.svg",
  },
};

export const businessLineKeys = Object.keys(businessLines) as BusinessLineKey[];

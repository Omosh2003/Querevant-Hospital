import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank you | Qurevant Health Group" },
      {
        name: "description",
        content:
          "Thank you for contacting Qurevant Health Group. Our team has received your enquiry and will be in touch.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Thank you | Qurevant Health Group" },
      {
        property: "og:description",
        content: "We've received your enquiry and will be in touch shortly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-5">
          <Link to="/" aria-label="Qurevant Health Group — back to home">
            <img src={logo} alt="" width={1504} height={411} className="h-10 w-auto" />
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="max-w-lg text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-primary" aria-hidden="true" />
          <h1 className="mt-6 text-3xl sm:text-4xl">Thank you — we've received your enquiry</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            A member of the Qurevant Health Group team will get back to you shortly at the email
            address you provided. If your matter is urgent, you can reach us right away on
            WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="xl">
              <a
                href="https://wa.me/254785334854"
                target="_blank"
                rel="noreferrer"
                aria-label="Chat with us on WhatsApp: 0785 334 854 (opens in a new tab)"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp 0785 334 854
              </a>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

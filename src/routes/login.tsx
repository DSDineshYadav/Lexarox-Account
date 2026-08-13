import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — LexaRox Accounts" },
      { name: "description", content: "Sign in to the LexaRox AI-first accountancy operations platform." },
      { property: "og:title", content: "Sign in — LexaRox Accounts" },
      { property: "og:description", content: "Secure access to your LexaRox accountancy workspace." },
    ],
  }),
  component: Login,
});

function Login() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <img src="/logo.png" alt="LexaRox Accounts" className="h-11 w-auto object-contain object-left" />
          <h1 className="mt-8 text-2xl font-semibold">Sign in to your workspace</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back. Your AI agents have been working overnight.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/";
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" defaultValue="andrea@lexarox.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="demo-password" />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <Checkbox defaultChecked /> Keep me signed in
              </label>
              <button type="button" className="text-sm text-primary hover:underline">
                Forgot password?
              </button>
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" /> Single sign-on and audit logging are configured by your
            administrator.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Prototype access —{" "}
            <Link to="/" className="text-primary hover:underline">
              continue to the dashboard
            </Link>
          </p>
        </div>
      </div>

      <div className="ai-surface hidden flex-col justify-between p-12 lg:flex">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-[var(--ai)]">
          <Sparkles className="h-3.5 w-3.5" /> AI operations layer
        </span>
        <div>
          <p className="text-3xl font-semibold leading-tight tracking-tight">
            AI handles the work.
            <br />
            You handle the decisions.
          </p>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Documents processed, exceptions detected, emails prepared and onboarding guided — before your
            first coffee. You review what matters.
          </p>
        </div>
        <dl className="grid grid-cols-3 gap-6">
          {[
            ["126", "AI actions today"],
            ["18", "Awaiting review"],
            ["1,284", "Active clients"],
          ].map(([v, l]) => (
            <div key={l}>
              <dt className="text-2xl font-semibold">{v}</dt>
              <dd className="text-xs text-muted-foreground">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

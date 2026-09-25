import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContactEnquiry } from "@/lib/contact.functions";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

type Errors = Partial<Record<keyof ContactInput, string>>;

const empty: ContactInput = { name: "", email: "", phone: "", message: "" };

export function ContactForm() {
  const navigate = useNavigate();
  const send = useServerFn(submitContactEnquiry);
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (data: ContactInput) => send({ data }),
    onSuccess: (res) => {
      if (res.ok) navigate({ to: "/thank-you" });
      else
        setFormError(
          "We couldn't send your message by email just yet. Please reach us on WhatsApp 0785 334 854 or at qurevanthealthgroup@gmail.com.",
        );
    },
    onError: () =>
      setFormError(
        "Something went wrong sending your message. Please try again, or reach us on WhatsApp 0785 334 854.",
      ),
  });

  const update = (key: keyof ContactInput) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof ContactInput;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    mutation.mutate(parsed.data);
  };

  const field = "bg-background text-foreground";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="contact-form-title"
      className="rounded-2xl bg-background p-6 text-foreground shadow-soft sm:p-8"
    >
      <h3 id="contact-form-title" className="text-2xl">
        Send us an enquiry
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        We usually reply within one working day.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {(
          [
            ["name", "Full name", "text", "name"],
            ["email", "Email address", "email", "email"],
          ] as const
        ).map(([key, label, type, auto]) => (
          <div key={key} className="space-y-2">
            <Label htmlFor={`contact-${key}`}>{label}</Label>
            <Input
              id={`contact-${key}`}
              type={type}
              autoComplete={auto}
              value={values[key]}
              onChange={update(key)}
              aria-invalid={!!errors[key]}
              aria-describedby={errors[key] ? `contact-${key}-error` : undefined}
              className={field}
            />
            {errors[key] && (
              <p id={`contact-${key}-error`} className="text-sm text-destructive">
                {errors[key]}
              </p>
            )}
          </div>
        ))}
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="contact-phone">Phone (optional)</Label>
          <Input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={update("phone")}
            aria-invalid={!!errors.phone}
            className={field}
          />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="contact-message">How can we help?</Label>
          <Textarea
            id="contact-message"
            rows={5}
            maxLength={1000}
            value={values.message}
            onChange={update("message")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={field}
          />
          {errors.message && (
            <p id="contact-message-error" className="text-sm text-destructive">
              {errors.message}
            </p>
          )}
        </div>
      </div>
      {formError && (
        <p role="alert" className="mt-5 rounded-lg bg-muted p-3 text-sm">
          {formError}
        </p>
      )}
      <Button type="submit" variant="hero" size="xl" className="mt-6" disabled={mutation.isPending}>
        {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {mutation.isPending ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}

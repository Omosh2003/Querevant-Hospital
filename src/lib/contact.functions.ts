import { createServerFn } from "@tanstack/react-start";

import { contactSchema } from "./contact-schema";

export type ContactResult =
  | { ok: true }
  | {
      ok: false;
      reason: "email_not_configured" | "send_failed";
      message: string;
    };

export const submitContactEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data) => contactSchema.parse(data))
  .handler(async ({ data }): Promise<ContactResult> => {
    // Email delivery connects here once the sender domain setup is finished.
    // TODO: send via the managed email helper (sendTemplateEmail, template
    // "contact-enquiry") to qurevanthealthgroup@gmail.com, with the sender's
    // address in templateData so the team can reply directly.
    void data;
    return {
      ok: false,
      reason: "email_not_configured",
      message: "Our email service is still being connected.",
    };
  });

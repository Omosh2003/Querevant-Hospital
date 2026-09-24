import { createOpenAI } from "@ai-sdk/openai";
import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";

import { createLovableAiGatewayRunIdFetch } from "./ai-gateway.server";

const GuidanceInput = z.object({
  question: z.string().min(5).max(1500),
});

const SYSTEM_PROMPT = `You are the health guidance assistant for Qurevant Health Group, a Kenyan healthcare organisation with locations in Nairobi, Mombasa and Lamu.

Qurevant's three service pillars:
A. Preventative Care — health risk assessments & screenings, wellness and lifestyle management programmes, chronic disease prevention and health education, corporate wellness programmes, health check packages.
B. Rehabilitative Care — physiotherapy and physical rehabilitation, occupational therapy, post-surgical and post-stroke rehabilitation, sports injury rehabilitation, pain management and functional restoration.
C. Occupational Safety & Health — workplace risk assessments and safety audits, OSH training and compliance (first aid, fire safety, OSHA), employee medicals and fitness-to-work assessments, health and safety policy development, incident investigation and safety culture programmes.

Given a visitor's question, reply in warm, plain English with:
1. A short paragraph of general, non-diagnostic health information.
2. A brief "What we'd suggest at Qurevant" section naming the specific services above that fit their situation.
3. One sentence inviting them to book a consultation on WhatsApp 0785 334 854 or email qurevanthealthgroup@gmail.com.

Rules: never diagnose, never prescribe medication or dosages, never promise outcomes. If the question suggests an emergency (chest pain, severe bleeding, stroke signs, breathing difficulty, suicidal thoughts), open by telling them to seek emergency care immediately. Keep the whole reply under 220 words. Use short paragraphs, no markdown headings or asterisks.`;

export const getHealthGuidance = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => GuidanceInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured for this site.");

    const runIdFetch = createLovableAiGatewayRunIdFetch();
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: {
        "Lovable-API-Key": key,
        "X-Lovable-AIG-SDK": "vercel-ai-sdk",
      },
      fetch: runIdFetch.fetch,
    });

    const result = streamText({
      model: lovable.responses("openai/gpt-6-astra"),
      system: SYSTEM_PROMPT,
      prompt: data.question,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    const text = await result.text;
    return {
      guidance:
        text.trim() ||
        "We couldn't put together guidance for that just now. Please send us your question on WhatsApp and our team will respond personally.",
    };
  });

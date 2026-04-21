"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      // Prototype: log to console + simulate success
      // Swap for POST /api/contact when SMTP is wired up
      console.info("[contact]", data);
      await new Promise((r) => setTimeout(r, 500));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="py-10 text-center">
        <p className="font-serif text-h2 text-gold">Dank u.</p>
        <p className="mt-3 text-body text-charcoal-soft">
          We hebben uw bericht ontvangen en antwoorden zo snel mogelijk.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="eyebrow block mb-2">Naam</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="input-editorial"
          autoComplete="name"
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="eyebrow block mb-2">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input-editorial"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="phone" className="eyebrow block mb-2">Telefoon</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="input-editorial"
            autoComplete="tel"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="eyebrow block mb-2">Onderwerp</label>
        <select id="subject" name="subject" className="input-editorial" defaultValue="">
          <option value="" disabled>Kies een onderwerp</option>
          <option>Offerte buffet / feest</option>
          <option>Koffietafel</option>
          <option>Babyborrel</option>
          <option>Feestzaal reserveren</option>
          <option>Webshop bestelling</option>
          <option>Iets anders</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="eyebrow block mb-2">Uw bericht</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="input-editorial resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary disabled:opacity-60"
      >
        {status === "sending" ? "Bezig met verzenden..." : "Verstuur bericht"}
      </button>
      {status === "error" && (
        <p className="text-small text-[color:var(--color-error)]">
          Er ging iets mis. Probeer opnieuw of bel ons direct.
        </p>
      )}
    </form>
  );
}

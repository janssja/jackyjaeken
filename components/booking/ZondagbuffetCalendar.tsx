"use client";

import { useState } from "react";
import type { ZondagbuffetSlot } from "@/lib/types";
import { formatDateNL, formatEUR } from "@/lib/format";
import { cn } from "@/lib/cn";
import { GuestTierInput, type Guests } from "./GuestTierInput";
import { useCart, newLineId } from "@/lib/cart/store";

export function ZondagbuffetCalendar({ slots }: { slots: ZondagbuffetSlot[] }) {
  const addLine = useCart((s) => s.addLine);
  const [selectedId, setSelectedId] = useState<string | undefined>(
    slots.find((s) => s.status === "open")?._id
  );
  const [guests, setGuests] = useState<Guests>({
    adult: 2,
    youth: 0,
    child: 0,
    toddler: 0,
  });
  const [added, setAdded] = useState(false);

  const slot = slots.find((s) => s._id === selectedId);
  const seatsLeft = slot ? slot.capacity - slot.booked : 0;
  const totalGuests = guests.adult + guests.youth + guests.child + guests.toddler;

  const total = slot
    ? guests.adult * slot.priceAdult +
      guests.youth * slot.priceYouth +
      guests.child * slot.priceChild +
      guests.toddler * slot.priceToddler
    : 0;

  const overCapacity = slot ? totalGuests > seatsLeft : false;
  const noGuests = totalGuests === 0;
  const canBook = slot && !overCapacity && !noGuests && slot.status === "open";

  function handleBook() {
    if (!canBook || !slot) return;
    addLine({
      id: newLineId(),
      kind: "zondagbuffet",
      slotId: slot._id,
      date: slot.date,
      guests,
      snapshot: {
        image:
          "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop",
        priceAdult: slot.priceAdult,
        priceYouth: slot.priceYouth,
        priceChild: slot.priceChild,
        priceToddler: slot.priceToddler,
      },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  }

  return (
    <div className="grid gap-10 md:grid-cols-12">
      <div className="md:col-span-7">
        <p className="eyebrow mb-6">Kies een zondag</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {slots.map((s) => {
            const left = s.capacity - s.booked;
            const disabled = s.status !== "open" || left <= 0;
            const active = s._id === selectedId;
            return (
              <button
                key={s._id}
                type="button"
                onClick={() => !disabled && setSelectedId(s._id)}
                disabled={disabled}
                className={cn(
                  "text-left p-5 border transition-all",
                  disabled && "opacity-40 cursor-not-allowed",
                  active
                    ? "bg-charcoal text-cream border-charcoal"
                    : "border-line hover:border-line-strong"
                )}
              >
                <p
                  className={cn(
                    "font-serif text-h3",
                    active ? "text-cream" : "text-charcoal"
                  )}
                >
                  {formatDateNL(s.date)}
                </p>
                <p
                  className={cn(
                    "text-small mt-1",
                    active ? "text-cream/70" : "text-muted"
                  )}
                >
                  {disabled
                    ? s.status === "closed"
                      ? "Volgeboekt"
                      : "Gesloten"
                    : `${left} plaatsen vrij`}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="md:col-span-5 md:sticky md:top-[120px] md:self-start">
        <div className="bg-cream-deep p-8">
          {slot ? (
            <>
              <p className="eyebrow mb-4">Uw reservering</p>
              <p className="font-serif text-h2 mb-6">{formatDateNL(slot.date)}</p>

              <GuestTierInput
                value={guests}
                onChange={setGuests}
                prices={{
                  adult: slot.priceAdult,
                  youth: slot.priceYouth,
                  child: slot.priceChild,
                  toddler: slot.priceToddler,
                }}
              />

              <div className="rule my-6" />

              <div className="flex items-baseline justify-between mb-4">
                <span className="eyebrow">Totaal</span>
                <span className="font-serif text-h2">{formatEUR(total)}</span>
              </div>

              {overCapacity && (
                <p className="text-small text-[color:var(--color-error)] mb-3">
                  Slechts {seatsLeft} plaatsen vrij — pas uw gezelschap aan.
                </p>
              )}

              <button
                type="button"
                onClick={handleBook}
                disabled={!canBook}
                className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {added ? "Toegevoegd ✓" : "Reserveer deze zondag"}
              </button>
              <p className="mt-3 text-[0.7rem] text-muted text-center">
                Bevestiging na betaling via Mollie
              </p>
            </>
          ) : (
            <p className="text-body text-muted">Geen datum geselecteerd.</p>
          )}
        </div>
      </div>
    </div>
  );
}

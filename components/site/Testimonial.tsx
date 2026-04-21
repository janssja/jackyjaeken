type TestimonialProps = {
  quote: string;
  author: string;
  context?: string;
};

export function Testimonial({ quote, author, context }: TestimonialProps) {
  return (
    <figure className="max-w-3xl">
      <blockquote className="font-serif text-h2 italic leading-[1.25] text-charcoal-soft">
        <span aria-hidden className="text-gold not-italic">“</span>
        {quote}
        <span aria-hidden className="text-gold not-italic">”</span>
      </blockquote>
      <figcaption className="mt-6 text-small">
        <span className="text-charcoal font-medium">{author}</span>
        {context && <span className="text-muted"> — {context}</span>}
      </figcaption>
    </figure>
  );
}

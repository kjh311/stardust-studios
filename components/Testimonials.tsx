import { Star } from "lucide-react";

const REVIEWS = [
  { name: "Sarah J.", role: "Mother of two", text: "My kids were mesmerized. Seeing their own ideas come to life as a Pixar-quality movie changed how they view creativity." },
  { name: "Mark T.", role: "Father of and Avid Sci-Fi Fan", text: "The cinematic quality is unbelievable. It's not just AI-generated; it feels like a real studio directed it." },
  { name: "Elena Q.", role: "Art Teacher", text: "A revolutionary tool for storytelling. It gives children the medium they deserve for their boundless imagination." },
];

export default function Testimonials() {
  return (
    <section className="py-spacing-section px-4 md:px-8 max-w-[1200px] mx-auto text-center">
      <div className="space-y-4 mb-20">
        <span className="text-secondary text-xs uppercase tracking-[0.3em] font-manrope font-bold">Standing Ovations</span>
        <h2 className="text-4xl md:text-6xl font-epilogue font-bold">Parental Reviews</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {REVIEWS.map((review) => (
          <div key={review.name} className="flex flex-col items-center space-y-6 group">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-primary fill-primary" />
              ))}
            </div>
            <p className="text-on-surface italic font-manrope leading-relaxed">&quot;{review.text}&quot;</p>
            <div className="space-y-1">
              <p className="font-epilogue font-bold text-lg">{review.name}</p>
              <p className="text-xs text-on-surface-variant uppercase tracking-widest">{review.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

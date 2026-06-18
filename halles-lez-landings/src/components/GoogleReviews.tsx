import { motion } from 'framer-motion';
import type { Brand } from '../data/brands';
import type { GoogleReviews as GoogleReviewsData } from '../data/stand-contacts';

interface Props {
  brand: Brand;
  reviews: GoogleReviewsData;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="google-stars" aria-label={`${rating} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < Math.round(rating) ? 'star-filled' : 'star-empty'}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function GoogleReviews({ brand, reviews }: Props) {
  return (
    <section className="google-reviews-section" aria-label={`Avis Google — ${brand.name}`}>
      <div className="google-reviews-header">
        <div>
          <span className="section-label">Avis clients</span>
          <h2>Ce qu&apos;en disent nos clients</h2>
        </div>
        <div className="google-rating-summary">
          <Stars rating={reviews.rating} />
          <strong>{reviews.rating.toFixed(1)}</strong>
          <span className="google-rating-count">{reviews.count} avis Google</span>
        </div>
      </div>

      <div className="google-reviews-grid">
        {reviews.highlights.map((review, i) => (
          <motion.blockquote
            key={`${review.author}-${i}`}
            className="google-review-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Stars rating={review.rating} />
            <p>&ldquo;{review.text}&rdquo;</p>
            <cite>— {review.author}</cite>
          </motion.blockquote>
        ))}
      </div>

      <a
        href={reviews.url}
        target="_blank"
        rel="noopener noreferrer"
        className="google-reviews-link"
      >
        Voir tous les avis sur Google →
      </a>
    </section>
  );
}

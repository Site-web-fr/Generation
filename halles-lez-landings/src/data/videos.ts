/** Vidéos promo hero — reels Instagram hébergés localement (démo). */
export interface BrandVideo {
  /** Chemin public, ex. /videos/rouge-beef.mp4 */
  src: string;
  /** URL du reel Instagram source */
  reelUrl?: string;
  /** Crédit affiché en footer */
  credit: string;
  /** true si généré localement (pas un reel IG direct) */
  generated?: boolean;
}

const IG = (reelId: string) => `https://www.instagram.com/reel/${reelId}/`;

export const brandVideos: Record<string, BrandVideo> = {
  'rouge-beef': {
    src: '/videos/rouge-beef.mp4',
    reelUrl: IG('DHjRz6kJPFt'),
    credit: 'Vidéo © @rouge_beef · Instagram',
  },
  manita: {
    src: '/videos/manita.mp4',
    reelUrl: IG('DZHofvnu4AA'),
    credit: 'Vidéo © @manita_montpellier · Instagram',
  },
  naked: {
    src: '/videos/naked.mp4',
    reelUrl: IG('DLztz2YN_Eg'),
    credit: 'Vidéo © @nakedmtp · Instagram',
  },
  'blue-india': {
    src: '/videos/blue-india.mp4',
    reelUrl: IG('DNz4_yAVLIp'),
    credit: 'Vidéo © @blueindia_mtp · Instagram',
  },
  banger: {
    src: '/videos/banger.mp4',
    reelUrl: IG('DTm41qzjLAk'),
    credit: 'Vidéo © @smashbanger_co · Instagram',
  },
  soleira: {
    src: '/videos/soleira.mp4',
    credit: 'Vidéo ambiance · photo hero animée (reel IG non accessible)',
    generated: true,
  },
  'casa-asado': {
    src: '/videos/casa-asado.mp4',
    reelUrl: IG('DHvXGV_sNYu'),
    credit: 'Vidéo © @casa.asado · Instagram',
  },
  'maria-bonita': {
    src: '/videos/maria-bonita.mp4',
    reelUrl: IG('DRNECcyCk5R'),
    credit: 'Vidéo © @mariabonitamontpellier · Instagram',
  },
  'bambino-tonton': {
    src: '/videos/bambino-tonton.mp4',
    reelUrl: IG('C76Nw3JNk2P'),
    credit: 'Vidéo © @bambinopizzaclub · Instagram',
  },
  'la-bodeguita': {
    src: '/videos/la-bodeguita.mp4',
    credit: 'Vidéo ambiance · photo hero animée (reel IG non accessible)',
    generated: true,
  },
};

export function getBrandVideo(slug: string): BrandVideo | undefined {
  return brandVideos[slug];
}

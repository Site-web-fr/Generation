/** Vidéos plat hero — reels Instagram food ou boucles photo (démo). */
export interface BrandVideo {
  src: string;
  reelUrl?: string;
  credit: string;
  /** Recadrage vertical reel → focus nourriture */
  objectPosition?: string;
  generated?: boolean;
}

const IG = (reelId: string) => `https://www.instagram.com/reel/${reelId}/`;

export const brandVideos: Record<string, BrandVideo> = {
  'rouge-beef': {
    src: '/videos/rouge-beef.mp4',
    reelUrl: IG('DHjRz6kJPFt'),
    objectPosition: 'center 58%',
    credit: 'Vidéo © @rouge_beef · Instagram',
  },
  manita: {
    src: '/videos/manita.mp4',
    reelUrl: IG('C6iuFzltVNm'),
    objectPosition: 'center 52%',
    credit: 'Vidéo © @manita_montpellier · Instagram',
  },
  naked: {
    src: '/videos/naked.mp4',
    credit: 'Vidéo plat · photo menu animée',
    generated: true,
  },
  'blue-india': {
    src: '/videos/blue-india.mp4',
    credit: 'Vidéo plat · photo menu animée',
    generated: true,
  },
  banger: {
    src: '/videos/banger.mp4',
    reelUrl: IG('DTm41qzjLAk'),
    objectPosition: 'center 55%',
    credit: 'Vidéo © @smashbanger_co · Instagram',
  },
  soleira: {
    src: '/videos/soleira.mp4',
    credit: 'Vidéo plat · photo hero animée',
    generated: true,
  },
  'casa-asado': {
    src: '/videos/casa-asado.mp4',
    reelUrl: IG('DHvXGV_sNYu'),
    objectPosition: 'center 50%',
    credit: 'Vidéo © @casa.asado · Instagram',
  },
  'maria-bonita': {
    src: '/videos/maria-bonita.mp4',
    reelUrl: IG('DRNECcyCk5R'),
    objectPosition: 'center 54%',
    credit: 'Vidéo © @mariabonitamontpellier · Instagram',
  },
  'bambino-tonton': {
    src: '/videos/bambino-tonton.mp4',
    reelUrl: IG('C76Nw3JNk2P'),
    objectPosition: 'center 50%',
    credit: 'Vidéo © @bambinopizzaclub · Instagram',
  },
  'la-bodeguita': {
    src: '/videos/la-bodeguita.mp4',
    credit: 'Vidéo plat · photo hero animée',
    generated: true,
  },
};

export function getBrandVideo(slug: string): BrandVideo | undefined {
  return brandVideos[slug];
}

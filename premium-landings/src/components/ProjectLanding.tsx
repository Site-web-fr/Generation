import type { Project } from '../data/projects';
import LandingShell from './shared/LandingShell';
import TreatmentPlanner from './configurators/TreatmentPlanner';
import PropertyExplorer from './configurators/PropertyExplorer';
import JetskiConfigurator from './configurators/JetskiConfigurator';
import YachtServiceEstimator from './configurators/YachtServiceEstimator';
import VehicleConfigurator from './configurators/VehicleConfigurator';
import FlightPlanner from './configurators/FlightPlanner';
import WatchConfigurator from './configurators/WatchConfigurator';
import WellnessArchitect from './configurators/WellnessArchitect';
import CellarBuilder from './configurators/CellarBuilder';
import SuiteSelector from './configurators/SuiteSelector';

const configurators: Record<string, React.ReactNode> = {
  'lumiere-clinic': <TreatmentPlanner />,
  'maison-elite': <PropertyExplorer />,
  'aqua-velocity': <JetskiConfigurator />,
  'nautic-pristine': <YachtServiceEstimator />,
  velocita: <VehicleConfigurator />,
  altitude: <FlightPlanner />,
  aurum: <WatchConfigurator />,
  serenite: <WellnessArchitect />,
  'grand-cru': <CellarBuilder />,
  palatial: <SuiteSelector />,
};

const statsMap: Record<string, { value: string; label: string }[]> = {
  'lumiere-clinic': [
    { value: '15+', label: 'Années d\'expertise' },
    { value: '98%', label: 'Satisfaction patient' },
    { value: '4.9', label: 'Note Google' },
  ],
  'maison-elite': [
    { value: '120M€', label: 'Portefeuille actif' },
    { value: '48h', label: 'Délai visite privée' },
    { value: '12', label: 'Pays couverts' },
  ],
  'aqua-velocity': [
    { value: '#1', label: 'Dubai Marina' },
    { value: '5★', label: 'TripAdvisor' },
    { value: '24/7', label: 'Disponibilité' },
  ],
  'nautic-pristine': [
    { value: '200+', label: 'Yachts entretenus' },
    { value: '48h', label: 'Intervention express' },
    { value: '100%', label: 'Satisfaction' },
  ],
  velocita: [
    { value: '50+', label: 'Véhicules d\'exception' },
    { value: '0 km', label: 'Franchise premium' },
    { value: '24h', label: 'Livraison à domicile' },
  ],
  altitude: [
    { value: '50+', label: 'Destinations' },
    { value: '15 min', label: 'Devis instantané' },
    { value: 'VIP', label: 'Conciergerie 24/7' },
  ],
  aurum: [
    { value: '1884', label: 'Maison fondée' },
    { value: '100%', label: 'Swiss Made' },
    { value: '∞', label: 'Garantie à vie' },
  ],
  serenite: [
    { value: '5★', label: 'Palace Relais' },
    { value: '32', label: 'Soins signature' },
    { value: '1800m', label: 'Altitude bien-être' },
  ],
  'grand-cru': [
    { value: '40K+', label: 'Références' },
    { value: '1855', label: 'Classifications' },
    { value: '15°C', label: 'Conservation idéale' },
  ],
  palatial: [
    { value: '7★', label: 'Service palace' },
    { value: '89', label: 'Suites & villas' },
    { value: 'Michelin', label: '3 restaurants' },
  ],
};

interface Props {
  project: Project;
}

export default function ProjectLanding({ project }: Props) {
  const configurator = configurators[project.slug];
  const stats = statsMap[project.slug];

  if (!configurator) return null;

  return <LandingShell project={project} configurator={configurator} stats={stats} />;
}

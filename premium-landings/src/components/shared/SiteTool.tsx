import type { Site, ToolType } from '../../data/sites';
import SurgeryConsultation from '../tools/SurgeryConsultation';
import PropertyFinder from '../tools/PropertyFinder';
import JetSkiBooking from '../tools/JetSkiBooking';
import YachtCleaningBuilder from '../tools/YachtCleaningBuilder';
import VehicleRental from '../tools/VehicleRental';
import YachtCharterConfigurator from '../tools/YachtCharterConfigurator';
import SpaTreatmentBuilder from '../tools/SpaTreatmentBuilder';
import AviationConfigurator from '../tools/AviationConfigurator';
import JewelryConfigurator from '../tools/JewelryConfigurator';
import EventPackageBuilder from '../tools/EventPackageBuilder';

interface Props {
  site: Site;
}

export default function SiteTool({ site }: Props) {
  const props = { colors: site.colors, phone: site.phone };

  const tools: Record<ToolType, React.ReactNode> = {
    'surgery-consultation': <SurgeryConsultation {...props} />,
    'property-finder': <PropertyFinder {...props} />,
    'jetski-booking': <JetSkiBooking {...props} />,
    'yacht-cleaning': <YachtCleaningBuilder {...props} />,
    'vehicle-rental': <VehicleRental {...props} />,
    'yacht-charter': <YachtCharterConfigurator {...props} />,
    'spa-treatments': <SpaTreatmentBuilder {...props} />,
    'aviation-config': <AviationConfigurator {...props} />,
    'jewelry-config': <JewelryConfigurator {...props} />,
    'event-package': <EventPackageBuilder {...props} />,
  };

  return tools[site.toolType];
}

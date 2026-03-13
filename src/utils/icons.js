/**
 * Icon registry — avoids `import * as LucideIcons` which prevents tree-shaking.
 * Only import the icons you actually use.
 */
import {
  Wifi,
  Car,
  Waves,
  Coffee,
  Sparkles,
  Dumbbell,
  UtensilsCrossed,
  Flame,
  Sun,
  Bath,
  PawPrint,
  Thermometer,
  TreePine,
  ChefHat,
  Star,
} from 'lucide-react'

export const ICON_MAP = {
  Wifi,
  Car,
  Waves,
  Coffee,
  Sparkles,
  Dumbbell,
  UtensilsCrossed,
  Flame,
  Sun,
  Bath,
  PawPrint,
  Thermometer,
  TreePine,
  ChefHat,
  Star,
}

export function getIcon(name) {
  return ICON_MAP[name] || Star
}

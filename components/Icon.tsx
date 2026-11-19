import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faNetworkWired,
  faKey,
  faShieldHalved,
  faTerminal,
  faUser,
  faUsers,
  faChartSimple,
  faFlask,
  faCircleCheck,
  faCircleXmark,
  faCirclePlay,
  faClock,
  faTrophy,
  faGear,
  faArrowRightFromBracket,
  faArrowRight,
  faPlus,
  faMagnifyingGlass,
  faCircleInfo,
  faTriangleExclamation,
  faServer,
  faLock,
  faLockOpen,
  faBug,
  faCodeBranch,
  faChevronRight,
  faBolt,
  faListCheck,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";

export const icons = {
  globe: faGlobe,
  "network-wired": faNetworkWired,
  key: faKey,
  "shield-halved": faShieldHalved,
  terminal: faTerminal,
  user: faUser,
  users: faUsers,
  chart: faChartSimple,
  flask: faFlask,
  check: faCircleCheck,
  xmark: faCircleXmark,
  play: faCirclePlay,
  clock: faClock,
  trophy: faTrophy,
  gear: faGear,
  logout: faArrowRightFromBracket,
  arrowRight: faArrowRight,
  plus: faPlus,
  search: faMagnifyingGlass,
  info: faCircleInfo,
  warning: faTriangleExclamation,
  server: faServer,
  lock: faLock,
  unlock: faLockOpen,
  bug: faBug,
  branch: faCodeBranch,
  chevronRight: faChevronRight,
  bolt: faBolt,
  checklist: faListCheck,
  gauge: faGaugeHigh,
} as const;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return <FontAwesomeIcon icon={icons[name]} className={className} />;
}

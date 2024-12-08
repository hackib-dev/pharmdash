import Dashboard from "../(pages)/dashboard/page";
import { userRoles } from "../data/userRoles";

interface Route {
  path: string;
  component: React.ElementType;
  availability: string[];
}

const generalRoles = [userRoles.user];

export const financeRoutes: Route[] = [
  // {
  //   path: '/dashboard/manage-wallets/fund-wallet',
  //   component: FundWallet,
  //   availability: financeRoles
  // },
  // {
  //   path: '/dashboard/vending/vending-ratio',
  //   component: VendingRatioPage,
  //   availability: financeRoles
  // }
];

export const generalRoutes: Route[] = [
  {
    path: "/dashboard",
    component: Dashboard,
    availability: generalRoles,
  },
];

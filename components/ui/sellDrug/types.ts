import { ReactNode } from "react";

export interface SellDrugsProps {
  isOpenSellDrugs: boolean;
  onOpen?: () => void;
  onCloseSellDrugs: () => void;
  headerTextSellDrugs: string;
  bodyTextSellDrugs?: string | ReactNode;
}

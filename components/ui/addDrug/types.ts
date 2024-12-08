import { ReactNode } from "react";

export interface AddDrugsProps {
  isOpenAddDrugs: boolean;
  onOpen?: () => void;
  onCloseAddDrugs: () => void;
  headerTextAddDrugs: string;
  bodyTextAddDrugs?: string | ReactNode;
}

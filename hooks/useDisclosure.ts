import { useState, useCallback } from "react";

type DisclosureType = "add" | "sell";

interface DisclosureState {
  isAddDrugsOpen: boolean;
  onOpenAddDrugs: () => void;
  onCloseAddDrugs: () => void;
  isOpenSellDrugs: boolean;
  onOpenSellDrugs: () => void;
  onCloseSellDrugs: () => void;
}

export const useDisclosure = (): DisclosureState => {
  const [disclosures, setDisclosures] = useState<
    Record<DisclosureType, boolean>
  >({
    add: false,
    sell: false,
  });

  const openDisclosure = useCallback((type: DisclosureType) => {
    setDisclosures((prev) => ({ ...prev, [type]: true }));
  }, []);

  const closeDisclosure = useCallback((type: DisclosureType) => {
    setDisclosures((prev) => ({ ...prev, [type]: false }));
  }, []);

  return {
    isAddDrugsOpen: disclosures.add,
    onOpenAddDrugs: () => openDisclosure("add"),
    onCloseAddDrugs: () => closeDisclosure("add"),
    isOpenSellDrugs: disclosures.sell,
    onOpenSellDrugs: () => openDisclosure("sell"),
    onCloseSellDrugs: () => closeDisclosure("sell"),
  };
};

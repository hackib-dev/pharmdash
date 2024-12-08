import React, { FC } from "react";
import { Modal, ModalTitle, ModalBody } from "@/components/SellDrugModal";
import { FaRegCircleXmark } from "react-icons/fa6";
import { SellDrugsProps } from "./types";

const SellDrugsModal: FC<SellDrugsProps> = ({
  isOpenSellDrugs,
  onCloseSellDrugs,
  headerTextSellDrugs,
  bodyTextSellDrugs,
}) => {
  return (
    <Modal
      isOpen={isOpenSellDrugs}
      onClose={onCloseSellDrugs}
      closeOnOverlayClick={false}
    >
      <div>
        <div className="flex flex-col ">
          <ModalTitle>
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-semibold text-xl">{headerTextSellDrugs}</h2>
              <div className="block  bg-white rounded-xl p-1 cursor-pointer">
                <FaRegCircleXmark
                  onClick={onCloseSellDrugs}
                  className="w-6 h-6 cursor"
                />
              </div>
            </div>
          </ModalTitle>
          <ModalBody>
            <div>{bodyTextSellDrugs}</div>
          </ModalBody>
        </div>
      </div>
    </Modal>
  );
};

export default SellDrugsModal;

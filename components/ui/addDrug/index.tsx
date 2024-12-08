import React, { FC } from "react";
import { Modal, ModalTitle, ModalBody } from "@/components/AddDrugModal";
import { FaRegCircleXmark } from "react-icons/fa6";
import { AddDrugsProps } from "./types";

const AddDrugsModal: FC<AddDrugsProps> = ({
  isOpenAddDrugs,
  onCloseAddDrugs,
  headerTextAddDrugs,
  bodyTextAddDrugs,
}) => {
  return (
    <Modal
      isOpen={isOpenAddDrugs}
      onClose={onCloseAddDrugs}
      closeOnOverlayClick={false}
    >
      <div>
        <div className="flex flex-col ">
          <ModalTitle>
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-semibold text-xl">{headerTextAddDrugs}</h2>
              <div className="block  bg-white rounded-xl p-1 cursor-pointer">
                <FaRegCircleXmark
                  onClick={onCloseAddDrugs}
                  className="w-6 h-6 cursor"
                />
              </div>
            </div>
          </ModalTitle>
          <ModalBody>
            <div>{bodyTextAddDrugs}</div>
          </ModalBody>
        </div>
      </div>
    </Modal>
  );
};

export default AddDrugsModal;

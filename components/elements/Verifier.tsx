import React, { useState } from "react";
import Box from "./Box";
import BtnPrime from "./BtnPrime";
import BtnWarm from "./BtnWarm";
import Modal from "./Modal";

export default function Verifier({
  onOkay,
  open,
  setOpen,
  onCancel,
  message,
  actions = true,
}: {
  message: string | any;
  onOkay?: any;
  onCancel?: any;
  open: boolean;
  setOpen: any;
  actions?: boolean;
}) {
  return (
    <Modal open={open} setOpen={setOpen}>
      {(Icon) => (
        <Box css="min-h-[130px]d flex flex-col p-6">
          {actions && <Icon css="-top-12 -right-8" />}
          <h3 className="flex-1 flex flex-col items-center justify-center p-3">
            {message}
          </h3>
          {actions && (
            <div className="flex items-center justify-between">
              <BtnWarm
                onClick={(_) => {
                  setOpen?.(false);
                  onCancel?.();
                }}
              >
                cancel
              </BtnWarm>
              <BtnPrime
                onClick={(_) => {
                  onOkay?.();
                  setOpen?.(false);
                }}
              >
                ok
              </BtnPrime>
            </div>
          )}
        </Box>
      )}
    </Modal>
  );
}

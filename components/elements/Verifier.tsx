import React from "react";
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
  setOpen?: any;
  actions?: boolean;
}) {
  return (
    <Modal className="max-w-md" open={open} setOpen={setOpen}>
      {(closePop) => (
        <>
          <h3 className="text-sec">{message}</h3>
          {actions && (
            <div className="flex items-center justify-between">
              <BtnWarm
                onClick={() => {
                  closePop(() => {
                    onCancel?.();
                  });
                }}
              >
                cancel
              </BtnWarm>
              <button
                className="btn-prime"
                onClick={() => {
                  closePop(() => {
                    onOkay?.();
                  });
                }}
              >
                ok
              </button>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}

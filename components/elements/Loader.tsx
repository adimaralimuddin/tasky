import React, { useState, useEffect } from "react";
import { RefreshIcon } from "../../lib/icons";
import Box from "./Box";
import Modal from "./Modal";

export default function Loader({
  open,
  message = "Loading ... ",
}: {
  open: boolean;
  message?: string;
}) {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open);
  }, [open]);

  return (
    <Modal open={show} setOpen={setShow}>
      {(Icon: any) => (
        <Box>
          <Icon />
          <div className="flex p-6 gap-3 items-center">
            <h3 className="flex-1 flex flex-col items-center justify-center p-3">
              {message}
            </h3>
            <RefreshIcon className="text-2xl animate-spin" />
          </div>
        </Box>
      )}
    </Modal>
  );
}

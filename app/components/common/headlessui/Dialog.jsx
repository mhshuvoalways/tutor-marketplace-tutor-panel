import Button1 from "@/app/components/common/button/Button";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function MyModal({
  isOpen,
  setIsOpen,
  dialogTitle,
  submitHandler,
  children,
  isClicked,
}) {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setIsOpen(!isOpen)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto font-outfit px-5">
          <div className="flex min-h-full items-center justify-center p-5 shadow">
            <DialogPanel
              transition
              className="w-full max-w-md rounded bg-white p-5 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-xl font-medium border-b pb-2"
              >
                {dialogTitle}
              </DialogTitle>
              <div className="mt-5">{children}</div>
              <div className="flex justify-end mt-5">
                <div onClick={submitHandler}>
                  <Button1 title={"Add"} isClicked={isClicked} />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {isOpen && (
        <p className="bg-black opacity-5 fixed -top-5 bottom-0 right-0 left-0 z-10 transition duration-300"></p>
      )}
    </>
  );
}

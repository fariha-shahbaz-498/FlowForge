import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import Sidebar from "./Sidebar";

function MobileSidebar({ open, setOpen }) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50 lg:hidden"
    >

      <div className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex">

        <DialogPanel className="w-72 bg-white dark:bg-slate-900 transition-colors duration-300 shadow-xl">

          <div className="flex justify-end p-4">

            <button onClick={() => setOpen(false)}>
              <X />
            </button>

          </div>

          <Sidebar mobile />

        </DialogPanel>

      </div>

    </Dialog>
  );
}

export default MobileSidebar;
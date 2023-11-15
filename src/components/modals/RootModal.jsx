import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { IoClose } from "react-icons/io5";

export default function RootModal({
  isOpen,
  onClose,
  className = "",
  title = "Modal",
  children,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={twMerge(
                  "w-full max-w-md p-5 overflow-hidden text-left transition-all transform bg-whiteSoft text-slate-700 shadow-xl rounded-md",
                  className
                )}
              >
                <section className="flex items-center justify-between">
                  <h1 className="text-2xl font-semibold leading-6">{title}</h1>
                  <span className="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-slate-700 text-white cursor-pointer hover:bg-opacity-80">
                    <IoClose onClick={onClose} size={22} />
                  </span>
                </section>

                <section className="mt-5">{children}</section>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

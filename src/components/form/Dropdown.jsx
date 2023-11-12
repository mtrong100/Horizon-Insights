import { LuChevronsUpDown } from "react-icons/lu";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsCheck } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
/* ====================================================== */

export default function Dropdown({
  selected,
  handleSelect = () => {},
  list = [],
  className = "",
}) {
  return (
    <Listbox value={selected} onChange={handleSelect}>
      <div className="relative mt-2">
        <Listbox.Button
          className={twMerge(
            "relative w-full  pl-3 pr-10 text-left h-[56px] border-2 rounded-md cursor-pointer bg-gray-100 ",
            className
          )}
        >
          <span className="block truncate">{selected}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <LuChevronsUpDown size={20} />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={twMerge(
              "absolute z-20 w-full mt-1 hidden-scrollbar overflow-auto text-base rounded-md shadow-lg bg-background max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm bg-white",
              className
            )}
          >
            {list.map((item, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative  select-none py-4 pl-10 pr-4 capitalize cursor-pointer  ${
                    active ? "hover:bg-blue-50" : "opacity-90 bg-white"
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate text-base ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                        <BsCheck size={20} />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

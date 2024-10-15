"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";

function ListboxComponent({ items }) {
  const [selected, setSelected] = useState(items[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <ListboxButton
        className={`text-nowrap border w-full text-left rounded py-2 px-2 flex items-center justify-between bg-white`}
      >
        {selected}
        <ChevronDownIcon className="size-4" />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className={`rounded shadow bg-white p-1 transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 z-10 w-[var(--button-width)]`}
      >
        {items.map((item) => (
          <ListboxOption
            key={item}
            value={item}
            className="group flex cursor-pointer items-center gap-2 rounded py-1.5 px-3 hover:bg-gray-100"
          >
            <CheckIcon className="invisible size-4 group-data-[selected]:visible" />
            <p>{item}</p>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

export default ListboxComponent;

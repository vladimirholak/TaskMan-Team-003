import { Listbox } from "@headlessui/react";
import React from "react";
import { Fragment, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";
import { summary } from "../../assets/data";
import clsx from "clsx";
import { getInitials } from "../../utils/index.js";
import {
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Transition } from "@headlessui/react";
import { useEffect } from "react";

const UserList = ({ setTeam, team, className }) => {
  const data = summary.users || []; // changed
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleChange = (el) => {
    if (Array.isArray(el)) {
      setSelectedUsers(el);
      setTeam(el.filter((u) => u && u.id).map((u) => u.id));
    }
  };

  useEffect(() => {
    if (team?.length < 1) {
      data.length > 0 && setSelectedUsers([data[0]]);
    } else {
      setSelectedUsers(team);
    }
  }, [team, data]);

  return (
    <div>
      <p className="text-gray-700">Task Assinged To: </p>
      <Listbox value={selectedUsers} onChange={setSelectedUsers} multiple>
        <div className="relative mt-1">
          <ListboxButton
            className={`relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm ${className}`}
          >
            {/* <ListboxButton className="relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm"> */}
            <span className="block truncate">
              {selectedUsers
                ?.filter((user) => user)
                .map((user) => user.name)
                .join(", ")}{" "}
            </span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="z-50 absolute mt-1 max-h-60 w-5/6 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {data
                ?.filter((user) => user)
                .map((user, index) => (
                  <ListboxOption
                    key={index}
                    className={(
                      { focus } // focus changed on open
                    ) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4. ${
                        focus ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      } `
                    }
                    value={user}
                  >
                    {({ selected }) => (
                      <>
                        <div
                          className={clsx(
                            "flex items-center gap-2 truncate",
                            selected ? "font-medium" : "font-normal"
                          )}
                        >
                          <div className="w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600">
                            <span className="text-center text-[10px]">
                              {getInitials(user.name)}
                            </span>
                          </div>
                          <span>{user.name}</span>
                        </div>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <MdCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </ListboxOption>
                ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default UserList;

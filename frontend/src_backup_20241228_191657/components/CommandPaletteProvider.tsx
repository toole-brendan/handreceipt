import * as React from "react"
import { useCommandPalette } from "@/features/hooks/useCommandPalette"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/features/shared/components/command"

export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { open, setOpen, commands } = useCommandPalette()

  return (
    <>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border border-[var(--border-color)]">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {["Navigation", "Actions"].map((section) => (
              <CommandGroup key={section} heading={section}>
                {commands
                  .filter((command) => command.section === section)
                  .map((command) => (
                    <CommandItem
                      key={command.id}
                      onSelect={() => {
                        command.onSelect()
                        setOpen(false)
                      }}
                    >
                      <span>{command.title}</span>
                      {command.shortcut && (
                        <CommandShortcut>{command.shortcut}</CommandShortcut>
                      )}
                    </CommandItem>
                  ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
} 
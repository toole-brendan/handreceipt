import * as React from "react"
import { useNavigate } from "react-router-dom"

interface CommandItem {
  id: string
  title: string
  keywords?: string[]
  onSelect: () => void
  section: string
  shortcut?: string
}

export function useCommandPalette() {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  // Define common commands
  const commands: CommandItem[] = [
    {
      id: "home",
      title: "Go to Home",
      keywords: ["dashboard", "main", "start"],
      section: "Navigation",
      shortcut: "g h",
      onSelect: () => navigate("/"),
    },
    {
      id: "transfers",
      title: "View Transfers",
      keywords: ["transfer", "movement", "handover"],
      section: "Navigation",
      shortcut: "g t",
      onSelect: () => navigate("/transfer"),
    },
    {
      id: "property",
      title: "View Property",
      keywords: ["assets", "items", "inventory"],
      section: "Navigation",
      shortcut: "g p",
      onSelect: () => navigate("/property"),
    },
    {
      id: "profile",
      title: "View Profile",
      keywords: ["account", "settings", "user"],
      section: "Navigation",
      shortcut: "g u",
      onSelect: () => navigate("/profile"),
    },
    {
      id: "new-transfer",
      title: "Create New Transfer",
      keywords: ["new", "create", "initiate"],
      section: "Actions",
      shortcut: "n t",
      onSelect: () => navigate("/transfer/new"),
    },
    {
      id: "search",
      title: "Search Property",
      keywords: ["find", "locate", "search"],
      section: "Actions",
      shortcut: "s",
      onSelect: () => navigate("/property/search"),
    },
  ]

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return {
    open,
    setOpen,
    commands,
  }
} 
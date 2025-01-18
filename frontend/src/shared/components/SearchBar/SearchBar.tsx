import * as React from "react"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/features/shared/components/input"
import { cn, debounce } from "@/features/lib/utils"

interface SearchResult {
  id: string
  type: "property" | "personnel" | "serial"
  title: string
  subtitle: string
  icon?: React.ReactNode
}

interface SearchBarProps {
  onSearch: (query: string) => Promise<SearchResult[]>
  onResultClick?: (result: SearchResult) => void
  placeholder?: string
  className?: string
}

export function SearchBar({
  onSearch,
  onResultClick,
  placeholder = "Search property, serial numbers, personnel...",
  className
}: SearchBarProps) {
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  const debouncedSearch = React.useMemo(
    () =>
      debounce(async (searchTerm: string) => {
        if (!searchTerm.trim()) {
          setResults([])
          return
        }
        
        setIsSearching(true)
        try {
          const searchResults = await onSearch(searchTerm)
          setResults(searchResults)
        } catch (error) {
          console.error("Search error:", error)
          setResults([])
        } finally {
          setIsSearching(false)
        }
      }, 300),
    [onSearch]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsOpen(true)
    debouncedSearch(value)
  }

  const handleResultClick = (result: SearchResult) => {
    onResultClick?.(result)
    setIsOpen(false)
  }

  // Close results when clicking outside
  const searchRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={searchRef} className={cn("relative w-full max-w-2xl", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)]" />
        <Input
          type="text"
          className="w-full pl-10 pr-4 bg-[var(--bg-glass)] backdrop-blur-sm border-[var(--border-color)] focus:border-[var(--border-color-focus)] transition-colors"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
        />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-[var(--text-secondary)]" />
        )}
      </div>
      
      {isOpen && (results.length > 0 || isSearching) && (
        <div className="absolute w-full mt-2 py-2 bg-[var(--bg-glass)] backdrop-blur-md rounded-lg shadow-lg border border-[var(--border-color)] z-50">
          {isSearching ? (
            <div className="px-4 py-3 text-sm text-[var(--text-secondary)]">
              <Loader2 className="inline-block h-4 w-4 animate-spin mr-2" />
              Searching...
            </div>
          ) : (
            results.map((result) => (
              <button
                key={result.id}
                className="w-full px-4 py-3 text-left hover:bg-[var(--bg-glass-lighter)] focus:bg-[var(--bg-glass-lighter)] focus:outline-none transition-colors group"
                onClick={() => handleResultClick(result)}
              >
                <div className="flex items-center">
                  {result.icon && (
                    <span className="mr-3 text-[var(--text-secondary)] group-hover:text-[var(--text-accent)]">
                      {result.icon}
                    </span>
                  )}
                  <div>
                    <div className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--text-accent)]">
                      {result.title}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      {result.subtitle}
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
} 
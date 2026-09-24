"use client"

import { useState, useEffect, useCallback, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface CommandItem {
  id: string
  icon: ReactNode
  label: string
  shortcut?: string
  onClick?: () => void
}

export interface CircularCommandMenuProps {
  items?: CommandItem[]
  trigger?: ReactNode
  className?: string
  radius?: number
  onSelect?: (item: CommandItem) => void
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  centerOnOpen?: boolean
  triggerClassName?: string
  showBackdrop?: boolean
  onActiveIndexChange?: (index: number) => void
  activeIndex?: number
  showFloatingTooltips?: boolean
  twoStepClick?: boolean
}

function Component({
  items = [],
  trigger,
  className,
  radius = 120,
  onSelect,
  isOpen: controlledIsOpen,
  defaultOpen = false,
  onOpenChange,
  centerOnOpen = false,
  triggerClassName,
  showBackdrop = true,
  onActiveIndexChange,
  activeIndex: controlledActiveIndex,
  showFloatingTooltips = true,
  twoStepClick = false,
}: CircularCommandMenuProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen)
  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen

  const setIsOpen = (nextOpen: boolean) => {
    setInternalIsOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }

  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setInternalIsOpen(controlledIsOpen)
    }
  }, [controlledIsOpen])

  const [internalActiveIndex, setInternalActiveIndex] = useState(0)
  const isControlledActive = controlledActiveIndex !== undefined
  const activeIndex = isControlledActive ? controlledActiveIndex : internalActiveIndex

  const handleSetActiveIndex = (index: number) => {
    if (!isControlledActive) {
      setInternalActiveIndex(index)
    }
    onActiveIndexChange?.(index)
  }

  // Defensive check for items
  const safeItems = items || []
  const itemCount = safeItems.length

  const angleStep = itemCount > 0 ? 360 / itemCount : 0
  const startAngle = -90 // Start from top

  const handleItemClick = (item: CommandItem, index: number) => {
    if (twoStepClick) {
      if (activeIndex === index) {
        // Segundo clique no item ativo: ativa a ação do botão
        item.onClick?.()
        onSelect?.(item)
      } else {
        // Primeiro clique: seleciona o item e mostra o tooltip
        handleSetActiveIndex(index)
      }
    } else {
      item.onClick?.()
      onSelect?.(item)
      handleSetActiveIndex(index)
    }
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || itemCount === 0) return

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault()
          handleSetActiveIndex((activeIndex + 1) % itemCount)
          break
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault()
          handleSetActiveIndex((activeIndex - 1 + itemCount) % itemCount)
          break
        case "Enter":
          e.preventDefault()
          const selectedItem = safeItems[activeIndex]
          if (selectedItem) {
            selectedItem.onClick?.()
            onSelect?.(selectedItem)
          }
          break
        case "Escape":
          e.preventDefault()
          setIsOpen(false)
          break
      }
    },
    [isOpen, activeIndex, safeItems, itemCount, onSelect],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const getItemPosition = (index: number) => {
    const angle = ((startAngle + index * angleStep) * Math.PI) / 180
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      angle: startAngle + index * angleStep,
    }
  }

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      {/* Trigger */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative z-20 flex h-14 w-14 items-center justify-center rounded-full",
          "bg-primary text-primary-foreground shadow-lg shadow-primary/30",
          "hover:bg-primary/90 transition-all active:scale-95 cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
          triggerClassName
        )}
        whileTap={{ scale: 0.92 }}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {/* Efeito de anel pulsante quando o menu está fechado / aguardando clique */}
        {!isOpen && (
          <>
            <motion.span
              animate={{ scale: [1, 1.15, 1], opacity: [0.7, 0.2, 0.7] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="absolute -inset-1 rounded-full bg-[#df2531] pointer-events-none"
            />
            <span className="absolute -inset-2.5 rounded-full border border-[#df2531]/40 animate-pulse pointer-events-none" />
          </>
        )}

        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
          {trigger || (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </motion.div>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && showBackdrop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && itemCount > 0 && (
          <div
            className={cn(
              "z-50",
              centerOnOpen
                ? "fixed inset-0 flex items-center justify-center pointer-events-none"
                : "absolute left-1/2 top-1/2"
            )}
            role="menu"
          >
            <div className="relative pointer-events-auto">
              {safeItems.map((item, index) => {
                const position = getItemPosition(index)
                const isActive = activeIndex === index

                const isTop = position.y < -40 && Math.abs(position.x) < 50
                const isBottom = position.y > 40 && Math.abs(position.x) < 50
                const isRight = position.x >= 0

                return (
                  <motion.button
                    key={item.id}
                    initial={{
                      opacity: 0,
                      x: 0,
                      y: 0,
                      scale: 0.5,
                    }}
                    animate={{
                      opacity: 1,
                      x: position.x - 24,
                      y: position.y - 24,
                      scale: isActive ? 1.15 : 1,
                    }}
                    exit={{
                      opacity: 0,
                      x: 0,
                      y: 0,
                      scale: 0.5,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 28,
                      mass: 0.8,
                    }}
                    onClick={() => handleItemClick(item, index)}
                    onMouseEnter={() => handleSetActiveIndex(index)}
                    className={cn(
                      "absolute flex h-12 w-12 items-center justify-center rounded-full cursor-pointer",
                      "border border-white/10 bg-[#0c1017] text-white shadow-xl backdrop-blur-md",
                      "transition-all duration-200 hover:bg-[#161c28] hover:border-primary/50",
                      isActive && "ring-2 ring-[#df2531] border-[#df2531] bg-[#161c28] shadow-[0_0_22px_rgba(223,37,49,0.55)]",
                    )}
                    role="menuitem"
                    aria-label={item.label}
                  >
                    <div className="text-zinc-200 group-hover:text-white transition-colors">
                      {item.icon}
                    </div>

                    {/* Tooltip flutuante (opcional, ocultado se showFloatingTooltips for false) */}
                    {showFloatingTooltips && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          scale: isActive ? 1 : 0.9,
                        }}
                        className={cn(
                          "absolute whitespace-nowrap rounded-lg bg-[#090d14]/95 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white shadow-2xl border border-[#df2531]/40 pointer-events-none z-30 transition-all",
                          isTop
                            ? "top-full mt-2.5 left-1/2 -translate-x-1/2"
                            : isBottom
                            ? "top-full mt-2.5 left-1/2 -translate-x-1/2"
                            : isRight
                            ? "left-full ml-3 top-1/2 -translate-y-1/2"
                            : "right-full mr-3 top-1/2 -translate-y-1/2"
                        )}
                      >
                        <span className="text-zinc-100">{item.label}</span>
                        {item.shortcut && (
                          <span className="ml-2 font-mono text-[10px] text-zinc-400 bg-white/10 px-1.5 py-0.5 rounded">
                            {item.shortcut}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Component, Component as CircularCommandMenu }

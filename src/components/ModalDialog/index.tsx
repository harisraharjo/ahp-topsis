"use client"

import { useRouter } from "next/navigation"
import { useEffect, type PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  className?: HTMLDialogElement["className"]
}>

export const ModalDialog = ({ children, className = "" }: Props) => {
  const router = useRouter()

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === "Escape") {
        router.push("/")
      }
    }
    document.addEventListener("keyup", handleEscapeKey)
    return () => document.removeEventListener("keyup", handleEscapeKey)
  }, [router])

  return (
    <dialog
      open
      className={`fixed inset-0 rounded border border-solid border-gray-400 bg-slate-900 shadow-lg ${className}`}
    >
      {children}
    </dialog>
  )
}

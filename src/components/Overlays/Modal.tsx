import type {
  DetailedHTMLProps,
  DialogHTMLAttributes,
  PropsWithChildren,
} from "react"

type HTMLDialogProps = DetailedHTMLProps<
  DialogHTMLAttributes<HTMLDialogElement>,
  HTMLDialogElement
>
type Props = Omit<HTMLDialogProps, "ref"> & {
  dialogRef: Pick<HTMLDialogProps, "ref">["ref"]
} & PropsWithChildren

export const Modal = ({
  children,
  className = "[&::backdrop]:bg-red-500",
  dialogRef,
  ...props
}: Props) => {
  //   const ref = useRef<T>(null)
  //   const { overlayProps: _overlayProps, underlayProps } = useOverlay(props, ref)

  // usePreventScroll()

  return (
    //   bg-black/30
    <dialog ref={dialogRef} className={className} {...props}>
      {children}
    </dialog>
  )
}

export default Modal

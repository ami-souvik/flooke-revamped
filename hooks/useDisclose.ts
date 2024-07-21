import { useState } from 'react';

export function useDisclose(initState?: boolean) {
  const [isOpen, setIsOpen] = useState(initState || false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  const onToggle = () => {
    setIsOpen(!isOpen);
  };
  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}

export function useStateDisclose<T>(initState: T) {
  const [state, setState] = useState<T>(initState || null);
  const onOpen = (v: T) => {
    setState(v);
  };
  const onClose = () => {
    setState(null);
  };
  return {
    state,
    onOpen,
    onClose,
  };
}

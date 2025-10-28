"use client";

import * as React from "react";

/**
 * Quantos toasts manter visíveis simultaneamente
 */
const TOAST_LIMIT = 3;
/**
 * Tempo para remover da memória após ser fechado (ms)
 */
const TOAST_REMOVE_DELAY = 400;

/**
 * Estrutura que o Toaster consome
 * (não depende de tipos do toast.tsx)
 */
export type ToasterToast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
  // controle de abertura (Radix)
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export type ToastInput = Omit<ToasterToast, "id">;

type State = {
  toasts: ToasterToast[];
};

const ActionTypes = {
  ADD: "ADD_TOAST",
  UPDATE: "UPDATE_TOAST",
  DISMISS: "DISMISS_TOAST",
  REMOVE: "REMOVE_TOAST",
} as const;

type Action =
  | { type: typeof ActionTypes.ADD; toast: ToasterToast }
  | {
      type: typeof ActionTypes.UPDATE;
      toast: Partial<ToasterToast> & { id: string };
    }
  | { type: typeof ActionTypes.DISMISS; toastId?: string }
  | { type: typeof ActionTypes.REMOVE; toastId?: string };

let memoryState: State = { toasts: [] };
const listeners: Array<(s: State) => void> = [];
const timeouts = new Map<string, ReturnType<typeof setTimeout>>();

function emit() {
  for (const l of listeners) l(memoryState);
}

function addToRemoveQueue(id: string) {
  if (timeouts.has(id)) return;
  const t = setTimeout(() => {
    timeouts.delete(id);
    dispatch({ type: ActionTypes.REMOVE, toastId: id });
  }, TOAST_REMOVE_DELAY);
  timeouts.set(id, t);
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.ADD:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case ActionTypes.UPDATE:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    case ActionTypes.DISMISS: {
      const { toastId } = action;
      if (toastId) addToRemoveQueue(toastId);
      else state.toasts.forEach((t) => addToRemoveQueue(t.id));

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          toastId === undefined || t.id === toastId ? { ...t, open: false } : t
        ),
      };
    }
    case ActionTypes.REMOVE:
      if (!action.toastId) return { ...state, toasts: [] };
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
}

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  emit();
}

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

/**
 * Cria um toast
 *
 * toast({ title: 'Feito', description: 'Salvo com sucesso', variant: 'default' })
 */
export function toast(input: ToastInput = {}) {
  const id = genId();

  const dismiss = () => dispatch({ type: ActionTypes.DISMISS, toastId: id });
  const update = (patch: Partial<ToasterToast>) =>
    dispatch({ type: ActionTypes.UPDATE, toast: { id, ...patch } });

  dispatch({
    type: ActionTypes.ADD,
    toast: {
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
      ...input,
    },
  });

  return { id, dismiss, update };
}

/**
 * Hook para o Toaster ler a lista de toasts
 */
export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const i = listeners.indexOf(setState);
      if (i > -1) listeners.splice(i, 1);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) =>
      dispatch({ type: ActionTypes.DISMISS, toastId }),
  };
}

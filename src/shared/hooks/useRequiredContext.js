import { useContext } from 'react';

export function useRequiredContext(Context, hookName) {
  const value = useContext(Context);
  if (value === null || value === undefined) {
    throw new Error(hookName + ' must be used inside its matching provider.');
  }
  return value;
}

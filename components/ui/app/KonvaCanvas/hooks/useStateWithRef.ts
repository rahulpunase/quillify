import { useRef, useState } from "react";

function useStateWithRef<T>(defaultState: T) {
  const [state, _setState] = useState<T>(defaultState);
  const ref = useRef<T>(defaultState);

  const setState = (value: T) => {
    ref.current = value;
    _setState(value);
  };

  return [state, ref, setState] as const;
}

export default useStateWithRef;

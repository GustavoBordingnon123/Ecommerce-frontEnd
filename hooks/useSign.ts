// useSign.ts
import { create } from "zustand";

interface SignStore {
  isSignUp: boolean;
  toggleSign: () => void;
}

const useSign = create<SignStore>((set) => ({
  isSignUp: false,
  toggleSign: () => set((state) => ({ isSignUp: !state.isSignUp })),
}));

export default useSign;

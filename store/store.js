import { create } from "zustand";
import { createAuthSlice } from "./slices/AuthSlice";
// import { createMenuSlice } from "./slices/MenuSlice";
// import { createdTransitionSlice } from "./slices/TransactionSlice";
// import { createTransferSlice } from "./slices/TransferSlice";
// import { createWalletSlice } from "./slices/WalletSlice";

export const useAppStore = create()((...a) => ({
  ...createAuthSlice(...a),
  //   ...createdTransitionSlice(...a),
  //   ...createTransferSlice(...a),
  //   ...createWalletSlice(...a),
  //   ...createMenuSlice(...a),
}));

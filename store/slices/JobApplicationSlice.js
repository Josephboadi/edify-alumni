export const createJobSlice = (set, get) => ({
  jobInfoData: null,
  setJobInfoData: (jobInfoData) => {
    set({ jobInfoData: jobInfoData });
  },
});

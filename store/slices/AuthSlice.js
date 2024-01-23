export const createAuthSlice = (set, get) => ({
  corporateSignupData: null,
  files: [],
  isAuthenticated: false,
  userInfo: null,
  formType: "login",
  authErrorMessage: "",
  setIsAuthenticated: () => {
    set({ isAuthenticated: !get()?.isAuthenticated });
  },
  setUserInfo: (userInfo) => {
    set({ userInfo: userInfo });
  },
  setCorporateSignupData: (corporateSignupData) => {
    set({ corporateSignupData: corporateSignupData });
  },
  setFiles: (files) => {
    set({ files });
  },
  setFormType: (formType) => {
    set({ formType });
  },
  setAuthErrorMessage: (authErrorMessage) => {
    set({ authErrorMessage });
  },
});

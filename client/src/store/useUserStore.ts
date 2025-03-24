import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:8000/api/v1/user";
axios.defaults.withCredentials = true;

type User = {
  fullname: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  isVerified: boolean;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: SignupInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (input: any) => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      // Signup API Implementation
      signup: async (input: SignupInputState) => {
        set({ loading: true });
        try {
          const response = await axios.post(`${API_END_POINT}/signup`, input, {
            headers: { "Content-Type": "application/json" },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Signup failed!");
        } finally {
          set({ loading: false });
        }
      },

      // Login API Implementation
      login: async (input: LoginInputState) => {
        set({ loading: true });
        try {
          const response = await axios.post(`${API_END_POINT}/login`, input, {
            headers: { "Content-Type": "application/json" },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Login failed!");
        } finally {
          set({ loading: false });
        }
      },

      // Verify Email API Implementation
      verifyEmail: async (verificationCode: string) => {
        set({ loading: true });
        try {
          const response = await axios.post(
            `${API_END_POINT}/verify-email`,
            { verificationCode },
            { headers: { "Content-Type": "application/json" } }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Verification failed!");
        } finally {
          set({ loading: false });
        }
      },

      // Check Authentication
      checkAuthentication: async () => {
        set({ isCheckingAuth: true });
        try {
          const response = await axios.get(`${API_END_POINT}/check-auth`);
          if (response.data.success) {
            set({
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          set({ isAuthenticated: false });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      // Logout API Implementation
      logout: async () => {
        set({ loading: true });
        try {
          const response = await axios.post(`${API_END_POINT}/logout`);
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              user: null,
              isAuthenticated: false,
            });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Logout failed!");
        } finally {
          set({ loading: false });
        }
      },

      // Forgot Password API Implementation
      forgotPassword: async (email: string) => {
        set({ loading: true });
        try {
          const response = await axios.post(
            `${API_END_POINT}/forgot-password`,
            { email }
          );
          if (response.data.success) {
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Request failed!");
        } finally {
          set({ loading: false });
        }
      },

      // Reset Password API Implementation
      resetPassword: async (token: string, newPassword: string) => {
        set({ loading: true });
        try {
          const response = await axios.post(
            `${API_END_POINT}/reset-password/${token}`,
            { newPassword }
          );
          if (response.data.success) {
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Reset failed!");
        } finally {
          set({ loading: false });
        }
      },

      // Update Profile API Implementation
      updateProfile: async (input: any) => {
        set({ loading: true });
        try {
          const response = await axios.put(
            `${API_END_POINT}/profile/update`,
            input,
            { headers: { "Content-Type": "application/json" } }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ user: response.data.user });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Update failed!");
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

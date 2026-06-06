import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, login, logout, register } from "../api/auth.api";

export function useLogin() {
  return useMutation({ mutationFn: login });
}

export function useRegister() {
  return useMutation({ mutationFn: register });
}

export function useMe() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
  });
}

export function useLogout() {
  return useMutation({ mutationFn: logout });
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateJwt, updateName } from "../clientState/authSlice";
import jwt_decode from "jwt-decode";

export const useGetTickets = () => {
  const response = useQuery(["tickets"], async () => {
    const { data } = await axios.get("/api/users/tickets");
    return data;
  });

  return response;
};

export const useGetSingleTicket = (postId) => {
  const response = useQuery(["tickets", postId], async () => {
    const { data } = await axios.get(`/api/users/tickets/${postId}`);
    return data;
  });

  return response;
};

export const usePostTicket = (setTicketError) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(
    (ticketData) => {
      return axios.post("/api/users/tickets/create", ticketData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tickets"]);
        navigate("/tickets");
      },
      onError: ({ message }) => {
        setTicketError(message);
      },
    }
  );
};

export const useDeleteSingleTicket = (postId) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      return axios.delete(`/api/users/tickets/${postId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tickets"]);
        navigate("/tickets");
      },
    }
  );
};
export const usePostLogin = (setLoginError) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation(
    (loginFormData) => {
      return axios.post("/api/users/login", loginFormData);
    },
    {
      onSuccess: (data) => {
        const { data: response } = data;
        localStorage.setItem("authStatus", JSON.stringify(response));
        dispatch(updateJwt(response.token));
        const { username } = jwt_decode(response.token);
        dispatch(updateName(username));
        navigate(location.state ? location.state.from.pathname : "/");
      },
      onError: (error) => {
        setLoginError(error.response.data.message);
      },
    }
  );
};
export const usePostRegister = (setRegisterError) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation(
    (registerFormData) => {
      return axios.post("/api/users/register", registerFormData);
    },
    {
      onSuccess: (data) => {
        const { data: response } = data;
        localStorage.setItem("authStatus", JSON.stringify(response));
        dispatch(updateJwt(response.token));
        const { username } = jwt_decode(response.token);
        dispatch(updateName(username));
        navigate("/");
      },
      onError: ({ message }) => {
        setRegisterError(message);
      },
    }
  );
};

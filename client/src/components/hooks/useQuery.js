import { useQuery, useMutation } from "@tanstack/react-query";
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
export const useDeleteSingleTicket = (postId) => {
  const navigate = useNavigate();
  const mutation = useMutation(
    () => {
      axios.delete(`/api/users/tickets/${postId}`);
    },
    {
      onSuccess: () => {
        navigate("/tickets");
      },
    }
  );

  return mutation;
};
export const usePostLogin = (setLoginError) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const mutation = useMutation(
    (loginFormData) => {
      return axios.post("/api/users/login", loginFormData);
    },
    {
      onSuccess: (data) => {
        const { data: response } = data;
        console.log(response);
        localStorage.setItem("authStatus", JSON.stringify(response));
        dispatch(updateJwt(response.token));
        const { username } = jwt_decode(response.token);
        console.log(username);
        dispatch(updateName(username));
        navigate(location.state ? location.state.from.pathname : "/");
      },
      onError: ({ message }) => {
        setLoginError(message);
      },
    }
  );

  return mutation;
};
export const usePostRegister = (setRegisterError) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation(
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

  return mutation;
};
export const usePostTicket = (setTicketError) => {
  const navigate = useNavigate();

  const mutation = useMutation(
    (ticketData) => {
      axios.post("/api/users/tickets/create", ticketData);
    },
    {
      onSuccess: () => {
        navigate("/tickets");
      },
      onError: ({ message }) => {
        setTicketError(message);
      },
    }
  );

  return mutation;
};

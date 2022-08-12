import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

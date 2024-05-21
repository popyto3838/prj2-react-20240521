import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function BoardView() {
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/board/${id}`);
  }, []);

  return null;
}

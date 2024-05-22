import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function MemberView() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => setMember(res.data))
      .catch((error) => {
        if (error.response.status === 404) {
          toast({
            status: "warning",
            description: "존재하지 않는 회원입니다",
            position: "top",
          });
          navigate("/");
        }
      });
  }, []);

  if (member === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box mt={4}>회원정보</Box>
      <Box>
        <Box mt={4}>{member.id}번 회원님</Box>
        <Box mt={4}>
          <FormControl>
            <FormLabel>회원번호</FormLabel>
            <Input value={member.id} readOnly />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input value={member.email} readOnly />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>닉네임</FormLabel>
            <Input value={member.nickName} readOnly />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>가입일시</FormLabel>
            <Input value={member.inserted} readOnly type={"datetime-local"} />
          </FormControl>
        </Box>
        <Box>
          <Button colorScheme={"purple"}>수정</Button>
          <Button colorScheme={"red"}>삭제</Button>
        </Box>
      </Box>
    </Box>
  );
}

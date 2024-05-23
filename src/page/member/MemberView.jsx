import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export function MemberView() {
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { onOpen, isOpen, onClose } = useDisclosure();

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

  function handleClickRemove() {
    setIsLoading(true);

    axios
      .delete(`/api/member/${id}`, { data: { id, password } })
      .then(() => {
        toast({
          status: "success",
          description: "회원 탈퇴하였습니다.",
          position: "top",
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "warning",
          description: "회원 탈퇴 중 문제가 발생하였습니다.",
          position: "top",
        });
      })
      .finally(() => {
        setIsLoading(false);
        setPassword("");
        onClose();
      });
  }

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
          <Button
            colorScheme={"purple"}
            onClick={() => navigate(`/member/edit/${member.id}`)}
          >
            수정
          </Button>
          <Button colorScheme={"red"} onClick={onOpen}>
            탈퇴
          </Button>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>탈퇴 확인</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>암호</FormLabel>
              <Input onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button
              isLoading={isLoading}
              colorScheme={"red"}
              onClick={handleClickRemove}
            >
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

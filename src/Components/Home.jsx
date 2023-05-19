import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Redux/action";
import { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Select,
  Input,
  useColorMode,
  HStack,
  Heading,
} from "@chakra-ui/react";
import languages from "../language.json";

const Home = () => {
  const dispatch = useDispatch();
  const [view, setView] = useState(true);
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState("");
  const [text, setText] = useState("");
  const [search, setSearch] = useState("all");
  const { colorMode, toggleColorMode } = useColorMode("dark");
  const data = useSelector((store) => store.data);

  useEffect(() => {
    axios
      .get(
        `https://api.github.com/search/repositories?q=${search}+language:${language}&sort=stars&order=desc&page=${page}&per_page=10`
      )
      .then((res) => dispatch(getData(res.data.items)));
  }, [dispatch, page, language, search]);

  console.log(data);
  console.log(search);
  return (
    <Box>
      <Heading>Git Stars</Heading>
      <Box
        display={"flex"}
        m="auto"
        alignItems={"center"}
        justifyContent="space-around"
      >
        {/* Search box */}
        <HStack>
          <Input
            placeholder="Search Username"
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            onClick={() => {
              setSearch(text);
            }}
          >
            search
          </Button>
        </HStack>

        {/* filter */}
        <Box>
          <Select w={"200px"} onChange={(e) => setLanguage(e.target.value)}>
            {languages.map((ele) => (
              <option key={ele.value} value={ele.value}>
                {ele.label}
              </option>
            ))}
          </Select>
        </Box>

        {/* view by */}
        <Button onClick={() => setView(!view)} my={10}>
          {view ? "List" : "Grid"}
        </Button>
        {/* theme */}
        <Button onClick={toggleColorMode}>
          {colorMode === "dark" ? "Light Mode" : "Dark Mode"}
        </Button>
      </Box>
      {/* data map */}
      <Box
        w={"90%"}
        m="auto"
        display={view ? "grid" : "flex"}
        gridTemplateColumns={"repeat(4,1fr)"}
        flexDirection="column"
        gap={10}
      >
        {data.map((ele, i) => {
          return (
            <Box key={i} border="1px solid" p={5}>
              <Flex justifyContent={"space-around"}>
                <Avatar src={ele.owner.avatar_url} w={"50px"} h={"50px"} />
                <Box>
                  <Text fontWeight={700} mb={"3px"}>
                    {ele.owner.login}
                  </Text>
                  <Text as={"a"} href={ele.owner.html_url}>
                    View Profile
                  </Text>
                </Box>
              </Flex>
              <Box>
                <Text fontWeight={700} mb={"3px"}>
                  {ele.owner.login}
                </Text>
                <Text>{`Author : ${ele.owner.login} `}</Text>
                <Text>{`Date :${ele.created_at}`}</Text>
                {/* <Text  overflow={"hidden"}>{ele.description}</Text> */}
              </Box>
              <Box>
                <Button>{`Stars :${ele.stargazers_count}`}</Button>
                <Button>{`Forks :${ele.forks_count}`}</Button>
                <Button>{`Issues :${ele.open_issues_count}`}</Button>
              </Box>
            </Box>
          );
        })}
      </Box>
      {/* pagination */}
      <Box my={10}>
        <Button
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Prev
        </Button>
        <Button>{page}</Button>
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </Box>
    </Box>
  );
};

export default Home;

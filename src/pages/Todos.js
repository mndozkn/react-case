import React, { useEffect, useState } from "react";
import { Box, HStack, Input, Select, Button, Grid, GridItem, Text, Badge } from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons';
import AddTodo from "../components/Todos/AddTodo";
import UpdateTodo from "../components/Todos/UpdateTodo";
import axios from 'axios';
import { failedNotify, successNotify } from "../utils";

const Todos = () => {
	const [todos, setTodos] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [filter, setFilter] = useState("");

	console.log(filter);

	let allTodos = todos;

	// search
	if (searchText) {
		allTodos = todos.filter(todo => todo.title.toLowerCase().includes(searchText.toLowerCase()));
	}

	// filter
	if (filter) {
		let completed = filter === "completed" ? true : false;

		allTodos = allTodos.filter(todo => todo.completed === completed);
	}

	const addTodo = (todo) => {
		setTodos([todo, ...todos]);
	}

	const updateTodo = (updateTodo) => {
		const allTodos = [...todos];
		const index = todos.findIndex((t) => t.id === updateTodo.id);
		allTodos[index] = updateTodo;
		setTodos(allTodos);
	}

	const deletedTodo = async (todo) => {
		try {
			const response = await axios.delete(`http://localhost:3001/todos/${todo.id}`, todo);
			let newTodos = todos.filter((t) => t.id !== todo.id);
			setTodos(newTodos);
			successNotify("Yapılacak başarıyla silindi!");
		} catch (err) {
			failedNotify(err.message);
		}
	}

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				const response = await axios.get("http://localhost:3001/todos");
				setTodos(response.data);
			} catch (err) {
				console.log(err);
			}
		}

		fetchTodos()
	}, [])

	return (
		<Box bg="gray.200" w="100%" height="100%" p={4} color="white">
			<HStack>
				<Input bg="white" color="black" placeholder="Ara..." onChange={(e) => setSearchText(e.target.value)} />
				<Select bg="white" color="black" w="10%" onChange={(e) => setFilter(e.target.value)}>
					<option value="">Hepsi</option>
					<option value="completed">Bitirilmiş</option>
					<option value="pending">Yapılacak</option>
				</Select>
				<AddTodo onAdd={addTodo} />

			</HStack>
			<Grid templateColumns="repeat(4, 1fr)" gap="6" my="4">
				{
					allTodos.map((todo) => (
						<GridItem key={todo.id}>
							<Box bg="blue.200" color="black" p={3} boxShadow="outline" rounded="md">
								<HStack justifyContent="space-between">
									<Text fontWeight="bold" mt="2" w="80%" noOfLines={1}>{todo.title}</Text>
									<Button size="sm" color="red.600" _hover={{ bg: "red.600", color: "white" }} _active={{ bg: "red.900", color: "white" }} variant="ghost" onClick={() => { deletedTodo(todo); }}>
										<DeleteIcon />
									</Button>
									<UpdateTodo todo={todo} onUpdate={updateTodo} />
								</HStack>
								<Text fontWeight="bold">Durum:
									<Badge variant="subtle" colorScheme={todo.completed ? "green" : "red"}>{todo.completed ? "Tamamlandı" : "Tamamlanmadı"}</Badge>
								</Text>
							</Box>
						</GridItem>
					))
				}
			</Grid>
		</Box>
	);
};

export default Todos;

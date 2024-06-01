import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Input,
	FormControl,
	FormLabel,
	Button,
	useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React, { useState } from "react";
import axios from "axios";
import { failedNotify, successNotify } from '../../utils';

function AddTodo({ onAdd }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const initialRef = React.useRef(null);

	const [todo, setTodo] = useState({
		title: "",
		completed: false,
	});

	const handleChange = (e) => {
		const newTodo = { ...todo };
		newTodo[e.target.name] = e.target.value;
		setTodo(newTodo);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:3001/todos", todo);

			successNotify("Yapılacak başarıyla kaydedildi!")
			onAdd(response.data);
			onClose();
		} catch (err) {
			failedNotify(err.message);
		}
	}

	return (
		<>
			<Button onClick={onOpen} colorScheme="blue">
				<AddIcon />
			</Button>

			<Modal
				initialFocusRef={initialRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<form onSubmit={handleSubmit}>
					<ModalContent>
						<ModalHeader>Yapılacak Oluştur</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<FormControl isRequired>
								<FormLabel>Yapılacak</FormLabel>
								<Input ref={initialRef} name="title" onChange={handleChange} placeholder='Not...' />
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' type='submit' mr={3}>
								Kaydet
							</Button>
							<Button onClick={onClose}>İptal Et</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	)
}

export default AddTodo;
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
    Icon,
    Checkbox,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { FaRegEdit } from 'react-icons/fa';
import React, { useState } from "react";
import axios from 'axios';
import { failedNotify, successNotify } from '../../utils';

function UpdateTodo({ todo: todoToUpdate, onUpdate }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef(null);

    const [todo, setTodo] = useState(todoToUpdate);

    const handleChange = (e) => {
        const updatedTodo = { ...todo };

        if (e.target.type === "checkbox") {
            updatedTodo[e.target.name] = e.target.checked;
        } else {
            updatedTodo[e.target.name] = e.target.value;
        }
        setTodo(updatedTodo);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/todos/${todo.id}`, todo);

            successNotify("Yapılacak başarıyla güncellendi!");
            onUpdate(response.data);
            onClose();
        } catch (err) {
            failedNotify(err.message);
        }
    }

    return (
        <>
            <Button size="sm" color="green.600" _hover={{ bg: "green.600", color: "white" }} _active={{ bg: "green.900", color: "white" }} variant="ghost" onClick={onOpen}>
                <Icon as={FaRegEdit} />
            </Button>

            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <form onSubmit={handleSubmit}>
                    <ModalContent>
                        <ModalHeader>Yapılacak Düzenle</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl isRequired>
                                <FormLabel>Yapılacak</FormLabel>
                                <Input ref={initialRef} value={todo.title} placeholder='Not...' name='title' onChange={handleChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Yapılacak Durumu</FormLabel>
                                <Checkbox isChecked={todo.completed} name="completed" onChange={handleChange}>{todo.completed ? "Tamamlandı" : "Tamamlanmadı"}</Checkbox>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type="submit">
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

export default UpdateTodo;
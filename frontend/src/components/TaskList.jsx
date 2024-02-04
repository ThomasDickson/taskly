import React, { useEffect, useState } from 'react'

// components
import {
    Table, Thead, Tbody, Tr, Th, Td,
    TableContainer, Checkbox, Text,
    Flex, IconButton, HStack, useToast,
    Input, InputGroup, InputLeftElement, Box, useDisclosure, Card, Container, Button,
} from '@chakra-ui/react'
import CreateTask from './CreateTask'
import EditTask from './EditTask'

// icons
import { 
    AddIcon, DeleteIcon, EditIcon, SearchIcon 
} from '@chakra-ui/icons'

// api
import axios from 'axios'

// utils
import { formatDate } from '../utils/date'

const TaskList = () => {
    const toast = useToast();

    const [tasks, setTasks] = useState([]);

    const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure()
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/tasks/${id}`);
            // delete task from state
            setTasks((tasks) => tasks.filter(task => task.id !== id));

            toast({
                position: 'bottom-left',
                title: 'Success!',
                description: 'Task deleted successfully!',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                position: 'bottom-left',
                title: 'Error',
                description: 'Error deleting task.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    // update the state of tasks with newly created task
    const handleCreate = (task) => {
        setTasks([...tasks, task]);
    }

    // update the state of tasks with updated task
    const handleUpdate = (newTask) => {
        const updatedTasks = tasks.map((task) => task.id === newTask.id ? newTask : task)
        setTasks(updatedTasks);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/tasks/`);
                setTasks(response.data);
            } catch (error) {
                toast({
                    position: 'bottom-left',
                    title: 'Error',
                    description: 'Error fetching tasks.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }            
        };

        fetchData();
    }, []);

    return (
        <Flex 
            w='100%'
            direction='column'
            p={3}
            gap={3}
        >
            <Flex justify='space-between'>
                <Flex direction='column'>
                    <Text as='b' fontSize='2xl'>My Tasks</Text>
                    <Text fontSize='sm' color='gray.400'>{formatDate(new Date())}</Text>
                </Flex>
                <Button colorScheme='purple' rightIcon={<AddIcon />} onClick={onCreateOpen}>
                    New Task
                </Button>
                {/* <IconButton 
                    colorScheme='purple'
                    icon={<AddIcon />}
                    onClick={onCreateOpen}
                /> */}
            </Flex>
            <HStack>
                <InputGroup>
                    <InputLeftElement>
                        <SearchIcon color='gray.300' />
                    </InputLeftElement>
                    <Input type='search' placeholder='Looking for something specific?'/>
                </InputGroup>
                <Button colorScheme='purple'>  
                    Search
                </Button>
                <IconButton colorScheme='purple' variant='outline' isDisabled>
                    <DeleteIcon/>
                </IconButton>
            </HStack>
            <TableContainer
                borderWidth='1px'
                borderRadius='lg'
            >
                <Table
                    colorScheme='gray'
                    size='lg'
                >
                    <Thead>
                        <Tr>
                            <Th w='0'></Th>
                            <Th>Description</Th>
                            <Th>Due Date</Th>
                            <Th w='0'>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {tasks.map((task) => (
                            <>
                                <Tr key={task.id}>
                                    <Td>
                                        <Checkbox colorScheme='purple'/>
                                    </Td>
                                    <Td>{task.description}</Td>
                                    <Td>{formatDate(new Date(task.due_date))}</Td>
                                    <Td>
                                        <HStack>
                                            <IconButton 
                                                onClick={() => handleDelete(task.id)}
                                                icon={<DeleteIcon />}
                                            />
                                            <IconButton 
                                                icon={<EditIcon />}
                                                onClick={onEditOpen}
                                            />
                                        </HStack>
                                    </Td>
                                </Tr>
                                <EditTask 
                                    task={task}
                                    handleUpdate={handleUpdate}
                                    isOpen={isEditOpen}
                                    onClose={onEditClose}
                                />
                            </>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <CreateTask 
                isOpen={isCreateOpen}
                onClose={onCreateClose}
                handleCreate={handleCreate}
            />
        </Flex>
    )
}

export default TaskList
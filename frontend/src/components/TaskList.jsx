import React, { useEffect, useState } from 'react'

// components
import {
    Table, Thead, Tbody, Tr, Th, TableContainer, 
    Flex, IconButton, HStack, Input, InputGroup, 
    InputLeftElement, useDisclosure, Button, Text
} from '@chakra-ui/react'
import CreateTask from './CreateTask'
import Task from './Task'

// icons
import { 
    AddIcon, DeleteIcon, SearchIcon 
} from '@chakra-ui/icons'

// api
import axios from 'axios'

// hooks
import useAlert from '../hooks/useAlert'

// utils
import { formatDate } from '../utils/date'

const TaskList = () => {
    const alert = useAlert();

    const [tasks, setTasks] = useState([]);

    // manage drawer state for new tasks
    const { isOpen, onOpen, onClose } = useDisclosure()

    // delete the selected task from tasks state
    const onDelete = (id) => {
        setTasks((tasks) => tasks.filter(task => task.id !== id));
    }

    // update the tasks state with newly created task
    const onCreate = (task) => {
        setTasks([...tasks, task]);
    }

    // update the tasks state with updated task
    const onUpdate = (newTask) => {
        const updatedTasks = tasks.map((task) => task.id === newTask.id ? newTask : task)
        setTasks(updatedTasks);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/tasks/`);
                setTasks(response.data);
            } catch (error) {
                alert.error('Error fetching tasks.');
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
                <Button colorScheme='purple' rightIcon={<AddIcon />} onClick={onOpen}>
                    New Task
                </Button>
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
                            <Task 
                                task={task}
                                onDelete={onDelete}
                                onUpdate={onUpdate}
                            />
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <CreateTask 
                isOpen={isOpen}
                onClose={onClose}
                onCreate={onCreate}
            />
        </Flex>
    )
}

export default TaskList
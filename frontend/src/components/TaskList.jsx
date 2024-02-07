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
    AddIcon, DeleteIcon, SearchIcon, TriangleDownIcon, TriangleUpIcon 
} from '@chakra-ui/icons'

// api
import axios from 'axios'

// hooks
import useAlert from '../hooks/useAlert'
import useSearch from '../hooks/useSearch'

// utils
import { formatDate } from '../utils/date'

const TaskList = () => {
    const alert = useAlert();

    const [tasks, setTasks] = useState([]);
    
    // searching and sort state
    const [searchTerm, setSearchTerm] = useState('');
    const [ascending, setAscending] = useState(true);

    // manage drawer state for new tasks
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    // apply search term to sorted tasks
    const { filteredData } = useSearch(searchTerm, tasks)

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
                // fetch tasks with sorting parameter
                const response = await axios.get(`http://localhost:8000/api/tasks/`, {
                    params: {
                        'ascending': ascending
                    }
                });

                setTasks(response.data);
            } catch (error) {
                alert.error('Error fetching tasks.');
            }            
        };

        fetchData();
    }, [ascending]);

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
                    <Input 
                        type='search' 
                        placeholder='Looking for something specific?' 
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>
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
                            <Th>Description</Th>
                            <Th onClick={() => setAscending(!ascending)} cursor="pointer">
                                Due Date {ascending ? <TriangleUpIcon /> : <TriangleDownIcon />}
                            </Th>
                            <Th w='0'>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredData.map((task) => (
                            <Task 
                                task={task}
                                onDelete={onDelete}
                                onUpdate={onUpdate}
                            />
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            {/* Drawer for Creating a Task */}
            <CreateTask 
                isOpen={isOpen}
                onClose={onClose}
                onCreate={onCreate}
            />
        </Flex>
    )
}

export default TaskList
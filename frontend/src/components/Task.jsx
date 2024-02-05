import React from 'react'

import axios from 'axios';

import {
    Tr, Td, Checkbox, IconButton, HStack
} from '@chakra-ui/react'
import EditTask from './EditTask'

// icons
import { 
    DeleteIcon, EditIcon
} from '@chakra-ui/icons'

// hooks
import { useDisclosure } from '@chakra-ui/react';
import useAlert from '../hooks/useAlert';

// utils
import { formatDate } from '../utils/date';

const Task = ({ task, onDelete, onUpdate }) => {
    const alert = useAlert();

    // manage drawer state for editing task
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/tasks/${id}`);
            // delete task from state
            onDelete(id);

            alert.success('Task deleted successfully!');
        } catch (error) {
            alert.error('Error deleting task.')
        }
    }

    return (
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
                            onClick={onOpen}
                        />
                    </HStack>
                </Td>
            </Tr>
            <EditTask 
                task={task}
                onUpdate={onUpdate}
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    )
}

export default Task
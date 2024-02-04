import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import TaskForm from './TaskForm'

// hooks
import { useToast } from '@chakra-ui/react'

// api
import axios from 'axios'

const EditTask = ({ task, isOpen, onClose, handleUpdate }) => {
    const toast = useToast();

    const onSubmit = async (data) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/tasks/${task.id}`, data);
            // update tasks state with new task
            handleUpdate(response.data);
            
            toast({
                position: 'bottom-left',
                title: 'Success!',
                description: 'Task updated successfully!',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                position: 'bottom-left',
                title: 'Error',
                description: 'Error creating task',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        } finally {
            // close drawer
            onClose();
        }
    };

    return (
        <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='md'>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Modify Task</DrawerHeader>
                <TaskForm onSubmit={onSubmit} onClose={onClose} task={task}/>
            </DrawerContent>
        </Drawer>
    )
}

export default EditTask
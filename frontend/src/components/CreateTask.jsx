import React from 'react'

// components
import { 
    Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay
} from '@chakra-ui/react'
import TaskForm from './TaskForm'

// hooks
import { useToast } from '@chakra-ui/react'

// api
import axios from 'axios'

const CreateTask = ({ isOpen, onClose, handleCreate }) => {
    const toast = useToast();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/tasks/`, data);
            // update tasks state with new task
            handleCreate(response.data);
            
            toast({
                position: 'bottom-left',
                title: 'Success!',
                description: 'Task created successfully!',
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
                <DrawerHeader>New Task</DrawerHeader>
                <TaskForm onSubmit={onSubmit} onClose={onClose}/>
            </DrawerContent>
        </Drawer>
    )
}

export default CreateTask
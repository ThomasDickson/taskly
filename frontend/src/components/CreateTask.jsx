import React from 'react'

// components
import { 
    Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay
} from '@chakra-ui/react'
import TaskForm from './TaskForm'

// hooks
import useAlert from '../hooks/useAlert'

// api
import axios from 'axios'

const CreateTask = ({ isOpen, onClose, onCreate }) => {
    const alert = useAlert();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/tasks/`, data);
            // update tasks state with new task
            onCreate(response.data);
            
            alert.success('Task created successfully!');
        } catch (error) {
            alert.error('Error creating task.')
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
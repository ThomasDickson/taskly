import React, { useEffect } from 'react'

// components
import { 
    Drawer, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay
} from '@chakra-ui/react'
import TaskForm from './TaskForm'

// hooks
import useAlert from '../hooks/useAlert'

// api
import axios from 'axios'

const EditTask = ({ task, isOpen, onClose, onUpdate }) => {
    const alert = useAlert();

    const onSubmit = async (data) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/tasks/${task.id}`, data);
            // update tasks state with new task
            onUpdate(response.data);
            
            alert.success('Task updated successfully!');
        } catch (error) {
            alert.error('Error saving task.');
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
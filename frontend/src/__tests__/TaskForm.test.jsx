import TaskForm from "../components/TaskForm"
import { ChakraProvider, Drawer, DrawerContent } from "@chakra-ui/react"
import { cleanup, render, screen } from '@testing-library/react'

afterEach(() => {
    cleanup();
})

describe('TaskForm component', () => {
    it('renders properly', () => {
        // render TaskForm within a Drawer
        render(
            <Drawer isOpen={true}>
                <TaskForm/>
            </Drawer>
        );
        
        expect(screen.getByTestId('description')).toBeInTheDocument()
        expect(screen.getByTestId('due-date')).toBeInTheDocument()
        expect(screen.getByTestId('comments')).toBeInTheDocument()
    });

    it('renders properly with input', () => {
        // render TaskForm within a Drawer
        const task = {
            'description': 'Test Description',
            'due_date': '2002-12-13',
            'comments': 'Test Comment'
        }
        render(
            <Drawer isOpen={true}>
                <TaskForm task={task}/>
            </Drawer>
        );
        
        // assert that input components contain correct values
        expect(screen.getByTestId('description')).toHaveValue('Test Description');
        expect(screen.getByTestId('due-date')).toHaveValue('2002-12-13');
        expect(screen.getByTestId('comments')).toHaveValue('Test Comment');
    });
})
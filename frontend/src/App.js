import Navbar from './components/Navbar';
import TaskList from './components/TaskList';

import { ChakraProvider } from '@chakra-ui/react'

function App() {
    return (
        <ChakraProvider>
            <Navbar />
            <TaskList />
        </ChakraProvider>
    );
}

export default App;

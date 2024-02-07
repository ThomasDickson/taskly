import { useEffect, useState } from "react";

/**
 * Custom hook to perform responsive searching
 * @param {string} searchTerm 
 * @param {Array} tasks 
 */
const useSearch = (searchTerm, tasks) => {
    const [ filteredData, setFilteredData ] = useState(tasks);

    // apply the search term to tasks
    const applySearch = () => {
        const filteredTasks = tasks.filter(task =>
            task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.comments.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Update the filteredData state with the filtered tasks
        setFilteredData(filteredTasks);
    }

    useEffect(() => {
        applySearch();
    }, [searchTerm, tasks])

    return { filteredData }
}

export default useSearch
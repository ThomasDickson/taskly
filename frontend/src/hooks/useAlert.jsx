import { useToast } from "@chakra-ui/react"

/**
 *  Custom hook to create reusable toasts.
 */
const useAlert = () => {
    const toast = useToast();

    const success = (description) => {
        toast({
            position: 'bottom-left',
            title: 'Success!',
            description: description,
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    }

    const error = (description) => {
        toast({
            position: 'bottom-left',
            title: 'Error',
            description: description,
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    }

    return { success, error };
}

export default useAlert;
import React, { useEffect } from 'react'

// components
import { Button, DrawerBody, DrawerFooter, FormControl, FormErrorMessage, FormLabel, Input, Stack, Textarea } from '@chakra-ui/react'


// hooks
import { useForm } from 'react-hook-form';


const TaskForm = ({ task, onSubmit, onClose }) => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm();

    useEffect(() => {
        reset(task)
    }, [task])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerBody>
                <Stack>
                    <FormControl isInvalid={errors.description}>
                        <Input
                            placeholder='Description *'
                            {...register('description', {
                                required: 'Description is required'
                            })}
                        />
                        <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl>
                        <Input 
                            type='date'
                            placeholder='Due Date'
                            {...register('due_date')}
                        />
                    </FormControl>
                    <FormControl>
                        <Textarea 
                            resize='vertical'
                            placeholder='Comments'
                            {...register('comments')}
                        />
                    </FormControl>
                </Stack>
            </DrawerBody>
            <DrawerFooter>
                <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
                </Button>
                <Button colorScheme='purple' type='submit'>Save</Button>
            </DrawerFooter>
        </form>
    )
}

export default TaskForm
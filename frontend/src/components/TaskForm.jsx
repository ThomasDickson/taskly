import React, { useEffect } from 'react'

// components
import { 
    Button, ButtonGroup, DrawerBody, DrawerFooter, FormControl, 
    FormErrorMessage, Input, Stack, Textarea 
} from '@chakra-ui/react'

// hooks
import { useForm } from 'react-hook-form';

const TaskForm = ({ task, onSubmit, onClose }) => {
    // form state and submission using react-hook-form
    const { 
        handleSubmit, 
        register, 
        reset, 
        formState: { errors } 
    } = useForm();

    // reset form values with task
    useEffect(() => {
        reset(task)
    }, [task])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerBody>
                <Stack>
                    <FormControl isInvalid={errors.description}>
                        <Input
                            data-testid="description"
                            placeholder='Description *'
                            {...register('description', {
                                required: 'Description is required'
                            })}
                        />
                        <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.due_date}>
                        <Input 
                            data-testid="due-date"
                            type='date'
                            placeholder='Due Date'
                            {...register('due_date', {
                                required: 'Date is required'
                            })}
                        />
                        <FormErrorMessage>{errors.due_date && errors.due_date.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl>
                        <Textarea 
                            data-testid="comments"
                            resize='vertical'
                            placeholder='Comments'
                            {...register('comments')}
                        />
                    </FormControl>
                </Stack>
            </DrawerBody>
            <DrawerFooter>
                <ButtonGroup>
                    <Button colorScheme='purple' variant='outline' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='purple' type='submit'>
                        Save
                    </Button>
                </ButtonGroup>
            </DrawerFooter>
        </form>
    )
}

export default TaskForm
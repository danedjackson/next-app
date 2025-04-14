'use client'
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationShemas'
import { z } from 'zod'

import axios from 'axios'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit, formState: {  errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  })
  const [error, setError] = useState('')

  return (
    <div className='max-w-xl space-y-3'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form  
          onSubmit={handleSubmit(async (data) => {
            try{
              await axios.post('/api/issues', data)
              router.push('/issues')
            } catch(error) {
              setError('An unexpected error occurred')
            }
          })}>
          <TextField.Root placeholder='Title' {...register('title')}/>
          {errors.title && <Text color='red' as ='p'>{errors.title.message}</Text>}
          <Controller 
              name='description'
              control={control}
              render={({field}) => <SimpleMDE placeholder='Description' {...field} /> }
          />
          {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
          <Button variant='soft'>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
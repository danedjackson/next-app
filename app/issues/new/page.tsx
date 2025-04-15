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
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit, formState: {  errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  })
  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const submitForm = handleSubmit(async (data) => {
    try{
      setSubmitting(true)
      await axios.post('/api/issues', data)
      router.push('/issues')
    } catch(error) {
      setError('An unexpected error occurred')
      setSubmitting(false)
    } 
  })

  return (
    <div className='max-w-xl space-y-3'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form  
          onSubmit={submitForm}>
          <TextField.Root placeholder='Title' {...register('title')}/>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller 
              name='description'
              control={control}
              render={({field}) => <SimpleMDE placeholder='Description' {...field} /> }
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
          <Button disabled = {isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
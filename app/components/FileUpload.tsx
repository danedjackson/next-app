'use client'
import React, {useState} from 'react'
import axios from 'axios'
import { Button } from '@radix-ui/themes'
import ErrorMessage from './ErrorMessage'

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string>('')
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files) {
        setFile(event.target.files[0])
    }
  }
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if(!file) return;

    const formData = new FormData()
    formData.append('file', file)

    try {
        const response = await axios.post('api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                const percentageCompleted = Math.round(
                    (progressEvent.loaded * 100 / (progressEvent.total || 1))
                )
                setUploadProgress(percentageCompleted)
            }
        })
        console.log(response)
    } catch(error) {
        setError('Uploading file failed!')
    }
  }

  return (
    <div>
        <form onSubmit = { handleSubmit } className = 'flex flex-col gap-6'>
            <h1>Upload a File</h1>
            <input type = 'file' onChange = { handleChange } />
            <Button>Upload</Button>
            {uploadProgress >0 && (
                <>
                <progress value = {uploadProgress} max = '100'></progress>
                <p>Upload Progress: {uploadProgress}%</p>
                </>
            )}
            {error !== '' && <ErrorMessage>{error}</ErrorMessage>}
        </form>
    </div>
  )
}

export default FileUpload
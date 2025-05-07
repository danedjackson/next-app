'use client'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Button } from '@radix-ui/themes'
import ErrorMessage from './ErrorMessage'
import { headers } from 'next/headers'

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string>('')
  const [nonce, setNonce] = useState<string | null>(null)

  // Fetch nonce when the component mounts
  useEffect(() => {
    const fetchNonce = async () => {
        try {
            const response = await axios.get('/api/nonce');
            setNonce(response.data.nonce); // Retrieve nonce from API response
        } catch (error) {
            console.error('Error fetching nonce:', error);
        }
    };

    fetchNonce();
  }, []);

  
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
                'Content-Type': 'multipart/form-data',
                'X-Nonce': nonce // Necessary to conform to CSP
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
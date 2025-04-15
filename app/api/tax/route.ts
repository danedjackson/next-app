import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path';

export async function POST(request: NextRequest) {
    const data = await request.formData()
    const file = data.get('file') as File

    if(!file) {
        return NextResponse.json({message: 'Could not retrieve file form the request'}, {status: 400})
    }

    const targetPath = path.join(process.cwd(), 'public/uploads')

    try {
        // Make sure the upload folder exists
        fs.mkdirSync(targetPath, {recursive: true})
        const fileName = file.name.replaceAll(' ', '_');

        const filePath = path.join(targetPath, fileName)

        // Read file buffer
        const buffer = Buffer.from(await file.arrayBuffer())
        
        fs.writeFileSync(filePath, buffer)

        return new NextResponse(
            JSON.stringify({
                message: 'File uploaded succesfully',
                fileUrl: '/uploads/' + fileName,
            }),
            {status: 200}
        )
    }
    catch(error) {
        return new NextResponse(
            JSON.stringify({
                message: 'Failed to upload file',
            }), 
            {status: 500}
        )
    }
}
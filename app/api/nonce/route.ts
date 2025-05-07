import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET(req: NextRequest) {
    const nonce = (await headers()).get('X-Nonce'); // Retrieve nonce from headers
    console.log(`Nonce = ${nonce}`)
    if (!nonce) {
        return NextResponse.json({ error: 'Nonce not found' }, { status: 400 });
    }
    return NextResponse.json({ nonce });
}

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()
    
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'YOUR_N8N_WEBHOOK_URL'
    
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        query,
        timestamp: new Date().toISOString()
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to process AI search')
    }

    const data = await response.json()
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('AI Search Error:', error)
    return NextResponse.json(
      { error: 'Failed to process search' },
      { status: 500 }
    )
  }
}
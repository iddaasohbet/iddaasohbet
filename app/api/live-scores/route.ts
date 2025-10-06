import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const league = searchParams.get('league') || 'super-lig'

  try {
    const response = await fetch(`https://api.collectapi.com/sport/results?league=${league}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': 'apikey 6QVKnvJSdixRpZFgKsb40P:6ZRwAYbLqI3ItckKfspGoB'
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('API request failed')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Live scores API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch live scores' },
      { status: 500 }
    )
  }
}

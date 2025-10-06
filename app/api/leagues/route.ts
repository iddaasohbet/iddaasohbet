import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // API-Football'dan ligleri çek
    const apiKey = '303a19f14f12a119e136c61bdf8262ea'
    const response = await fetch('https://v3.football.api-sports.io/leagues?current=true&type=league', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-apisports-key': apiKey
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('API request failed')
    }

    const data = await response.json()
    console.log('Leagues API response:', data.results)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Leagues API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leagues', response: [] },
      { status: 500 }
    )
  }
}

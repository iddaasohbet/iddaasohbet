import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // API-Football'dan ligleri çek
    const apiKey = process.env.APIFOOTBALL_KEY || process.env.NEXT_PUBLIC_APIFOOTBALL_KEY || '807916c44ff9ddf5dcaf7cf22109b9cd'
    const response = await fetch('https://v3.football.api-sports.io/leagues?current=true&type=league', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'v3.football.api-sports.io'
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

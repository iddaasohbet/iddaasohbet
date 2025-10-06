import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const league = searchParams.get('league') || '203' // 203 = Süper Lig
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0] // Bugünün tarihi

  try {
    // Canlı maçlar için live=all, bugünün maçları için date parametresi
    const response = await fetch(`https://v3.football.api-sports.io/fixtures?league=${league}&season=2024&date=${date}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '807916c44ff9ddf5dcaf7cf22109b9cd',
        'x-rapidapi-host': 'v3.football.api-sports.io'
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

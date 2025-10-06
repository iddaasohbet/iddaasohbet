import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'today' // 'today' veya 'live'
  
  try {
    let url = 'https://v3.football.api-sports.io/fixtures?'
    
    if (type === 'live') {
      // Canlı maçlar
      url += 'live=all'
    } else {
      // Bugünün maçları (Süper Lig)
      const today = new Date().toISOString().split('T')[0]
      url += `league=203&season=2024&date=${today}`
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '807916c44ff9ddf5dcaf7cf22109b9cd',
        'x-rapidapi-host': 'v3.football.api-sports.io'
      },
      next: { revalidate: 60 } // 60 saniye cache
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

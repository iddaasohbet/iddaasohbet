import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'today' // 'today' veya 'live'
  
  try {
    let url = 'https://v3.football.api-sports.io/fixtures?'
    
    if (type === 'live') {
      // Canlı maçlar (tüm dünyadan)
      url += 'live=all'
    } else {
      // Bugünün maçları (Süper Lig - league id: 203)
      const today = new Date().toISOString().split('T')[0]
      url += `league=203&season=2024&date=${today}`
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '807916c44ff9ddf5dcaf7cf22109b9cd',
        'x-rapidapi-host': 'v3.football.api-sports.io'
      },
      cache: 'no-store' // Her zaman fresh data
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error:', response.status, errorText)
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    
    // API response kontrolü
    if (data.errors && data.errors.length > 0) {
      console.error('API Errors:', data.errors)
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Live scores API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch live scores',
        response: [],
        results: 0
      },
      { status: 500 }
    )
  }
}

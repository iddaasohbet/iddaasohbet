import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'last' // 'today', 'live' veya 'last'
  
  try {
    let url = 'https://v3.football.api-sports.io/fixtures?'
    
    if (type === 'live') {
      // Canlı maçlar
      url += 'live=all'
    } else if (type === 'today') {
      // Bugünün maçları (Süper Lig)
      const today = new Date().toISOString().split('T')[0]
      url += `league=203&season=2025&date=${today}`
    } else {
      // Son 20 maç (her zaman veri var)
      url += 'last=20'
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '807916c44ff9ddf5dcaf7cf22109b9cd',
        'x-rapidapi-host': 'v3.football.api-sports.io'
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    
    // Eğer bugün maç yoksa veya canlı maç yoksa, son maçları getir
    if ((type === 'today' || type === 'live') && (!data.response || data.response.length === 0)) {
      const fallbackUrl = 'https://v3.football.api-sports.io/fixtures?last=20'
      const fallbackResponse = await fetch(fallbackUrl, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '807916c44ff9ddf5dcaf7cf22109b9cd',
          'x-rapidapi-host': 'v3.football.api-sports.io'
        },
        cache: 'no-store'
      })
      
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json()
        return NextResponse.json(fallbackData)
      }
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

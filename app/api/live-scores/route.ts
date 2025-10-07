import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'live' // 'today' veya 'live'
  
  try {
    const apiKey = '303a19f14f12a119e136c61bdf8262ea'
    let url = 'https://v3.football.api-sports.io/fixtures?'
    
    if (type === 'live') {
      // Canlı maçlar
      url += 'live=all'
    } else if (type === 'today') {
      // Bugünün maçları (global) - Europe/Istanbul zaman dilimine göre
      const todayIstanbul = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Europe/Istanbul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(new Date())
      url += `date=${todayIstanbul}`
    } else {
      // Varsayılan
      url += 'live=all'
    }
    // Zaman dilimi
    url += '&timezone=Europe/Istanbul'

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        // Her iki başlık türünü gönderelim (bazı ortamlarda biri gerekecek)
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-apisports-key': apiKey
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    
    console.log('API Response:', JSON.stringify(data).substring(0, 500))
    console.log('Results count:', data.results)
    
    // Eğer canlı yoksa bugünü dene
    if ((type === 'today' || type === 'live') && (!data.response || data.response.length === 0)) {
      console.log('No matches found, fetching today...')
      const todayIstanbul = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Europe/Istanbul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(new Date())
      const fallbackUrl = `https://v3.football.api-sports.io/fixtures?date=${todayIstanbul}&timezone=Europe/Istanbul`
      const fallbackResponse = await fetch(fallbackUrl, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-apisports-key': apiKey
        },
        cache: 'no-store'
      })
      
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json()
        console.log('Fallback data results:', fallbackData.results)
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

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'live' // 'today', 'live', 'next'
  
  try {
    const apiKey = '807916c44ff9ddf5dcaf7cf22109b9cd'
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
    } else if (type === 'next') {
      // Yaklaşan maçlar
      url += 'next=20'
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
    
    // Eğer canlı/yoksa bugün; o da yoksa next
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
        if (fallbackData?.response?.length > 0) {
          return NextResponse.json(fallbackData)
        }
      }

      // Ek fallback: next=20 (yaklaşan maçlar)
      const nextUrl = 'https://v3.football.api-sports.io/fixtures?next=20&timezone=Europe/Istanbul'
      const respNext = await fetch(nextUrl, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-apisports-key': apiKey
        },
        cache: 'no-store'
      })
      if (respNext.ok) {
        const dataNext = await respNext.json()
        return NextResponse.json(dataNext)
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

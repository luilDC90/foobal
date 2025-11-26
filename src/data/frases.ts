export interface FraseIconica {
  id: string
  frase: string
  autor: string
  opciones: string[]
  imagen: string
  contexto?: string
}

export const frasesIconicas: FraseIconica[] = [
  {
    id: '1',
    frase: 'La pelota no se mancha',
    autor: 'Diego Maradona',
    opciones: ['Diego Maradona', 'Carlos Bilardo', 'Juan Román Riquelme', 'Carlos Tévez'],
    imagen: 'https://imgs.search.brave.com/LUdBxpv3tsMXvdiZe5ehBRx7_Ddi7c6Lbqe5tLC3nX8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmd1/aW0uY28udWsvaW1n/L21lZGlhLzc4MDM0/NDQxZmE1MzM0Y2Ew/NzZhMWM3MjBlYzFi/Y2VkN2ZiNjhhMTcv/MF8wXzM0MjhfNTE2/OC9tYXN0ZXIvMzQy/OC5qcGc_d2lkdGg9/Mzc1JmRwcj0xJnM9/bm9uZSZjcm9wPW5v/bmU',
    contexto: 'Frase icónica de Maradona defendiendo su legado'
  },
  {
    id: '2',
    frase: 'Que la gente crea porque tienen con qué creer',
    autor: 'Marcelo Gallardo',
    opciones: ['Marcelo Gallardo', 'Ariel Ortega', 'Enzo Francescoli', 'Ramón Díaz'],
    imagen: 'https://imgs.search.brave.com/x24xwRkj8RTAYgIIG29aZUtW-cfKQSPDcbm7SE1tzw0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/Y2Fub25pemFyb24t/YS1zYXBhcmRvLXYw/LXhrNjF2bG1oYnhr/ZTEucG5nP3dpZHRo/PTcyMCZhdXRvPXdl/YnAmcz1lMDZkYjYx/NGYzZjlkOGNiNDBm/ODNhNTU2OTIwYjU2/NDQzNzJlYjBk',
    contexto: 'Gallardo motivando a la hinchada de River'
  },
  {
    id: '3',
    frase: 'La mujer de Cardetti lo hace cornudo',
    autor: 'Maximiliano Estevez',
    opciones: ['Maximiliano Estevez', 'Javier Pinola', 'Diego Cocca', 'Gabriel Heinze'],
    imagen: 'https://imgs.search.brave.com/ackBeGIO9NRxj56HZPMF_x8cNDOZVTGdpeXSlGUdOc8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/b2xlLmNvbS5hci9p/bWFnZXMvMjAyMS8w/MS8zMS9lRVRNM1BW/bWpfNzIweDBfXzEu/anBn',
    contexto: 'Polémica frase captada por un micrófono durante un partido'
  },
  {
    id: '4',
    frase: 'Me cansé, vamos a salir campeones',
    autor: 'Reynaldo Merlo',
    opciones: ['Reynaldo Merlo', 'Alfio Basile', 'Diego Cagna', 'Sergio Batista'],
    imagen: 'https://imgs.search.brave.com/syDUoGfrPqa3svA_LKz9F7uadDvYpCOx_sjxBTYJg0g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZWxwcmltZXJncmFu/ZGUuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDI1LzA1L21l/cmxvLmpwZw',
    contexto: 'Arenga histórica de Merlo en San Lorenzo'
  },
  {
    id: '5',
    frase: 'Hay que cerrar el estadio, los genios hacen eso',
    autor: 'Alfio Basile',
    opciones: ['Alfio Basile', 'Carlos Bilardo', 'Marcelo Bielsa', 'Ramón Díaz'],
    imagen: 'https://imgs.search.brave.com/-QwcUhC3x6_AyZQAvSUuhBfBjHSOLe1U9d3_qHcC0rw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjIw/ODM5MDc5NC9waG90/by9tYXNzYWNodXNl/dHRzLXVuaXRlZC1z/dGF0ZXMtYWxmaW8t/YmFzaWxlLWZvb3Ri/YWxsLW1hbmFnZXIt/b2YtYXJnZW50aW5h/LW9uLXRoZS1zaWRl/LWxpbmUuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPThILWZl/Q1RUSlR2VndVRmFi/dE5Gdng1LWpUcG11/TF9nYmFvR0xHOExI/R2M9',
    contexto: 'Basile ironizando sobre una decisión administrativa'
  },
  {
    id: '6',
    frase: '¿Tercero salieron? Jaja!',
    autor: 'Ramón Díaz',
    opciones: ['Ramón Díaz', 'Marcelo Gallardo', 'Ariel Holan', 'Diego Simeone'],
    imagen: 'https://imgs.search.brave.com/REZSBlPB7ZS8NP77t6Y5sgsU7PFE3Rl7PAIepn9P5u4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg3/MTc5NTA3L3Bob3Rv/L2J1ZW5vcy1haXJl/cy1hcmdlbnRpbmEt/cmFtb24tZGlhei1j/b2FjaC1vZi1yaXZl/ci1wbGF0ZS1sb29r/cy1vbi1kdXJpbmct/YS1tYXRjaC1iZXR3/ZWVuLXJpdmVyLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz0y/X19Bc2pQZThJeVZF/Mlo1Q0RHV2IzMnQt/TVhDZEgyUm91ak5N/cXBuaS0wPQ',
    contexto: 'Ramón Díaz burlándose de River en una entrevista'
  },
  {
    id: '7',
    frase: 'A River se le cayó la bombacha',
    autor: 'Diego Maradona',
    opciones: ['Diego Maradona', 'Juan Román Riquelme', 'Martín Palermo', 'Carlos Tévez'],
    imagen: 'https://imgs.search.brave.com/LUdBxpv3tsMXvdiZe5ehBRx7_Ddi7c6Lbqe5tLC3nX8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmd1/aW0uY28udWsvaW1n/L21lZGlhLzc4MDM0/NDQxZmE1MzM0Y2Ew/NzZhMWM3MjBlYzFi/Y2VkN2ZiNjhhMTcv/MF8wXzM0MjhfNTE2/OC9tYXN0ZXIvMzQy/OC5qcGc_d2lkdGg9/Mzc1JmRwcj0xJnM9/bm9uZSZjcm9wPW5v/bmU',
    contexto: 'Maradona durante una transmisión criticando a River'
  }
]

export const getRandomFrase = (): FraseIconica => {
  const randomIndex = Math.floor(Math.random() * frasesIconicas.length)
  return frasesIconicas[randomIndex]
}

export const getFraseById = (id: string): FraseIconica | undefined => {
  return frasesIconicas.find(frase => frase.id === id)
}

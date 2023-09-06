import Link from "next/link"

const endpoint = 'http://localhost:4001/graphql'

export async function getTitleArray() {
  
    const QUERY = `{
      chapterConnection {
          edges {
              node {
                  id
              }
          }
      }
  }`

    const response = await (fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: QUERY
      })
    }))
  
    const data = await response.json()
    const titlesArray = await data.data.chapterConnection.edges.map(edge => edge.node)

    return titlesArray.map(node => node.id
      .split('/')
      .pop()
      .replace(/\.mdx$/,"")) 
}

export default async function TOC() {
  
  const titles = await getTitleArray()

  return (
    <ul>
      {titles.map((title, index) => (
        <li key={index}>
          <Link href={`/chapter/${title}`}>{title}</Link>
        </li>
      ))}
    </ul>
  )
}

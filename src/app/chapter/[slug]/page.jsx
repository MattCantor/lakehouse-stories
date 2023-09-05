import { fetch } from 'graphql-fetch'

export default function Page({ params }) {
    return <div>Chapter: {params.slug}</div>
  }

  export async function generateStaticParams() {
    
    const QUERY = `
        {
            chapterConnection {
                edges {
                    node {
                        id
                    }
                }
            }
        }`
    
    const response = await fetch('http://localhost:3000/index.html#/graphql', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: QUERY})
    })

    const data = await response.json()
    const slugs = data.data.chapterConnection.edges.map(edge =>
        edge.node.id)
   
    return slugs.map(slug => ({
      slug: slug,
    }))
  }
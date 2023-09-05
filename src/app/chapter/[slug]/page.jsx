export default function Page({ params }) {
    
    const { slug } = params
    
    return <div>Chapter: {decodeURIComponent(slug)}</div>
  }

  export async function generateStaticParams() {
    
    const QUERY = `
        {
            chapterConnection {
                edges {
                    node {
                        title
                    }
                }
            }
        }`
    
    const response = await fetch('http://localhost:4001/graphql', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: QUERY})
    })

    const data = await response.json()
    const titleArray = await data.data.chapterConnection.edges.map(edge =>
        edge.node)
   
    return titleArray.map(node => ({
      title: node.title,
    }))
  }
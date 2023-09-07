import { client } from '../../../../tina/__generated__/client.js'
import Chapter from '../../../components/chapter.jsx'

export default async function Page({ params }) {

    const { slug } = params

    // const chapter = await client.queries.chapterConnection({
    //     filter: { title: { startsWith: 'Wally'}},
    // })
    // console.log(chapter.title)

    return (
    <>
    {/* <div>Chapter: {decodeURIComponent(slug)}</div> */}
    <Chapter slug={slug}/>
    </>
    
    )
  }

  export async function generateStaticParams() {
    
    // const QUERY = `
    //     {
    //         chapterConnection {
    //             edges {
    //                 node {
    //                     id
    //                 }
    //             }
    //         }
    //     }`
    
    // const response = await fetch('http://localhost:4001/graphql', 
    // {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ query: QUERY})
    // })

    // const data = await response.json()
    // const titleArray = await data.data.chapterConnection.edges.map(edge =>
    //     edge.node)

    const data = await client.queries.chapterConnection()
    const titleArray = data.data.chapterConnection.edges.map(edge => edge.node)
   
    return titleArray.map(node => ({
      id: node.id
    }))
  }
import { client } from '../../../../tina/__generated__/client.js'
// import Chapter from '../../../components/chapter.jsx'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

export default async function Page({ params }) {

  const { slug } = params
  console.log(`slug: ${slug}`)
  const post = await client.queries.chapter({relativePath: `${slug}.mdx`})
  console.log(post.data.chapter.body.children.map(children => children.children))

  return (<>
      {/* <h1>{post.data.chapter.title}</h1>
      <h2>{post.data.chapter.synopsis}</h2> */}
      <TinaMarkdown content={post.data.chapter.body}/>
    </>)
  }

  export async function generateStaticParams() {

    const data = await client.queries.chapterConnection()
    // console.table(`data: ${data.data.chapterConnection.edges[0].node.body.children[0].children[0].text}`)
    const titleArray = data.data.chapterConnection.edges.map(edge => edge.node)
    // console.log(`titleArray: ${titleArray}`)
    // console.table(`nodeID: ${titleArray.map(node => ({id: node.id}))[0].id}`)
   
    return titleArray.map(node => ({
      id: node.id
    }))
  }

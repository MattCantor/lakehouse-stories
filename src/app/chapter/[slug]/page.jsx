import { client } from '../../../../tina/__generated__/client.js'
// import Chapter from '../../../components/chapter.jsx'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

export const dynamic = "force-dynamic"

const components = {
  p: (props) => {
    return (
      <p className="indent-2 text-justify pb-2 first-of-type:first-letter:text-xl first-of-type:first-letter:font-bold first-of-type:first-letter:uppercase">{props.children}</p>
    )
  }
}

export default async function Page({ params }) {

  const { slug } = params
  const post = await client.queries.chapter({relativePath: `${slug}.mdx`})

  return (<>
      <h1 className="tracking-wide uppercase text-center font-bold">{post.data.chapter.title}</h1>
      <h2 className="text-center italic pb-2">{post.data.chapter.synopsis}</h2>
      <TinaMarkdown content={post.data.chapter.body} components={components}/>
    </>)
  }

  export async function generateStaticParams() {

    const data = await client.queries.chapterConnection()
    const titleArray = data.data.chapterConnection.edges.map(edge => edge.node)
   
    return titleArray.map(node => ({
      id: node.id
    }))
  }

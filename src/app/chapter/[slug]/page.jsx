import { client } from '../../../../tina/__generated__/client.js'
// import Chapter from '../../../components/chapter.jsx'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import Paginate from '@/src/components/paginate.jsx'

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
  // console.log(`slug in Page: ${slug}`)
  const post = await client.queries.chapter({relativePath: `${slug}.mdx`})
  
  const data = await client.queries.chapterConnection()
  const pathArray = data.data.chapterConnection.edges.map(edge => edge.node._sys.filename)

  const currentIndex = pathArray.findIndex(path => path === slug)
  const prev = currentIndex === 0 ? pathArray[pathArray.length - 1] : pathArray[currentIndex - 1]
  const next = currentIndex === pathArray.length - 1 ? pathArray[0] : pathArray[currentIndex + 1] 


  return (<>
      <Paginate next={next} prev = {prev}/>
      <h1 className="tracking-wide uppercase text-center font-bold text-xl">{post.data.chapter.title}</h1>
      <h2 className="text-center italic pb-2">{post.data.chapter.synopsis}</h2>
      <TinaMarkdown content={post.data.chapter.body} components={components}/>
      <Paginate next={next} prev = {prev}/>
    </>)
  }

  export async function generateStaticParams() {

    const data = await client.queries.chapterConnection()
    return data.data.chapterConnection.edges.map(edge => (
      {
        slug: edge.node._sys.relativePath
    }))
  }

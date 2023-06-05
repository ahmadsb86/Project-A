import { getAllPostIds, getPostData } from '../../customStuff/problems.js'
import Head from 'next/head'
import utilStyles from '../../styles/problemPage.module.css';

export default function Post({ postData }) {
    return (
      <div>
        <Head>
          <title>{postData.title}</title>
          </Head>
        <article>
          <h1 >{postData.title}</h1>
          <div >
            <h2>postData.date</h2>
          </div>
          <div id='contentWrapper' dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </div>
    )
  }

  export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
  }
  
  export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
  }
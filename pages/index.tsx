import Head from 'next/head'
import { connectToDatabase } from '../util/mongodb'
import { InferGetServerSidePropsType } from 'next'
import { title } from 'process';

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase()
  
  const data = await db.collection("posts").find({}).toArray();

  const allposts = JSON.parse(JSON.stringify(data));
  
  return {
    props: { posts: allposts },
  }
}

export default function Home({ posts }) {

  console.log(posts);

  return (
    <div>
      <Head>
        <title>Nextbnb</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"></link>
      </Head>

      <div className="md:container md:mx-auto">
        <p>All Posts</p>
        <ul>
          {posts.map(post => (
            <li key = {post._id}>{post.title} by {post.author_name} on {post.published_on}</li>
          ))
          }
        </ul>
      </div>

    </div>
  )
}

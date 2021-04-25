import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import { RichText } from 'prismic-dom';
import { Fragment } from 'react';
import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';

// import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.data.title} | spacetraveling</title>
      </Head>

      <Header />

      <div
        className={styles.bannerImage}
        style={{ backgroundImage: `url(${post.data.banner.url})` }}
      />

      <main className={styles.container}>
        <article>
          <h1>{post.data.title}</h1>

          <div className={styles.postDetail}>
            <div>
              <FiCalendar size="1.25rem" />
              <time>
                {format(new Date(post.first_publication_date), 'PP', {
                  locale: ptBR,
                })}
              </time>
            </div>
            <div>
              <FiUser size="1.25rem" />
              <span>{post.data.author}</span>
            </div>
            <div>
              <FiClock size="1.25rem" />
              <span>4 min</span>
            </div>
          </div>

          <div className={styles.postContent}>
            {post.data.content.map(content => (
              <Fragment key={content.heading}>
                <h2>{content.heading}</h2>
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(content.body),
                  }}
                />
              </Fragment>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query();

  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      banner: response.data.banner,
      author: response.data.author,
      content: response.data.content.map(postContent => ({
        heading: postContent.heading,
        body: postContent.body,
      })),
    },
  };
  return {
    props: {
      post,
    },
    revalidate: 60 * 60, // 1hour
  };
};

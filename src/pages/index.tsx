import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  console.log({ postsPagination });

  return (
    <main className={styles.homeContainer}>
      <div className={styles.posts}>
        <a>
          <strong>Developing SSG using Node</strong>
          <p>
            The complete title should Developing Static Site Generator using
            NodeJS.
          </p>
          <div>
            <div>
              <FiCalendar size="0.875rem" />
              <time>15 Mar 2021</time>
            </div>
            <div>
              <FiUser size="0.875rem" />
              <span>Elian Becali</span>
            </div>
          </div>
        </a>
      </div>
    </main>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const prismic = getPrismicClient();
//   const postsResponse = await prismic.query(
//     [Prismic.predicates.at('document.type', 'posts')],
//     {
//       fetch: ['posts.author', 'posts.title', 'posts.subtitle', 'posts.slug'],
//       pageSize: 2,
//     }
//   );

//   const postsPagination = {
//     next_page: postsResponse.next_page,
//     results: postsResponse.results,
//   };

//   console.log({ postsPagination });

//   return {
//     props: {
//       postsPagination,
//     },
//   };
// };

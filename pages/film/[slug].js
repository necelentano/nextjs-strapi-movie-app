import Layout from "../../components/Layout";
import { fetcher } from "../../lib/api";

const Film = ({ film }) => {
  console.log({ film });
  return (
    <Layout>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
          {film?.attributes.title}
        </span>
      </h1>
    </Layout>
  );
};

export default Film;

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;

  console.log({ slug });

  const filmResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/film/${slug}`
  );
  console.log({ filmResponse });

  return {
    props: { film: filmResponse.data },
  };
};

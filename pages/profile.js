import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { fetcher } from "../lib/api";
import { getIdFromLocalCookie, getTokenFromServerCookie } from "../lib/auth";
import { useFetchUser } from "../lib/authContext";

const Profile = ({ avatar }) => {
  const { user } = useFetchUser();
  const router = useRouter();

  const [image, setImage] = useState(null);

  const uploadToClient = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const uploadToServer = async () => {
    const formData = new FormData();
    formData.append("inputFile", image);
    formData.append("user_id", await getIdFromLocalCookie());

    try {
      const responseData = await fetcher("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (responseData.message === "success") {
        router.reload("/profile");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout>
      <h1 className="text-5xl font-bold">
        Welcome back{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          {user}
        </span>
        <span>👋</span>
      </h1>
      {avatar === "default_avatar" && (
        <div>
          <h4>Select an image to upload</h4>
          <input type="file" onChange={uploadToClient} />
          <button
            className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
            type="submit"
            onClick={uploadToServer}
          >
            Set Profile Image
          </button>
        </div>
      )}
      {/* eslint-disable @next/next/no-img-element */}
      {avatar && (
        <img
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_150,h_150,g_face,c_thumb,r_max/${avatar}`}
          alt="Profile"
        />
      )}
    </Layout>
  );
};

export default Profile;

export const getServerSideProps = async ({ req }) => {
  const jwt = getTokenFromServerCookie(req);

  if (!jwt) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const responseData = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const avatar = responseData.avatar ? responseData.avatar : "default_avatar";

  return {
    props: {
      avatar,
    },
  };
};

import Link from "next/link";
import useSwr from "swr";
import { useRouter } from "next/router";
import styles from "@/components/styles/userprofile.module.css";
import "dotenv/config";
import msgStyles from "@/styles/message.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function UserProfile({ children, photos, likes, collections }) {
  const router = useRouter();
  const { username } = router.query;
  const apiKey = process.env.API_KEY;
  const url = `https://api.unsplash.com/users/${username}/?client_id=${apiKey}&per_page=12&page=1`;

  const { data, error, isLoading } = useSwr(url, fetcher);

  if (error) {
    return (
      <Layout>
        <div className={msgStyles.container}>
          <div className={msgStyles.message}>
            <h1>載入失敗</h1>
          </div>
        </div>
      </Layout>
    );
  }
  if (isLoading)
    return (
      <i className={`fa-solid fa-spinner` + " " + `${styles.loading}`}></i>
    );
  if (!data) return null;

  return (
    <div>
      <div className={styles.authorInfo}>
        <img src={data.profile_image.large}></img>
        <div>
          <h2>{data.name}</h2>
          <p>{data.bio}</p>
        </div>
      </div>

      {photos && (
        <div className={styles.nav}>
          <Link
            href={`/users/${username}/`}
            className={styles.tab + " " + styles.focus}
            style={{ color: "black" }}
          >
            上傳圖片 {data.total_photos}
          </Link>
          <Link href={`/users/${username}/likes`} className={styles.tab}>
            喜歡 {data.total_likes}
          </Link>
        </div>
      )}

      {likes && (
        <div className={styles.nav}>
          <Link href={`/users/${username}/`} className={styles.tab}>
            上傳圖片 {data.total_photos}
          </Link>
          <Link
            href={`/users/${username}/likes`}
            className={styles.tab + " " + styles.focus}
            style={{ color: "black" }}
          >
            喜歡 {data.total_likes}
          </Link>
        </div>
      )}

      <br />

      {children}
    </div>
  );
}

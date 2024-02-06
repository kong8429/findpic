import Layout from "@/components/layout";
import Date from "@/components/date";
import styles from "../../styles/picPage.module.css";
import Link from "next/link";
import "dotenv/config";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const apiKey = process.env.API_KEY;
  const url = `https://api.unsplash.com/photos/?client_id=${apiKey}&per_page=12&page=1`;

  const response = await fetch(url);
  const data = await response.json();

  const paths = data.map((pic) => {
    return {
      params: { id: pic.id },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const apiKey = process.env.API_KEY;
  const url = `https://api.unsplash.com/photos/${params.id}/?client_id=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}

export default function picData({ data }) {
  const router = useRouter();

  const optionShowUp = () => {
    const options = document.querySelector(`.${styles.options}`);
    console.log(options);
    options.classList.toggle(`${styles.showUp}`);
  };

  return (
    <Layout headerWh>
      <div>
        <div className={styles.picContainer}>
          <img src={data.urls.regular} alt={data.alt_description} />
        </div>

        <div className={styles.picDescription}>
          <div className={styles.numbers}>
            {data.views && (
              <p>
                觀看數：
                <br />
                {data.views}
              </p>
            )}
            {/* {data.downloads && ( */}
            <p>
              下載數：
              <br />
              {data.downloads}
            </p>
            {/* )} */}
          </div>
          <div>
            <button className={styles.download}>下載圖片</button>
            <button className={styles.chooseSize} onClick={optionShowUp}>
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            <div className={styles.options}>
              <Link
                href={data.urls.full}
                target="_blank"
                className={styles.full}
              >
                Full
              </Link>
              <Link
                href={data.urls.regular}
                target="_blank"
                className={styles.regular}
              >
                Regular
              </Link>
              <Link
                href={data.urls.small}
                target="_blank"
                className={styles.small}
              >
                Small
              </Link>
            </div>
          </div>
        </div>

        {data.description && (
          <p className={styles.description}>圖片描述：{data.description}</p>
        )}
        <div className={styles.author}>
          作者：
          <Link className={styles.user} href={`../users/${data.user.username}`}>
            <img src={data.user.profile_image.medium} />
            <div>
              {data.user.name && (
                <p
                  className={styles.uName}
                  href={`../users/${data.user.username}`}
                >
                  {data.user.name}
                </p>
              )}

              {data.user.username && (
                <p
                  className={styles.uAcc}
                  href={`../users/${data.user.username}/photos`}
                >
                  {data.user.username}
                </p>
              )}
            </div>
          </Link>
        </div>
        {/* <p>建立時間：{dateConvert(data.created_at)}</p> */}
        <p className={styles.createTime}>
          建立時間：
          <Date dateString={data.created_at} />
        </p>
        <div className={styles.picTag}>
          {data.tags.map((picTags, index) => {
            return (
              <button
                className={styles.tags}
                key={index}
                value={picTags.title}
                onClick={() => {
                  router.push(`../search/pic/${picTags.title}`);
                }}
              >
                {picTags.title}
              </button>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

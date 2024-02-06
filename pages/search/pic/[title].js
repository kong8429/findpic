import Link from "next/link";
import Layout from "@/components/layout";
import picStyles from "@/styles/picStyles.module.css";
import masonry from "@/styles/masonry.module.css";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWRInfinite from "swr/infinite";
import { useRouter } from "next/router";
import msgStyles from "@/styles/message.module.css";

export default function Search() {
  const router = useRouter();
  const { title } = router.query;
  const PageSize = 12;
  const getKey = (pageIndex, previousPageData) => {
    const apiKey = process.env.API_KEY;
    pageIndex = pageIndex + 1;
    if (previousPageData && !previousPageData.length) return null; //reached the end
    return `https://api.unsplash.com/search/photos?query=${title}&client_id=${apiKey}&per_page=${PageSize}&page=${pageIndex}`;
  };

  const fetcher = async (url) => {
    console.log("fetching", url);
    const allData = await fetch(url).then(async (res) => {
      const dj = await res.json();
      const { results } = dj;
      return results;
    });
    console.log(allData);
    return allData;
  };
  const { data, error, size, setSize, mutate } = useSWRInfinite(
    getKey,
    fetcher
  );
  const imgArr = data?.flat();
  const isReachEnd = data && imgArr[imgArr.length - 1]?.length < PageSize; // got last batch of data
  const loadingMore = data && typeof imgArr[size - 1] === "undefined";

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

  if (!imgArr) return null;

  return (
    <Layout headerWh>
      <div className={picStyles.container}>
        <InfiniteScroll
          next={() => setSize(size + 1)}
          hasMore={!isReachEnd}
          loader={
            <i
              className={`fa-solid fa-spinner` + " " + `${picStyles.loading}`}
            ></i>
          }
          endMessage={<p className={picStyles.message}>已經到底了</p>}
          dataLength={imgArr?.length}
        >
          <Masonry
            breakpointCols={3}
            className={masonry.myMasonryGrid}
            columnClassName={masonry.myMasonryGridColumn}
          >
            {imgArr &&
              imgArr.map((pic) => {
                return (
                  <div key={pic.id} className={picStyles.pic}>
                    <img src={pic.urls.small} alt={pic.alt_description} />

                    <div className={picStyles.mask}>
                      <Link
                        href={`../../pic/${pic.id}`}
                        className={picStyles.picLink}
                      ></Link>
                      <div className={picStyles.author}>
                        <Link
                          href={`../../users/${pic.user.username}`}
                          className={picStyles.usernameLink}
                        >
                          <img src={pic.user.profile_image.small} />
                          <span>{pic.user.name}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </Masonry>
        </InfiniteScroll>
      </div>

      {loadingMore && <i className="fa-solid fa-spinner"></i>}
    </Layout>
  );
}

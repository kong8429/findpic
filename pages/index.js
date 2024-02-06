import Link from "next/link";
import Layout from "@/components/layout";
import picStyles from "@/styles/picStyles.module.css";
import masonry from "../styles/masonry.module.css";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePagination } from "@/components/infiniteScroll";
import msgStyles from "@/styles/message.module.css";

export default function Home() {
  const { imgArr, isReachEnd, loadingMore, error, size, setSize } =
    usePagination(`https://api.unsplash.com/photos/?`);

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
            {!imgArr && <h1>載入中</h1>}
            {imgArr &&
              imgArr.map((pic) => {
                return (
                  <div key={pic.id} className={picStyles.pic}>
                    <img src={pic.urls.small} alt={pic.alt_description} />

                    <div className={picStyles.mask}>
                      <Link
                        href={`./pic/${pic.id}`}
                        className={picStyles.picLink}
                      ></Link>
                      <div className={picStyles.author}>
                        <Link
                          href={`./users/${pic.user.username}`}
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
    </Layout>
  );
}

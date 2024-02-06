import Layout from "@/components/layout";
import { useRouter } from "next/router";
import UserProfile from "@/components/userprofile";
import picStyles from "@/styles/picStyles.module.css";
import masonry from "@/styles/masonry.module.css";
import Masonry from "react-masonry-css";
import Link from "next/link";
import { usePagination } from "@/components/infiniteScroll";
import InfiniteScroll from "react-infinite-scroll-component";
import msgStyles from "@/styles/message.module.css";

export default function userPhoto() {
  const router = useRouter();
  const { username } = router.query;

  const { imgArr, isReachEnd, loadingMore, error, size, setSize } =
    usePagination(`https://api.unsplash.com/users/${username}/photos/?`);

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

  console.log(imgArr);

  return (
    <Layout headerWh>
      <UserProfile photos>
        <div className={picStyles.container}>
          <InfiniteScroll
            next={() => setSize(size + 1)}
            hasMore={!isReachEnd}
            loader={
              <i
                className={`fa-solid fa-spinner` + " " + `${picStyles.loading}`}
              ></i>
            }
            endMessage={
              (imgArr.length !== 0 && (
                <p className={picStyles.message}>已經到底了</p>
              )) ||
              (imgArr == 0 && (
                <p className={picStyles.message}>這位作者目前沒有上傳圖片</p>
              ))
            }
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
                          href={`../pic/${pic.id}`}
                          className={picStyles.picLink}
                        ></Link>
                        <div className={picStyles.author}>
                          <Link
                            href={`./${pic.user.username}`}
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
      </UserProfile>
    </Layout>
  );
}

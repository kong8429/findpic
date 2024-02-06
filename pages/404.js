import Layout from "@/components/layout";
import styles from "@/styles/message.module.css";

export default function custom404() {
  return (
    <Layout headerWh>
      <div className={styles.container}>
        <div className={styles.message}>
          <h1>找不到(404)</h1>
          <p>抱歉，你要找的頁面不存在</p>
        </div>
      </div>
    </Layout>
  );
}

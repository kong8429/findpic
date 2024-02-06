import Layout from "@/components/layout";
import styles from "@/styles/message.module.css";

export default function custom500() {
  return (
    <Layout headerWh>
      <div className={styles.container}>
        <div className={styles.message}>
          <h1>發生錯誤(500)</h1>
          <p>抱歉，伺服器端發生錯誤</p>
        </div>
      </div>
    </Layout>
  );
}

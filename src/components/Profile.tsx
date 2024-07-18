import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOtter, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import styles from "./Profile.module.css";

interface DataItem {
  name: string;
  role: string;
  university: string;
}

export default function Profile() {
  const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("api/sheet");
        const result = await res.json();
        setIsLoading(false);
        console.log("Fetched data:", result); // データ確認
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div className={styles.loading}>
      <FontAwesomeIcon icon={faOtter} className="h-[60px]" color="black" />
      <p>&lt; Please wait...</p>
    </div>
  ) : (
    <div className={styles["profile-container"]}>
      {data.length > 0 &&
        data.map((item: DataItem, index: number) => (
          <div key={index} className="profile_box">
            <img src="" alt="" />
            <div className="profile_texts">
              <h1>{item.name}</h1>
              <div className="flex-wrapper">
                <h2>HPチーム</h2>
                <h1>/</h1>
                <h2>メンバー</h2>
              </div>
              <h3>{item.university}</h3>
              <button className="detail-btn">詳細</button>
            </div>
          </div>
        ))}
    </div>
  );
}

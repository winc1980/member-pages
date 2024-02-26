import Header from "@/components/Header";
import {
  createYearlyRanking,
  createMonthlyRanking,
  createRanking,
} from "../githubApi";

export default async function Page() {
  const currentDate = new Date(); // 現在の日付を取得
  // 先月の日付を取得するために、現在の月から1を引きます
  const previousMonth = currentDate.getMonth() - 1;
  // ただし、前月が1月より前の場合、前年の12月になります
  const previousYear =
    previousMonth < 0
      ? currentDate.getFullYear() - 1
      : currentDate.getFullYear();
  return (
    <>
      <div className="container">
        <h1 className="container__title py-5">Githubコミット数ランキング</h1>
        <div className="container__item">
          <div className="container__item--left--line">
            <p className="container__item--left">個人</p>
          </div>
          <div className="container__item--right--line">
            <p className="container__item--right">チーム</p>
          </div>
        </div>
        <div className="container__area--month">
          <p>月間</p>
          <span>先月のランキング</span>
        </div>
        <div className="container__item--middle">
          <p>順位</p>
          <p>ユーザー</p>
          <p>コミット数</p>
        </div>
        <ul className="container__unit">
          {(await createMonthlyRanking()).map((user, index) => {
            if (index === 0) {
              // 1番目のユーザーを指定
              return (
                <li className="container__list" key={index}>
                  <p>1</p>
                  <img
                    className="container__list--img"
                    src="/images/winc_logo.webp"
                    alt=""
                  />
                  <p>{user.author}</p>
                  <p>{user.monthlyCommits}</p>
                </li>
              );
            } else if (index === 1) {
              // 2番目のユーザーを指定
              return (
                <li className="container__list" key={index}>
                  <p>2</p>
                  <img
                    className="container__list--img"
                    src="/images/winc_logo.webp"
                    alt=""
                  />
                  <p>{user.author}</p>
                  <p>{user.monthlyCommits}</p>
                </li>
              );
            } else if (index === 2) {
              // 3番目のユーザーを指定
              return (
                <li className="container__list" key={index}>
                  <p>3</p>
                  <img
                    className="container__list--img"
                    src="/images/winc_logo.webp"
                    alt=""
                  />
                  <p>{user.author}</p>
                  <p>{user.monthlyCommits}</p>
                </li>
              );
            } else if (index > 2) {
              // 4番目以上のユーザーを指定
              return (
                <li className="container__list" key={index}>
                  <p>{index + 1}</p>
                  <img
                    className="container__list--img"
                    src="/images/winc_logo.webp"
                    alt=""
                  />
                  <p>{user.author}</p>
                  <p>{user.monthlyCommits}</p>
                </li>
              );
            } else {
              return null; // 他のユーザーに関する情報は表示しない
            }
          })}
        </ul>
        <div className="container__area--month">
          <p>年間</p>
        </div>
        <div className="container__item--middle">
          <p>順位</p>
          <p>ユーザー名</p>
          <p>コミット数</p>
        </div>
        <ul className="container__unit">
          {(await createYearlyRanking()).map((user, index) => {
            if (index === 0) {
              // 1番目のユーザーを指定
              return (
                <li className="container__list" key={index}>
                  <p>1</p>
                  <img
                    className="container__list--img"
                    src="/images/winc_logo.webp"
                    alt=""
                  />
                  <p>{user.author}</p>
                  <p>{user.yearlyCommits}</p>
                </li>
              );
            } else if (index === 1) {
              // 2番目のユーザーを指定
              return (
                <li className="container__list" key={index}>
                  <p>2</p>
                  <img
                    className="container__list--img"
                    src="/images/winc_logo.webp"
                    alt=""
                  />
                  <p>{user.author}</p>
                  <p>{user.yearlyCommits}</p>
                </li>
              );
            } else if (index === 2) {
              // 3番目のユーザーを指定
              return (
                <li className="container__list" key={index}>
                  <p>3</p>
                  <img
                    className="container__list--img"
                    src="/images/winc_logo.webp"
                    alt=""
                  />
                  <p>{user.author}</p>
                  <p>{user.yearlyCommits}</p>
                </li>
              );
            } else if (index > 2) {
              // 4番目以上のユーザーを指定
              return (
                <li className="container__list" key={index}>
                  <p>{index + 1}</p>
                  <img
                    className="container__list--img"
                    src="/images/winc_logo.webp"
                    alt=""
                  />
                  <p>{user.author}</p>
                  <p>{user.yearlyCommits}</p>
                </li>
              );
            } else {
              return null; // 他のユーザーに関する情報は表示しない
            }
          })}
        </ul>
        <div className="container__area--month">
          <p>総合</p>
        </div>
        <div className="container__item--middle">
          <p>順位</p>
          <p>ユーザー名</p>
          <p>コミット数</p>
        </div>
        <ul className="container__unit">
          {(await createRanking()).map((user, index) => {
            if (index === 0) {
              // 1番目のユーザーを指定
              return (
                <li className="container__list" key={index}>
                  <p>1</p>
                  <img
                    className="container__list--img"
                    src="/images/winc_logo.webp"
                    alt=""
                  />
                  <p>{user.author}</p>
                  <p>{user.commits}</p>
                </li>
              );
            } else if (index === 1) {
              // 2番目のユーザーを指定
              return (
                <li className="container__list" key={index}>
                  <p>2</p>
                  <img
                    className="container__list--img"
                    src="/images/winc_logo.webp"
                    alt=""
                  />
                  <p>{user.author}</p>
                  <p>{user.commits}</p>
                </li>
              );
            } else if (index === 2) {
              // 3番目のユーザーを指定
              return (
                <li className="container__list" key={index}>
                  <p>3</p>
                  <img
                    className="container__list--img"
                    src="/images/winc_logo.webp"
                    alt=""
                  />
                  <p>{user.author}</p>
                  <p>{user.commits}</p>
                </li>
              );
            } else if (index > 2) {
              // 4番目以上のユーザーを指定
              return (
                <li className="container__list" key={index}>
                  <p>{index + 1}</p>
                  <img
                    className="container__list--img"
                    src="/images/winc_logo.webp"
                    alt=""
                  />
                  <p>{user.author}</p>
                  <p>{user.commits}</p>
                </li>
              );
            } else {
              return null; // 他のユーザーに関する情報は表示しない
            }
          })}
        </ul>
      </div>
    </>
  );
}

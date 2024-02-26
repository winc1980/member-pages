import {
  createYearlyRanking,
  createMonthlyRanking,
  createRanking,
} from "../githubApi";

export default async function Page() {
  return (
    <div className="container">
      <p className="container__title">Githubコミット数ランキング</p>
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
      </div>
      <div className="container__item--middle">
        <p>順位</p>
        <p>名前</p>
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
    </div>
  );
}

import {
  createYearlyRanking,
  createMonthlyRanking,
  createRanking,
} from "../githubApi";

export default async function Page() {
  return (
    <div>
      <h1>年間コミット数ランキング</h1>
      <div>
        {(await createYearlyRanking()).map((user, index) => {
          if (index === 0) {
            // 3番目のユーザー (インデックス2) を指定
            return (
              <div key={index}>
                {user.author}: {user.yearlyCommits}
              </div>
            );
          } else if (index === 1) {
            return (
              <div key={index}>
                {user.author}: {user.yearlyCommits}
              </div>
            );
          } else if (index === 2) {
            return (
              <div key={index}>
                {user.author}: {user.yearlyCommits}
              </div>
            );
          } else {
            return (
              <div key={index}>
                {user.author}: {user.yearlyCommits}
              </div>
            );
          }
        })}
      </div>
      <h1>月間コミット数ランキング</h1>
      <div>
        {(await createMonthlyRanking()).map((user, index) => (
          <div key={index}>
            {user.author}: {user.monthlyCommits}
          </div>
        ))}
      </div>
      <h1>コミット数ランキング</h1>
      <div>
        {(await createRanking()).map((user, index) => (
          <div key={index}>
            {user.author}: {user.commits}
          </div>
        ))}
      </div>
    </div>
  );
}

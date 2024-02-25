import { createRanking } from './githubApi';

export default async function Page() {
  return (
    <div>
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
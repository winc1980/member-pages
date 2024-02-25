
const organization = 'winc1980';
const githubToken = process.env.React_APP_OPENWEATHERMAP_API_KEY; 

async function getRepoList(organization, githubToken) {
  const apiUrl = `https://api.github.com/orgs/${organization}/repos`;
  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': `token ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API returned status ${response.status}`);
  }

  return await response.json();
}

// 月の初めと月の終わりを取得するヘルパー関数
function getMonthStartAndEnd() {
  const now = new Date();
  const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const startOfPreviousMonth = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1);
  const endOfPreviousMonth = new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0, 23, 59, 59, 999);
  return { startOfPreviousMonth, endOfPreviousMonth };
}


// 年間
function getYearStartAndEnd() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1); // 1月1日
  const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999); // 12月31日
  return { startOfYear, endOfYear };
}


async function getCommitCounts(repo, organization, githubToken) {
  let commitCounts = {};
  let page = 1;
  const perPage = 100;

  while (true) {
    const apiUrl = `https://api.github.com/repos/${organization}/${repo.name}/commits?page=${page}&per_page=${perPage}`;
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const commits = await response.json();
    if (commits.length === 0) break;

    commits.forEach(commit => {
      const author = commit.author ? commit.author.login : 'Unknown';
      if (!commitCounts[author]) {
        commitCounts[author] = 0;
      }
      commitCounts[author]++;
    });

    if (commits.length < perPage) break;
    page++;
  }

  return commitCounts;
}

export async function createRanking(){
  const repos = await getRepoList(organization, githubToken);
    let allCommitCounts = {};

    for (const repo of repos) {
      const commitCounts = await getCommitCounts(repo, organization, githubToken);
      Object.keys(commitCounts).forEach(author => {
        if (!allCommitCounts[author]) {
          allCommitCounts[author] = 0;
        }
        allCommitCounts[author] += commitCounts[author];
      });
    }

    // ランキングを作成
    const rankedUsers = Object.keys(allCommitCounts).map(author => ({
      author,
      commits: allCommitCounts[author]
    }));

    // コミット数でソート
    rankedUsers.sort((a, b) => b.commits - a.commits);

    // 結果を表示
    console.log('コミット数ランキング:');
    rankedUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.author}: ${user.commits}`);
    });
    return rankedUsers; 
}


async function getMonthlyCommitCounts(repo, organization, githubToken, startOfPreviousMonth, endOfPreviousMonth) {
  let commitCounts = {};
  let page = 1;
  const perPage = 100;

  while (true) {
    const apiUrl = `https://api.github.com/repos/${organization}/${repo.name}/commits?page=${page}&per_page=${perPage}`;
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const commits = await response.json();
    if (commits.length === 0) break;

    commits.forEach(commit => {
      const commitDate = new Date(commit.commit.author.date);
      if (commitDate >= startOfPreviousMonth && commitDate <= endOfPreviousMonth) {
        const author = commit.author ? commit.author.login : 'Unknown';
        if (!commitCounts[author]) {
          commitCounts[author] = 0;
        }
        commitCounts[author]++;
      }
    });

    if (commits.length < perPage) break;
    page++;
  }

  return commitCounts;
}

export async function createMonthlyRanking() {
  const { startOfPreviousMonth, endOfPreviousMonth } = getMonthStartAndEnd();
  const repos = await getRepoList(organization, githubToken);
  let allCommitCounts = {};

  for (const repo of repos) {
    const commitCounts = await getMonthlyCommitCounts(repo, organization, githubToken, startOfPreviousMonth, endOfPreviousMonth);
    Object.keys(commitCounts).forEach(author => {
      if (!allCommitCounts[author]) {
        allCommitCounts[author] = 0;
      }
      allCommitCounts[author] += commitCounts[author];
    });
  }

  // ランキングを作成
  const rankedUsers = Object.keys(allCommitCounts).map(author => ({
    author,
    monthlyCommits: allCommitCounts[author] // ここを変更しました
  }));

  // コミット数でソート
  rankedUsers.sort((a, b) => b.monthlyCommits - a.monthlyCommits); // ここも変更しました

  // 結果を表示
  console.log('前月のコミット数ランキング:');
  rankedUsers.forEach((user, index) => {
    console.log(`${index + 1}. ${user.author}: ${user.monthlyCommits}`); // そしてここも変更しました
  });
  return rankedUsers;
}

createMonthlyRanking();


async function getYearCommitCounts(repo, organization, githubToken, startOfYear, endOfYear) {
  let commitCounts = {};
  let page = 1;
  const perPage = 100;

  while (true) {
    const apiUrl = `https://api.github.com/repos/${organization}/${repo.name}/commits?page=${page}&per_page=${perPage}`;
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const commits = await response.json();
    if (commits.length === 0) break;

    commits.forEach(commit => {
      const commitDate = new Date(commit.commit.author.date);
      if (commitDate >= startOfYear && commitDate <= endOfYear) {
        const author = commit.author ? commit.author.login : 'Unknown';
        if (!commitCounts[author]) {
          commitCounts[author] = 0;
        }
        commitCounts[author]++;
      }
    });

    if (commits.length < perPage) break;
    page++;
  }

  return commitCounts;
}

export async function createYearlyRanking() {
  const { startOfYear, endOfYear } = getYearStartAndEnd();
  const repos = await getRepoList(organization, githubToken);
  let allCommitCounts = {};

  for (const repo of repos) {
    const commitCounts = await getYearCommitCounts(repo, organization, githubToken, startOfYear, endOfYear);
    Object.keys(commitCounts).forEach(author => {
      if (!allCommitCounts[author]) {
        allCommitCounts[author] = 0;
      }
      allCommitCounts[author] += commitCounts[author];
    });
  }

  // ランキングを作成
  const rankedUsers = Object.keys(allCommitCounts).map(author => ({
    author,
    yearlyCommits: allCommitCounts[author] // ここを変更しました
  }));

  // コミット数でソート
  rankedUsers.sort((a, b) => b.yearlyCommits - a.yearlyCommits); // ここも変更しました

  // 結果を表示
  console.log('今年のコミット数ランキング:');
  rankedUsers.forEach((user, index) => {
    console.log(`${index + 1}. ${user.author}: ${user.yearlyCommits}`); // そしてここも変更しました
  });
  return rankedUsers;
}

// この関数を実行するためには、getYearStartAndEndとgetYearCommitCountsの実装が必要です。
createYearlyRanking();


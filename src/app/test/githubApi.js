// // GitHubのユーザー名またはオーガニゼーション名
// const organization = 'winc1980';
// const githubToken = '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'; // セキュリティのためにトークンは公開しないようにしましょう

// // 特定のリポジトリのすべてのコミットを取得する関数
// export async function getAllCommits(organization, repoName, page = 1, perPage = 100) {
//   const apiUrl = `https://api.github.com/repos/${organization}/${repoName}/commits?page=${page}&per_page=${perPage}`;

//   try {
//     const response = await fetch(apiUrl, {
//       headers: {
//         'Authorization': `token ${githubToken}`,
//         'Accept': 'application/vnd.github.v3+json'
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`GitHub API returned status ${response.status}`);
//     }

//     // コミット情報のJSONを解析
//     const commits = await response.json();

//     if (commits.length > 0) {
//       // コミット情報を表示
//       commits.forEach(commit => {
//         console.log('Commit sha: ', commit.sha);
//         console.log('Author: ', commit.commit.author.name);
//         console.log('Date: ', commit.commit.author.date);
//         console.log('Message: ', commit.commit.message);
//         console.log('-------------------------');
//       });

//       // 再帰的に次のページをリクエスト
//       await getAllCommits(organization, repoName, page + 1, perPage);
//     }
//   } catch (error) {
//     console.error(`以下のレポジトリのコミットを取得できませんでした ${repoName}:`, error);
//   }
// }

// // レポジトリ一覧を取得し、各リポジトリのすべてのコミットを取得する関数
// export async function getRepositoriesAndCommits(organization) {
//   const apiUrl = `https://api.github.com/users/${organization}/repos`;

//   try {
//     const response = await fetch(apiUrl, {
//       headers: {
//         'Authorization': `token ${githubToken}`,
//         'Accept': 'application/vnd.github.v3+json'
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`GitHub API returned status ${response.status}`);
//     }

//     // レポジトリ情報のJSONを解析
//     const repositories = await response.json();

//     // 各レポジトリのコミット情報を取得
//     for (const repo of repositories) {
//       console.log(`Getting commits for ${repo.name}`);
//       await getAllCommits(organization, repo.name);
//     }
//   } catch (error) {
//     console.error('Failed to load repositories:', error);
//   }
// }

// // レポジトリ一覧とそのコミットの取得を開始
// getRepositoriesAndCommits(organization);


const organization = 'winc1980';
const githubToken = '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'; // セキュリティのためにトークンは公開しないようにしましょう

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

createRanking();
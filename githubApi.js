// GitHubのユーザー名またはオーガニゼーション名
const organization = 'winc1980';
const githubToken = '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'; // セキュリティのためにトークンは公開しないようにしましょう

// 特定のリポジトリのすべてのコミットを取得する関数
export async function getAllCommits(organization, repoName, page = 1, perPage = 100) {
  const apiUrl = `https://api.github.com/repos/${organization}/${repoName}/commits?page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    // コミット情報のJSONを解析
    const commits = await response.json();

    if (commits.length > 0) {
      // コミット情報を表示
      commits.forEach(commit => {
        console.log('Commit sha: ', commit.sha);
        console.log('Author: ', commit.commit.author.name);
        console.log('Date: ', commit.commit.author.date);
        console.log('Message: ', commit.commit.message);
        console.log('-------------------------');
      });

      // 再帰的に次のページをリクエスト
      await getAllCommits(organization, repoName, page + 1, perPage);
    }
  } catch (error) {
    console.error(`以下のレポジトリのコミットを取得できませんでした ${repoName}:`, error);
  }
}

// レポジトリ一覧を取得し、各リポジトリのすべてのコミットを取得する関数
export async function getRepositoriesAndCommits(organization) {
  const apiUrl = `https://api.github.com/users/${organization}/repos`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    // レポジトリ情報のJSONを解析
    const repositories = await response.json();

    // 各レポジトリのコミット情報を取得
    for (const repo of repositories) {
      console.log(`Getting commits for ${repo.name}`);
      await getAllCommits(organization, repo.name);
    }
  } catch (error) {
    console.error('Failed to load repositories:', error);
  }
}

// レポジトリ一覧とそのコミットの取得を開始
getRepositoriesAndCommits(organization);

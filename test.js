// 给你一个二维数组 edges 表示一个 n 个点的无向图，其中 edges[i] = [ui, vi, lengthi] 表示节点 ui 和节点 vi 之间有一条需要 lengthi 单位时间通过的无向边。

// 同时给你一个数组 disappear ，其中 disappear[i] 表示节点 i 从图中消失的时间点，在那一刻及以后，你无法再访问这个节点。

// 注意，图有可能一开始是不连通的，两个节点之间也可能有多条边。

// 请你返回数组 answer ，answer[i] 表示从节点 0 到节点 i 需要的 最少 单位时间。如果从节点 0 出发 无法 到达节点 i ，那么 answer[i] 为 -1 。

// 示例 1：

// 输入：n = 3, edges = [[0,1,2],[1,2,1],[0,2,4]], disappear = [1,1,5]

// 输出：[0,-1,4]

// 解释：

// 我们从节点 0 出发，目的是用最少的时间在其他节点消失之前到达它们。

// 对于节点 0 ，我们不需要任何时间，因为它就是我们的起点。
// 对于节点 1 ，我们需要至少 2 单位时间，通过 edges[0] 到达。但当我们到达的时候，它已经消失了，所以我们无法到达它。
// 对于节点 2 ，我们需要至少 4 单位时间，通过 edges[2] 到达。
// 示例 2：

// 输入：n = 3, edges = [[0,1,2],[1,2,1],[0,2,4]], disappear = [1,3,5]

// 输出：[0,2,3]

// 解释：

// 我们从节点 0 出发，目的是用最少的时间在其他节点消失之前到达它们。

// 对于节点 0 ，我们不需要任何时间，因为它就是我们的起点。
// 对于节点 1 ，我们需要至少 2 单位时间，通过 edges[0] 到达。
// 对于节点 2 ，我们需要至少 3 单位时间，通过 edges[0] 和 edges[1] 到达。
// 示例 3：

// 输入：n = 2, edges = [[0,1,1]], disappear = [1,1]

// 输出：[0,-1]

// 解释：

// 当我们到达节点 1 的时候，它恰好消失，所以我们无法到达节点 1 。

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} disappear
 * @return {number[]}
 */
var minimumTime = function (n, edges, disappear) {
  const dis = new Array(n).fill(Infinity); // 初始化距离
  const map = new Map(); // 邻接表
  for (let i = 0; i < n; i++) {
    map.set(i, []);
  } // 构建邻接表
  for (let edge of edges) {
    const [u, v, w] = edge; // u,v,w分别表示起点，终点，时间
    map.get(u).push([v, w]); // 无向图，双向都要加
    map.get(v).push([u, w]); // 无向图，双向都要加
  }
  const q = []; // 优先队列
  q.push([0, 0]);
  dis[0] = 0; // 起点
  while (q.length) {
    q.sort((a, b) => a[1] - b[1]); // 按照时间排序
    const [u, d] = q.shift(); // 取出最小时间
    if (disappear[u] <= d) continue; // 如果当前节点已经消失，跳过
    for (let [v, w] of map.get(u)) {
      // 遍历邻接表
      if (disappear[v] <= d + w) continue; // 如果下一个节点消失，跳过
      if (dis[v] > d + w) {
        // 更新最小时间
        dis[v] = d + w; // 更新最小时间
        q.push([v, d + w]); // 入队
      }
    }
  }
  const res = [];
  for (let i = 0; i < n; i++) {
    res.push(dis[i] === Infinity ? -1 : dis[i]); // 无法到达的节点返回-1
  }
  return res;
};

console.log(
  minimumTime(
    3,
    [
      [0, 1, 2],
      [1, 2, 1],
      [0, 2, 4],
    ],
    [1, 1, 5]
  )
); //[0,-1,4]

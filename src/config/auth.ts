// 需要登录才能访问的路由列表
export const AUTH_ROUTES = [
  '/profile',
  '/article/new',
  // '/article/edit/[id]',  // 匹配动态文章编辑路由
  '/article/edit',  // 匹配动态文章编辑路由
] as const;

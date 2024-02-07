export const RouteId = {
  root: '/',
  discovery: '/discovery',
  shop: (id: string) => `/shop?id=${id}`,
  product: (title: string) => `/product?title=${title}`,
  channel: (id: string) => `/channel?id=${id}`,
};

export default 
`
import { request } from 'umi';

const api = {
  getMainList: (params: any): Promise<any> =>
    request('/api/inquiryOrder/hall', {
      method: 'GET',
      params,
    }),
};

export default api;
`;
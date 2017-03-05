import axios from 'axios';

const service = {
  getInitData: () => axios.get('/leagues')
};

export default service;

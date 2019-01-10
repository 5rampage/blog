import IP = require('ip');

export const contextPath = '/official';

export const xhrPrefix = `/xhr`;
// server监听端口
export const port = '9200';
// 应用机ip
export const serverIP = IP.address();
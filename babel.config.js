//import를 사용하기 위해서 사용하고, ts를 js로 컴파일 해서 사용
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
};
/**
* 功能: 复制一个json对象
* params {Object, Array} json 要复制的json对象
*/
export default function cloneJson (json) {
  return json !== null && typeof json === 'object' ? JSON.parse(JSON.stringify(json)) : {}
}

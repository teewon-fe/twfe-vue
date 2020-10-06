/*
 * 功能:
 * 1、定义前端常量，避免前端代码中出现难以理解的数字判断逻辑
 * 2、避免数据库或后端接口中某个常量定义改变，导致前端整个系统相关的代码都要做相应改变的强耦合代码出现
 *
 * 要求与用法：
 * 1、所有接口中表常量概念的数字，符号，字母，前端都需要定义成相应的常量
 * 2、在vue组件中以this.$cnt.CONST_NAME的形式访问常量，在js代码直接引入该文件访问常量
 * http://192.168.102.233:83/#/doc/guid/const
 */
export * from '../../public/data/const'

// 示例
export const CONST_NAME1 = '1'
export const CONST_NAME2 = '2'

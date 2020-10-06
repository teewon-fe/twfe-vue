import * as cnt from './const'

// 题型 听力、单选、多选、判断、填空、连线、简答、综合
export const questionTypes = [{
  id: cnt.QUESTION_TYPE_SINGLE_CHOICE,
  name: '单选题'
},
{
  id: cnt.QUESTION_TYPE_MULTIPLE_CHOICE,
  name: '多选题'
},
{
  id: cnt.QUESTION_TYPE_JUDGEMENT,
  name: '判断题'
},
{
  id: cnt.QUESTION_TYPE_BLANK,
  name: '填空题'
},
{
  id: cnt.QUESTION_TYPE_SHORT_ANSWER,
  name: '简答题'
},
{
  id: cnt.QUESTION_TYPE_LISTENING,
  name: '听力题'
},
{
  id: cnt.QUESTION_TYPE_COMPREHENSIVE,
  name: '综合题'
},
{
  id: cnt.QUESTION_TYPE_LINE,
  name: '连线题'
},
{
  id: cnt.QUESTION_TYPE_FOLLOW_READ,
  name: '跟读题'
},
{
  id: cnt.QUESTION_TYPE_SELECT_BLANK,
  name: '选填题'
},
{
  id: cnt.QUESTION_TYPE_SORT,
  name: '排序题'
},
{
  id: cnt.QUESTION_TYPE_CLASSIFICATION,
  name: '归类题'
},
{
  id: cnt.QUESTION_TYPE_LEVEL_LABEL_UNCERTAIN_CHOICE,
  name: '不定项选择题'
}
]

// 题目难度
export const questionDegrees = [
  {
    id: cnt.QUESTION_DEGREE_EASIER,
    name: '容易',
    className: 'xeasy'
  },
  {
    id: cnt.QUESTION_DEGREE_EASY,
    name: '较易',
    className: 'xeasy'
  },
  {
    id: cnt.QUESTION_DEGREE_MEDIUM,
    name: '中等',
    className: 'xmiddle'
  },
  {
    id: cnt.QUESTION_DEGREE_HARD,
    name: '较难',
    className: 'xhard'
  },
  {
    id: cnt.QUESTION_DEGREE_HARDER,
    name: '困难',
    className: 'xhard'
  }
]

// 题目难度反向
export const questionDegreesReverse = Array.from(questionDegrees).reverse()

// 试题错误原因
export const questionWrongTypes = [
  {
    id: cnt.QUESTION_WRONG_TITLE,
    name: '题干错误'
  },
  {
    id: cnt.QUESTION_WRONG_ANSWER,
    name: '答案错误'
  },
  {
    id: cnt.QUESTION_WRONG_ANALYSIS,
    name: '解析错误'
  },
  {
    id: cnt.QUESTION_WRONG_KNOWLEDGE,
    name: '知识点标注错误'
  },
  {
    id: cnt.QUESTION_WRONG_SELFTYPE,
    name: '题型标注错误'
  },
  {
    id: cnt.QUESTION_WRONG_DEGREE,
    name: '难度差异大'
  },
  {
    id: cnt.QUESTION_WRONG_OTHER,
    name: '符号/公式/格式/图片等问题'
  }
]

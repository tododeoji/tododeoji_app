import { TodoItem } from '../types/todo';

interface TodosByDate {
  [key: string]: {
    todos: TodoItem[];
  };
}

export const TodoDataList: TodosByDate = {
  '2025-02-01': {
    todos: [
      { id: 1, state: 'done', category: '공부', title: '영어 공부', color: '#FFE5E5' },
      { id: 2, state: 'todo', category: '공부', title: '송별회', color: '#FF4747' },
      { id: 3, state: 'progress', category: '공부', title: '세탁기 돌리기', color: '#FF8026' },
      { id: 4, state: 'todo', category: '공부', title: '과제 제출', color: '#FFC119' },
      { id: 5, state: 'done', category: '공부', title: '카공', color: '#00D0F9' },
      { id: 6, state: 'done', category: '공부', title: '코테 준비', color: '#8A4BFF' },
      { id: 7, state: 'todo', category: '공부', title: '운동하기', color: '#FBE3A2' },
      { id: 8, state: 'todo', category: '공부', title: '운동하기', color: '#FBE3A2' },
      {
        id: 9,
        state: 'todo',
        category: '공부',
        title: '운동하기운동하기운동하기운동하기운동하기운동하기운동하기',
        color: '#FBE3A2',
      },
      {
        id: 10,
        state: 'todo',
        category: '공부',
        title: '운동하기운동하기운동하기운동하기운동하기운동하기운동하기',
        color: '#FBE3A2',
      },
      {
        id: 11,
        state: 'todo',
        category: '공부',
        title: '운동하기운동하기운동하기운동하기운동하기운동하기운동하기',
        color: '#FBE3A2',
      },
      {
        id: 12,
        state: 'todo',
        category: '공부',
        title: '운동하기운동하기운동하기운동하기운동하기운동하기운동하기',
        color: '#FBE3A2',
      },
      {
        id: 13,
        state: 'todo',
        category: '공부',
        title: '운동하기운동하기운동하기운동하기운동하기운동하기운동하기',
        color: '#FBE3A2',
      },
      {
        id: 14,
        state: 'todo',
        category: '공부',
        title: '운동하기운동하기운동하기운동하기운동하기운동하기운동하기',
        color: '#FBE3A2',
      },
      {
        id: 15,
        state: 'todo',
        category: '공부',
        title: '운동하기운동하기운동하기운동하기운동하기운동하기운동하기',
        color: '#FBE3A2',
      },
      {
        id: 16,
        state: 'todo',
        category: '공부',
        title: '운동하기운동하기운동하기운동하기운동하기운동하기운동하기',
        color: '#FBE3A2',
      },
      {
        id: 17,
        state: 'todo',
        category: '공부',
        title: '운동하기운동하기운동하기운동하기운동하기운동하기운동하기',
        color: '#FBE3A2',
      },
    ],
  },
  '2025-02-02': {
    todos: [
      { id: 1, state: 'todo', category: '공부', title: '영어 공부', color: '#FBE3A2' },
      { id: 2, state: 'done', category: '공부', title: '운동하기', color: '#FF9090' },
    ],
  },
  '2025-02-03': {
    todos: [
      { id: 1, state: 'done', category: '공부', title: '영어 공부', color: '#FFAED4' },
      { id: 2, state: 'todo', category: '공부', title: '운동하기', color: '#A7E793' },
    ],
  },
  '2025-02-27': {
    todos: [{ id: 3, state: 'todo', category: '공부', title: '프로젝트 회의', color: '#CCCCCC' }],
  },
  '2025-02-26': {
    todos: [
      { id: 1, state: 'done', category: '공부', title: '영어 공부', color: '#FFE5E5' },
      { id: 2, state: 'todo', category: '공부', title: '송별회', color: '#FF4747' },
      { id: 3, state: 'progress', category: '공부', title: '세탁기 돌리기', color: '#FF8026' },
      { id: 4, state: 'todo', category: '공부', title: '과제 제출', color: '#FFC119' },
      { id: 5, state: 'done', category: '공부', title: '카공', color: '#00D0F9' },
      { id: 6, state: 'done', category: '공부', title: '코테 준비', color: '#8A4BFF' },
    ],
  },
  '2025-03-30': {
    todos: [
      { id: 1, state: 'done', category: '공부', title: '영어 공부', color: '#FFE5E5' },
      { id: 2, state: 'todo', category: '공부', title: '송별회', color: '#FF4747' },
      { id: 3, state: 'progress', category: '공부', title: '세탁기 돌리기', color: '#FF8026' },
      { id: 4, state: 'todo', category: '공부', title: '과제 제출', color: '#FFC119' },
      { id: 5, state: 'done', category: '공부', title: '카공', color: '#00D0F9' },
      { id: 6, state: 'done', category: '공부', title: '코테 준비', color: '#8A4BFF' },
    ],
  },
};

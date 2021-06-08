import { getState } from './config';

const getTodos = () => getState('todos');

export { getTodos };

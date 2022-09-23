import { v4 as uuidv4 } from "uuid";

/**
 * @typedef Todo
 * @property {string} id - 아이디
 * @property {string} content - 내용
 * @property {boolean} isCompleted - 완료 여부
 * @property {string} category - 카테고리
 * @property {Array.<string>} [tags] - 태그들
 */

interface Todo {
  id: string;
  content: string;
  isCompleted: boolean;
  category: string;
  tags?: string[];
}

interface CreateTodoProps {
  content: string;
  isCompleted: boolean;
  category: string;
  tags?: string[];
}

interface DeleteTagProps {
  id: string;
  tagName?: string;
}

class TodoList {
  todos: Todo[];

  constructor() {
    this.todos = [];
  }

  /**
   * 모든 할 일을 조회하는 함수
   * @returns {Array.<Todo>} - todo 객체의 배열
   */
  getTodos(): Todo[] {
    return this.todos;
  }

  /**
   * id를 기반으로 특정 할 일을 조회하는 함수
   * @param {string} id - 아이디
   * @returns {Todo} - todo 객체
   */
  getTodoById(id: string): Todo {
    const targetTodo = this.todos.find((todo) => todo.id === id);
    if (!targetTodo) {
      throw Error("해당 id를 가진 할 일이 존재하지 않습니다.");
    }
    return targetTodo;
  }

  /**
   * 할 일을 추가하는 함수
   * @param {Object} createTodoProps
   * @param {string} createTodoProps.content - 내용
   * @param {boolean} createTodoProps.isCompleted - 완료 여부
   * @param {string} createTodoProps.category - 카테고리
   * @param {Array.<string>} [createTodoProps.tags] - 태그들
   */
  createTodo({ content, isCompleted, category, tags = [] }: CreateTodoProps) {
    let newTodo: Todo = {
      id: uuidv4(),
      content,
      isCompleted,
      category,
    };
    if (tags.length) {
      newTodo["tags"] = tags;
    }
    this.todos.push(newTodo);
  }

  /**
   * 특정 할 일의 속성을 수정하는 함수
   * @param {Object<Todo>} updateTodoProps
   */
  updateTodo(targetTodo: Todo) {
    if (!this.todos.find((todo) => todo.id === targetTodo.id)) {
      throw Error("해당 id를 가진 할 일이 존재하지 않습니다.");
    }
    const newTodos = this.todos.map((todo) => {
      if (todo.id === targetTodo.id) {
        return targetTodo;
      } else {
        return todo;
      }
    });
    this.todos = newTodos;
  }

  /**
   * id를 넘겨줄 경우 특정 할 일을, 그렇지 않은 경우 모든 할 일을 삭제하는 함수
   * @param {string} [id] - 아이디
   */
  deleteTodo(id = "") {
    if (id.length === 0) {
      this.todos = [];
      return;
    }
    if (!this.todos.find((todo) => todo.id === id)) {
      throw Error("해당 id를 가진 할 일이 존재하지 않습니다.");
    }
    const newTodos = this.todos.filter((todo) => todo.id !== id);
    this.todos = newTodos;
  }

  /**
   * 특정 할 일의 모든/특정 태그를 삭제하는 함수
   * @param {Object} deleteTodoProps
   * @param {string} deleteTodoProps.id - 아이디
   * @param {string} [deleteTodoProps.tagName] - 태그 이름
   */
  deleteTodoTags({ id, tagName = "" }: DeleteTagProps) {
    if (tagName.length === 0) {
      const newTodos = this.todos.map((todo) => {
        if (todo.id === id) {
          const { tags, ...keysWithoutTags } = todo;
          const todoWithoutTags = { ...keysWithoutTags };
          return todoWithoutTags;
        } else {
          return todo;
        }
      });
      this.todos = newTodos;
    } else {
      const targetTodo = this.todos.find((todo) => todo.id === id);
      if (!targetTodo) {
        throw Error("해당 id를 가진 할 일이 존재하지 않습니다.");
      }
      const targetTag = targetTodo.tags?.find((tag) => tag === tagName);
      if (!targetTag) {
        throw Error("해당하는 태그가 존재하지 않습니다.");
      }
      const newTodos = this.todos.map((todo) => {
        if (todo.id === id) {
          const todoWithoutTags = {
            ...todo,
            tags: todo.tags?.filter((tag) => tag !== tagName),
          };
          return todoWithoutTags;
        } else {
          return todo;
        }
      });
      this.todos = newTodos;
    }
  }
}

const myTodos = new TodoList();

myTodos.createTodo({
  content: "todo 구현",
  isCompleted: false,
  category: "공부",
});
myTodos.createTodo({
  content: "typescript 공부",
  isCompleted: false,
  category: "공부",
  tags: ["js"],
});

// const todo = myTodos.getTodoById("hello");

const todos = myTodos.getTodos();
console.log(todos);

const targetTodo = todos.find((todo) => todo.content === "typescript 공부");
if (targetTodo) {
  myTodos.updateTodo({
    ...targetTodo,
    isCompleted: true,
    category: "운동",
  });
  console.log(myTodos);

  // myTodos.deleteTodoTags({ id: targetTodo.id });
  myTodos.deleteTodoTags({ id: targetTodo.id, tagName: "ts" });
  console.log(myTodos);
}

// myTodos.deleteTodo(targetTodo.id);
// console.log(myTodos);

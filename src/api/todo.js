/**
 * @typedef Todo
 * @property {string} id - 아이디
 * @property {string} content - 내용
 * @property {boolean} isCompleted - 완료 여부
 * @property {string} category - 카테고리
 * @property {Array.<string>} [tags] - 태그들
 */

/**
 * 모든 할 일을 조회하는 함수
 * @returns {Promise<Array.<Todo>>} todo 객체의 배열을 갖는 응답 데이터 Promise 객체
 */
const getTodos = () => {};

/**
 * id를 기반으로 특정 할 일을 조회하는 함수
 * @param {string} id - 아이디
 * @returns {Promise<Todo>} todo 객체를 갖는 응답 데이터 Promise 객체
 */
const getTodoById = (id) => {};

/**
 * 할 일을 추가하는 함수
 * @param {Object} createTodoProps
 * @param {string} createTodoProps.content - 내용
 * @param {boolean} createTodoProps.isCompleted - 완료 여부
 * @param {string} createTodoProps.category - 카테고리
 * @param {Array.<string>} [createTodoProps.tags] - 태그들
 */
const createTodo = () => {};

/**
 * 특정 할 일의 속성을 수정하는 함수
 * @param {Object<Todo>} updateTodoProps
 */
const updateTodo = (todo) => {};

/**
 * id를 넘겨줄 경우 특정 할 일을, 그렇지 않은 경우 모든 할 일을 삭제하는 함수
 * @param {string} [id] - 아이디
 */
const deleteTodo = () => {};

/**
 * 특정 할 일의 모든/특정 태그를 삭제하는 함수
 * @param {Object} deleteTodoProps
 * @param {string} deleteTodoProps.id - 아이디
 * @param {string} [deleteTodoProps.tagName] - 태그 이름
 */
const deleteTodoTags = () => {};

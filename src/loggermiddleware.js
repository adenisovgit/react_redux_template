/**
 * Логирует все экшены и состояния после того, как они будут отправлены.
 */
const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd(action.type);
  return result;
};

export default logger;

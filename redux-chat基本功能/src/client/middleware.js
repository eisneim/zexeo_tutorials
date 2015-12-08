
export const socketMiddleware = socket => store => next => action => {
	if (action.meta && action.meta.remote) {
	  socket.emit('action', action);
	}

	return next(action)
}

/**
 * 记录所有被发起的 action 以及产生的新的 state。
 */
export const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  const nextState = store.getState()
  console.log('next state', nextState.toJS? nextState.toJS() : nextState )
  console.groupEnd(action.type)
  return result
}

/**
 * 让你可以发起一个函数来替代 action。
 * 这个函数接收 `dispatch` 和 `getState` 作为参数。
 *
 * 对于（根据 `getState()` 的情况）提前退出，或者异步控制流（ `dispatch()` 一些其他东西）来说，这非常有用。
 *
 * `dispatch` 会返回被发起函数的返回值。
 */
export const thunk = store => next => action =>
  typeof action === 'function' ?
    action(store.dispatch, store.getState) :
    next(action)

/*
 onclick={dispatch( (dispatch, getState)=>{
    const state = getState()
    if(something wrong) return
    
    doSomeApiRequest( state.apiurl )
    .then(data=>{
      dispatch( requestSomeApiSuccess(data) )
    }, error => dispatch(requestSomeApiFail(e)) )
 })}
 */ 

 /**
  * 用 { meta: { delay: N } } 来让 action 延迟 N 毫秒。
  * 在这个案例中，让 `dispatch` 返回一个取消 timeout 的函数。
  */
 export const timeoutScheduler = store => next => action => {
   if (!action.meta || !action.meta.delay) {
     return next(action)
   }

   let timeoutId = setTimeout(
     () => next(action),
     action.meta.delay
   )

   return function cancel() {
     clearTimeout(timeoutId)
   }
 }


 /**
  * 使你除了 action 之外还可以发起 promise。
  * 如果这个 promise 被 resolved，他的结果将被作为 action 发起。
  * 这个 promise 会被 `dispatch` 返回，因此调用者可以处理 rejection。
  */
 const vanillaPromise = store => next => action => {
   if (typeof action.then !== 'function') {
     return next(action)
   }

   return Promise.resolve(action).then(store.dispatch)
 }

/**
 * 让你可以发起带有一个 { promise } 属性的特殊 action。
 *
 * 这个 middleware 会在开始时发起一个 action，并在这个 `promise` resolve 时发起另一个成功（或失败）的 action。
 *
 * 为了方便起见，`dispatch` 会返回这个 promise 让调用者可以等待。
 */
const readyStatePromise = store => next => action => {
  if (!action.promise) {
    return next(action)
  }

  function makeAction(ready, data) {
    let newAction = Object.assign({}, action, { ready }, data)
    delete newAction.promise
    return newAction
  }

  next(makeAction(false))
  return action.promise.then(
    result => next(makeAction(true, { result })),
    error => next(makeAction(true, { error }))
  )
}

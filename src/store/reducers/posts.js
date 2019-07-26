import {
    GET_POSTS_PENDING,
    GET_POSTSFULFILLED,
    GET_POSTS_REJECTED,
    POST_POSTS_PENDING,
    POST_POSTS_FULFILLED,
    POST_POSTS_REJECTED,
    UPDATE_POSTS_PENDING,
    UPDATE_POSTS_FULFILLED,
    UPDATE_POSTS_REJECTED,
    DELETE_POSTS_PENDING,
    DELETE_POSTS_FULFILLED,
    DELETE_POSTS_REJECTED,
} from '../actions/postsAction'

const initialState = {
    list: {},
    error: false,
    status: {
        get: {
            isPending: false,
            isFulfilled: false,
            isRejected: false,
        },
        post: {
            isRejected: false,
        },
        delete: {
            isRejected: false
        }
    }
}

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS_PENDING:
            return {
                ...state,
                status: {
                    ...state.status,
                    get: {
                        isPending: true,
                        isFulfilled: false,
                    }
                },
            }
        case GET_POSTSFULFILLED:
            return {
                ...state,
                list: {
                    ...action.payload,
                },
                error: false,
                status: {
                    ...state.status,
                    get: {
                        isPending: false,
                        isFulfilled: true,
                        isRejected: false,
                    }
                },
            }
        case GET_POSTS_REJECTED:
            return {
                ...state,
                error: action.payload,
                status: {
                    ...state.status,
                    get: {
                        isPending: false,
                        isFulfilled: false,
                        isRejected: true,
                    }
                },
            }
        case POST_POSTS_PENDING:
            return {
                ...state,
                status: {
                    ...state.status,
                    post: {
                        isPending: true,
                        isFulfilled: false,
                    }
                },
            }
        case POST_POSTS_FULFILLED:
            return {
                ...state,
                list: {
                    ...action.payload,
                },
                status: {
                    ...state.status,
                    post: {
                        isPending: false,
                        isFulfilled: true,
                        isRejected: false,
                    }
                },
            }
        case POST_POSTS_REJECTED:
            return {
                ...state,
                status: {
                    ...state.status,
                    post: {
                        isPending: false,
                        isFulfilled: false,
                        isRejected: true,
                    }
                },
            }
        case UPDATE_POSTS_PENDING:
            return {
                ...state,
                status: {
                    ...state.status,
                    post: {
                        isPending: true,
                        isFulfilled: false,
                    }
                },
            }
        case UPDATE_POSTS_FULFILLED:
            return {
                ...state,
                list: {
                    ...action.payload,
                },
                status: {
                    ...state.status,
                    post: {
                        isPending: false,
                        isFulfilled: true,
                        isRejected: false,
                    }
                },
            }
        case UPDATE_POSTS_REJECTED:
            return {
                ...state,
                status: {
                    ...state.status,
                    post: {
                        isPending: false,
                        isFulfilled: false,
                        isRejected: true,
                    }
                },
            }
        case DELETE_POSTS_PENDING:
            return {
                ...state,
                status: {
                    ...state.status,
                    post: {
                        isPending: true,
                        isFulfilled: false,
                    }
                },
            }
        case DELETE_POSTS_FULFILLED:
            return {
                ...state,
                list: {
                    ...action.payload,
                },
                status: {
                    ...state.status,
                    post: {
                        isPending: false,
                        isFulfilled: true,
                        isRejected: false,
                    }
                },
            }
        case DELETE_POSTS_REJECTED:
            return {
                ...state,
                status: {
                    ...state.status,
                    post: {
                        isPending: false,
                        isFulfilled: false,
                        isRejected: true,
                    }
                },
            }
        default:
            return state;
    }
}

export default postsReducer;
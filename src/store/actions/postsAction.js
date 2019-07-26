import _ from 'lodash'

export const GET_POSTS_PENDING = 'GET_POSTS_PENDING'
export const GET_POSTSFULFILLED = 'GET_POSTSFULFILLED'
export const GET_POSTS_REJECTED = 'GET_POSTS_REJECTED'
export const POST_POSTS_PENDING = 'POST_POSTS_PENDING'
export const POST_POSTS_FULFILLED = 'POST_POSTS_FULFILLED'
export const POST_POSTS_REJECTED = 'POST_POSTS_REJECTED'
export const UPDATE_POSTS_PENDING = 'UPDATE_POSTS_PENDING'
export const UPDATE_POSTS_FULFILLED = 'UPDATE_POSTS_FULFILLED'
export const UPDATE_POSTS_REJECTED = 'UPDATE_POSTS_REJECTED'
export const DELETE_POSTS_PENDING = 'DELETE_POSTS_PENDING'
export const DELETE_POSTS_FULFILLED = 'DELETE_POSTS_FULFILLED'
export const DELETE_POSTS_REJECTED = 'DELETE_POSTS_REJECTED'

export const getPostsPending = () => ({ type: GET_POSTS_PENDING })
export const getPostsFulfilled = payload => ({ type: GET_POSTSFULFILLED, payload })
export const getPostsRejected = payload => ({ type: GET_POSTS_REJECTED, payload })

const postPostsPending = () => ({ type: POST_POSTS_PENDING })
const postPostsFulfilled = payload => ({ type: POST_POSTS_FULFILLED, payload })
const postPostsRejected = payload => ({ type: POST_POSTS_REJECTED, payload })

const updatePostsPending = () => ({ type: UPDATE_POSTS_PENDING })
const updatePostsFulfilled = payload => ({ type: UPDATE_POSTS_FULFILLED, payload })
const updatePostsRejected = payload => ({ type: UPDATE_POSTS_REJECTED, payload })

const deletePostsPending = () => ({ type: DELETE_POSTS_PENDING })
const deletePostsFulfilled = payload => ({ type: DELETE_POSTS_FULFILLED, payload })
const deletePostsRejected = payload => ({ type: DELETE_POSTS_REJECTED, payload })

export const fetchPosts = () => {
    // obtenemos la informacion con el fetch
    fetch('https://jsonplaceholder.typicode.com/Posts')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('postsList', JSON.stringify(data))
        })
}

export const getPosts = () => {
    // hacemos una consulta del json previamente guardado
    return dispatch => {
        dispatch(getPostsPending())
        try {
            const data = JSON.parse(localStorage.getItem("postsList"))
            dispatch(getPostsFulfilled({ posts: data, data }))
        } catch (error) {
            dispatch(getPostsRejected(error))
        }
    }
}

export const postPosts = payload => {
    // debido a que un mantenimiento no es posible se obtiene la lista y solo añadimos elemento al json
    console.log('create')
    return (dispatch) => {
        dispatch(updatePostsPending())
        try {
            const data = JSON.parse(localStorage.getItem("postsList"))
            data.push(payload)
            localStorage.setItem('postsList', JSON.stringify(data))
            dispatch(updatePostsFulfilled({ posts: payload, data }))
        } catch (error) {
            dispatch(updatePostsRejected(error))
        }
    }
}

export const updatePosts = payload => {
    // debido a que un mantenimiento no es posible se obtiene la lista y solo modificamos el json
    return (dispatch) => {
        dispatch(postPostsPending())
        try {
            const data = JSON.parse(localStorage.getItem("postsList"))
            data.splice(payload.id-1, 1, payload)
            localStorage.setItem('postsList', JSON.stringify(data))
            dispatch(postPostsFulfilled({ posts: payload, data }))
        } catch (error) {
            dispatch(postPostsRejected(error))
        }
    }
}

export const deletePosts = payload => {
    // debido a que un mantenimiento no es posible se obtiene la lista y solo eliminamos elementos del json
    return (dispatch) => {
        dispatch(deletePostsPending())
        try {
            const data = JSON.parse(localStorage.getItem("postsList"))
            _.remove(data, ['id', payload])
            localStorage.setItem('postsList', JSON.stringify(data))
            dispatch(deletePostsFulfilled({ posts: payload, data }))
        } catch (error) {
            dispatch(deletePostsRejected(error))
        }
    }

}
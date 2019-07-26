import { connect } from 'react-redux'

import { getPosts, postPosts, updatePosts, deletePosts } from '../../../store/actions/postsAction'
import PostList from '../components/PostList'

const mapStateToProps = state => ({
    posts: state.postsReducer.list.data,
    status: state.postsReducer.status
})

const mapDispatchToProps = {
    getPosts,
    postPosts,
    updatePosts,
    deletePosts,
}

const PostListContainer = connect(mapStateToProps, mapDispatchToProps)(PostList)
export default PostListContainer

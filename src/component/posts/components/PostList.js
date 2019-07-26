import React, { Component } from 'react'
import styled from 'styled-components'
import { Table, Icon, Popconfirm, Modal, message } from 'antd';
import _ from 'lodash'

// import PropTypes from 'prop-types'

import PostForm from './PostForm'
import { fetchPosts } from '../../../store/actions/postsAction'

export class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPost: [],
            action: null,
            showModal: false,
            postObject: {},
            readly: false,
        }
    }

    componentDidMount() {
        const { getPosts } = this.props
        fetchPosts()
        getPosts()
    }

    componentWillReceiveProps(prevProps) {
        const { posts } = this.props

        if (prevProps.posts !== posts) {
            this.setState({
                listPost: prevProps.posts,
                readly: true,
            })
        }
    }

    setShowModal(showModal, action, id) {
        // abre el modal,
        // recibe una accion de "add" o "edit"
        // si es edit filtra el objeto de entre la lista con el id, este será enviado al formulario de edit
        this.setState({
            showModal,
            action,
            postObject: {},
        })
        if (action === 'edit') {
            const { listPost } = this.state;
            this.setState({
                postObject: _.filter(listPost, ['id', id])[0],
            })
        }
    }

    deleteSubmit = (id) => {
        const { deletePosts } = this.props
        deletePosts(id)
        this.success('delete')
        // elimina el objetdo de entre la lista basado en el id seleccionado
    }

    closeModal = () => {
        // cierra el modal

        // volvemos a cargar la lista
        const { getPosts } = this.props
        getPosts()

        this.setState({
            showModal: false
        })
    }

    success = (action) => {
        switch (action) {
            case 'create':
                return message.success('Post creado éxitosamente');
            case 'edit':
                return message.success('Post editado éxitosamente');
            case 'delete':
                return message.success('Post eliminado éxitosamente');
            default:
                break;
        }
    };
    
    render() {
        const {
            listPost,
            action,
            showModal,
            postObject,
            readly,
        } = this.state;

        const {
            postPosts,
            getPosts,
            updatePosts,
            status,
        } = this.props

        console.log(status.delete)
        if (status.delete.isFulfilled) {
            
        }


        let columns;
        let rows;

        if (readly) {
            rows = listPost;
            columns = [
                // estructura el contenido de cada columna que se renderizará en la tabla.
                {
                    title: 'Title',
                    dataIndex: 'title',
                    key: 'title',
                    render: title => (<span className="text">{title}</span>),
                },
                {
                    title: 'Body',
                    dataIndex: 'body',
                    key: 'body',
                    render: body => (<span className="text">{body}</span>),
                },
                {
                    title: 'Action',
                    dataIndex: 'id',
                    render: id => (
                        <div>
                            <Icon className="edit mr-4" type="edit" onClick={() => this.setShowModal(true, 'edit', id)} />
                            <Popconfirm
                                title="¿Seguro de Eliminar?"
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                onConfirm={() => this.deleteSubmit(id)}
                            >
                                <Icon className="delete" type="delete" />
                            </Popconfirm>
                        </div>
                    ),
                    width: 100,
                },
            ]

        }

        return (
            <Wrapper className="container">
                <div className="row">
                    <div className="col-md-12 mb-3 mt-3 base">
                        <h1 className="text-center" style={{ color: '#fff' }}>Posts List</h1>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12 text-right">
                        <button type="submit" className="btn btn-primary bt" onClick={() => this.setShowModal(true, 'create')} >Add Post</button>
                    </div>
                </div>
                <div className="row base">
                    <div className="col-md-12 table">
                        {<Table
                            pagination={{ pageSize: 7 }}
                            size="small"
                            columns={columns}
                            dataSource={rows}
                            bordered={false}
                            rowKey={record => record.id}
                        />}
                    </div>
                </div>
                {<Modal
                    centered
                    visible={showModal}
                    onOk={this.handleOk}
                    onCancel={() => this.setShowModal(false)}
                    footer={false}
                    destroyOnClose
                >
                    {action === 'create' &&
                        <PostForm
                            action={action}
                            key={postObject.id}
                            postObject={postObject}
                            closeModal={this.closeModal}
                            postPosts={postPosts}
                            getPosts={getPosts}
                            success={this.success}
                        />}
                    {action === 'edit' &&
                        <PostForm
                            action={action}
                            key={postObject.id}
                            postObject={postObject}
                            closeModal={this.closeModal}
                            updatePosts={updatePosts}
                            getPosts={getPosts}
                            success={this.success}
                        />
                    }
                </Modal>}
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`

  .delete {
      cursor: pointer;
      color: red;
  }
  .edit {
    cursor: pointer;
      color: #1D1951;
  }

  .bt {
    border: solid 1px #1D1951;
      border-radius: 3px;
      background-color: #1D1951;
      -webkit-box-shadow: -2px 11px 21px -3px rgba(0,0,0,0.55);
      -moz-box-shadow: -2px 11px 21px -3px rgba(0,0,0,0.55);
      box-shadow: -2px 11px 21px -3px rgba(0,0,0,0.55);
  }

  .table {
      background-color: white;
      border-radius: 5px;
      padding: 5px;
  }

  .base {
    border: solid 1px #1D1951;
      border-radius: 8px;
      background-color: #1D1951;
      -webkit-box-shadow: -2px 11px 21px -3px rgba(0,0,0,0.55);
      -moz-box-shadow: -2px 11px 21px -3px rgba(0,0,0,0.55);
      box-shadow: -2px 11px 21px -3px rgba(0,0,0,0.55);
      padding: 20px 20px 5px 20px;
      margin-bottom: 20px;
  }
`

export default PostList;
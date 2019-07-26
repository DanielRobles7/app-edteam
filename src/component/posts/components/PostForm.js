import React, { Component } from 'react'
import _ from 'lodash'

export class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.action ? props.postObject.userId : '1',
            id: props.action ? props.postObject.id : _.maxBy(props.listPost, 'id').id + 1,
            title: props.action ? props.postObject.title : '',
            body: props.action ? props.postObject.body : '',
        }
    }

    handleChange = (e) => {
        // captura todos los cambios en el formulario
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    createSubmit = (e) => {
        // captura los datos al pulsar submit
        // evalua la accion para crear o eliminar 
        // cierra modal
        const { closeModal, postPosts, updatePosts, action, success } = this.props

        e.preventDefault();

        switch (action) {
            case 'create':
                postPosts(this.state)
                success('create')
                break;
            case 'edit':
                updatePosts(this.state)
                success('edit')
                break;
            default:
                break;
        }
        closeModal()
    }

    render() {
        const { action } = this.props
        const { title, body } = this.state
        return (
            <div>
                <form onSubmit={this.createSubmit}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                {action === 'edit' ? <h4 className="text-center">Edit Post</h4> : <h4 className="text-center">Crear Post</h4>}

                                <div className="form-group">
                                    <label className="label" htmlFor="title">Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="title"
                                        onChange={this.handleChange}
                                        required
                                        placeholder="Title post"
                                        maxLength={50}
                                        defaultValue={title}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="label mb-2" htmlFor="body">Body</label>
                                    <textarea
                                        className="form-control"
                                        type="text"
                                        id="body"
                                        onChange={this.handleChange}
                                        required
                                        placeholder="Body post"
                                        maxLength={255}
                                        rows="4"
                                        defaultValue={body}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-12 text-center">
                                        <button type="submit" className="btn btn-primary mt-3">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default PostForm


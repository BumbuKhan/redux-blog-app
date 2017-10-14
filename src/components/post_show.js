import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions/index';
import {Link} from 'react-router';

class PostShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }

    deletePost() {
        this.props.deletePost(this.props.post.id).then(() => {
            this.context.router.push('/');
        });
    }

    render() {
        const {post} = this.props;

        if (!post) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <div className="clearfix">
                    <Link to="/">Back to post list</Link>
                    <button className="btn btn-danger pull-xs-right" onClick={() => {
                        this.deletePost()
                    }}>Delete
                    </button>
                </div>
                <h1>{post.title}</h1>
                <p className="text-mute">{post.categories}</p>
                <br />
                <p>{post.content}</p>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        post: state.posts.post
    }
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostShow);
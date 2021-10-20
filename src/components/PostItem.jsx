import React from 'react';
import MyButton from './UI/button/MyButton';

const PostItem = (props) => {
    return (
    <div className="post">
        <div className="post__content">
            <strong>{props.post.id}. {props.post.title}</strong>
            <div>{props.post.body}</div>
        </div>
        <MyButton onClick={() => props.remove(props.post)} className="post__btn">Удалить</MyButton>
    </div>
    )
}
export default PostItem;
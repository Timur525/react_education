import React from 'react';
import MyButton from './UI/button/MyButton';
import { useHistory } from 'react-router-dom';

const PostItem = (props) => {
    const router = useHistory();
    return (
    <div className="post">
        <div className="post__content">
            <strong>{props.post.id}. {props.post.title}</strong>
            <div>{props.post.body}</div>
        </div>
        <div className="post__btns">
            <MyButton onClick={() => router.push(`/posts/${props.post.id}`)} className="post__btn" style={{margin: '0 5px'}}>Открыть</MyButton>
            <MyButton onClick={() => props.remove(props.post)} className="post__btn">Удалить</MyButton>
        </div>
    </div>
    )
}
export default PostItem;
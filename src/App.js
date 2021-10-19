import React, {useState, useMemo, useEffect} from 'react';
import Counter from './components/Counter';
import TextOutput from './components/TextOutput';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import MyInput from './components/UI/input/MyInput';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';
import PostService from './API/PostService'
import Loader from './components/UI/loader/Loader';
import './styles/App.css';
import axios from 'axios';
import {useFetching} from './hooks/useFetching';

function App() {

  const [posts, setPosts] = useState([
  ]);

  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [fetchPosts, isPostsLoading, postError] = useFetching( async () => {
    const posts = await PostService.getAll();
    setPosts(posts)
  });

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false)
  }

  useEffect( () => {
    fetchPosts();
  }, [])

  const removePost = (post) => {
    setPosts(posts.filter( p => p.id !== post.id))
  }

  return (
    <div className="App">

      <MyButton style={{marginTop: 30}} onClick={ () => setModal(true)}>
        Создать пост
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>

        <PostForm create={createPost}/>

      </MyModal>

      <PostFilter filter={filter} setFilter={setFilter} />

      {postError &&
        <h2 style={{textAlign: 'center'}}>Произошла ошибка ${postError}</h2>
      }

      {isPostsLoading
        ?<div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
          <Loader style={{textAlign: 'center'}}></Loader>
         </div>
        :<PostList posts={sortedAndSearchedPosts} remove={removePost} title='Список постов'/>
      }



    </div>
  );
}

export default App;

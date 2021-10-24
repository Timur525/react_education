import React, {useState, useMemo, useEffect} from 'react';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/modal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import MySelect from '../components/UI/select/MySelect';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService'
import Loader from '../components/UI/loader/Loader';
import {useFetching} from '../hooks/useFetching';
import Pagination from '../components/UI/pagination/Pagination';
import { getPageCount } from '../utils/pages';

function Posts() {

  const [posts, setPosts] = useState([
  ]);

  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [fetchPosts, isPostsLoading, postError] = useFetching( async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false)
  }

  useEffect( () => {
    fetchPosts(limit, page);
  }, [limit])

  const removePost = (post) => {
    setPosts(posts.filter( p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page);
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

      <MySelect
        value = {limit}
        onChange = {value => setLimit(value)}
        defaultValue = 'Кол-во элементов на странице'
        options = {[
            {value: 5, name: '5'},
            {value: 10, name: '10'},
            {value: 25, name: '25'},
            {value: -1, name: 'Показать все'},
        ]}
      />

      {postError &&
        <h2 style={{textAlign: 'center'}}>Произошла ошибка ${postError}</h2>
      }

      {isPostsLoading
        ?<div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
          <Loader style={{textAlign: 'center'}}></Loader>
         </div>
        :<PostList posts={sortedAndSearchedPosts} remove={removePost} title='Список постов'/>
        
      }
      <Pagination
        totalPages={totalPages}
        page={page}
        changePage={changePage}
      />
      

    </div>
  );
}

export default Posts;

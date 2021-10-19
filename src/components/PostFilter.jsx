import React from 'react';
import MySelect from './UI/select/MySelect';
import MyInput from './UI/input/MyInput';

const PostFilter = ({filter, setFilter}) => {
    return (
        <div style={{marginTop: 30}}>
            <MySelect
                value = {filter.sort}
                onChange = {selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue = 'Сортировка'
                options = {[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'}
                ]}
            />

            <MyInput 
                placeholder = 'Поиск'
                value = {filter.query}
                onChange = {e => setFilter({...filter, query: e.target.value})}
            />
        </div>
    )
};
export default PostFilter
import React from 'react';
import HomeCard from '../HomeCard/HomeCard';

import {searchMovies,searchTv,loadingMovies} from '../../actions/index'

import './Search.css'

const api_key = 'fe4433c0a2cecf3cd361ef66042fcabe'
class Search extends React.Component{

    componentDidMount(){

        const urlParams = window.location.search.split('=')[1];
        const {store} = this.props;
        let {query} = this.props;
        if(urlParams){
            query=urlParams
        }
        store.subscribe(()=>this.forceUpdate());
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false`
        const url2 = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&page=1&query=${query}&include_adult=false`
        fetch(url).then((response)=>response.json()).then((data)=>{
            data = data['results'].filter((movie)=>movie['poster_path']!=null)
            let movies = data.map((movie)=>{
                return {
                    title: movie['original_title'],
                    poster: movie['poster_path'],
                    id: movie.id
                }
            })
            store.dispatch(searchMovies(movies));

            return fetch(url2).then((response)=>response.json()).then((data)=>{
                data = data['results'].filter((movie)=>movie['poster_path']!=null)
                let tv = data.map((movie)=>{
                    return {
                        title: movie['name'],
                        poster: movie['poster_path'],
                        id: movie.id
                    }
                })
                store.dispatch(searchTv(tv));
                store.dispatch(loadingMovies(false));
            })
        })
    }

    render(){
        const {store} = this.props;
        const state = store.getState().movies;
        const {searchMovies,searchTv,loading} = state;
        return (
            <>
            <div className='discover'>
                { !loading && <div style={styles.discover}>Movies</div> }
                <div className='discover-list'>
                    {!loading && searchMovies.map((movie)=>{
                        return <HomeCard key={movie.id} movie={movie} isMovie={true} isTv={false}/>
                    })}
                </div>
            </div>
            <div className='treding'>
                {!loading && <div style={styles.discover}>TV Shows</div>}
                <div className='treding-list'>
                    {!loading && searchTv.map((movie)=>{
                        return <HomeCard key={movie.id} movie={movie} isMovie={false} isTv={true}/>
                    })}
                </div>
            </div>
            </>
        )
    }
}

const styles = {
    discover:{
        fontWeight:600,
        fontSize:25,
        marginLeft:20,
        marginTop:20
    }
}

export default Search;
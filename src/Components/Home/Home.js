import React from 'react';
import HomeCard from '../HomeCard/HomeCard';

import {discoverMovies,trendingMovies,loadingMovies} from '../../actions/index'

import './Home.css'

const api_key = 'fe4433c0a2cecf3cd361ef66042fcabe'
class Home extends React.Component{

    componentDidMount(){
        const {store,isMovie,isTv} = this.props;
        store.subscribe(()=>this.forceUpdate());
        let query = '';
        let title = '';
        if(isMovie){
            query='movie';
            title='original_title';
        }
        if(isTv){
            query='tv';
            title='name';
        }
        const url = `https://api.themoviedb.org/3/discover/${query}?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
        const url2 = `https://api.themoviedb.org/3/trending/${query}/day?api_key=${api_key}`
        fetch(url).then((response)=>response.json()).then((data)=>{
            data = data['results'].filter((movie)=>movie['poster_path']!=null)
            let discover = data.map((movie)=>{
                return {
                    title: movie[title],
                    poster: movie['poster_path'],
                    id: movie.id
                }
            })
            store.dispatch(discoverMovies(discover));
            this.setState({discover,loading:true});

            return fetch(url2).then((response)=>response.json()).then((data)=>{
                data = data['results'].filter((movie)=>movie['poster_path']!=null)
                let trending = data.map((movie)=>{
                    return {
                        title: movie[title],
                        poster: movie['poster_path'],
                        id: movie.id
                    }
                })
                this.setState({trending,loading:false});
                store.dispatch(trendingMovies(trending));
                store.dispatch(loadingMovies(false));
            })
        })
    }

    render(){
        const {store,isMovie,isTv} = this.props;
        const state = store.getState().movies;
        const {discover,trending,loading} = state;
        return (
            <>
            <div className='discover'>
                { !loading && <div style={styles.discover}>Discover</div> }
                <div className='discover-list'>
                    {!loading && discover.map((movie)=>{
                        return <HomeCard key={movie.id} movie={movie} isTv={isTv} isMovie={isMovie}/>
                    })}
                </div>
            </div>
            <div className='treding'>
                {!loading && <div style={styles.discover}>Treding</div>}
                <div className='treding-list'>
                    {!loading && trending.map((movie)=>{
                        return <HomeCard key={movie.id} movie={movie}  isTv={isTv} isMovie={isMovie}/>
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

export default Home;
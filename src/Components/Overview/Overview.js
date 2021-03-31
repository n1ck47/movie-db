import React from 'react';
import PersonCard from '../PersonCard/PersonCard';
import ReactPlayer from 'react-player';
import './Overview.css'


const api_key = 'fe4433c0a2cecf3cd361ef66042fcabe'
class Overview extends React.Component{

    constructor(){
        super();
        this.state={
            movie:{},
            loading:true,
            cast:[],
            isMovie:true,
            videos:[],
            videoAvailable:false
        }
    }

    componentDidMount(){
        let id = window.location.href.split('id=')[1].split('&')[0];
        let isMovie = window.location.href.split('isMovie=')[1].split('&')[0];
        let isTv = window.location.href.split('isTv=')[1].split('&')[0];
        if(isTv==='true'){
            this.setState({isMovie:false})
        }
        const {store} = this.props;
        store.subscribe(()=>this.forceUpdate());
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`
        const url2 = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=en-US`
        fetch(url).then((response)=>response.json()).then((data)=>{
            if(isMovie==='true'){
                this.setState({movie:data})
                const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}&language=en-US`
                return fetch(url).then((response)=>response.json()).then((data)=>{
                    this.setState({cast:data.cast,loading:false})
                    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US`
                    return fetch(url).then((response)=>response.json()).then((data)=>{
                        this.setState({videos:data['results']})
                        if(data['results'].length!==0){
                            this.setState({videoAvailable:true})
                        }
                    })
                })
            }
            if(isMovie==='false'){
                return fetch(url2).then((response)=>response.json()).then((data)=>{
                    this.setState({movie:data})
                    const url = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${api_key}&language=en-US`
                    return fetch(url).then((response)=>response.json()).then((data)=>{
                        this.setState({cast:data.cast,loading:false,isMovie:false})
                        const url = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${api_key}&language=en-US`
                        return fetch(url).then((response)=>response.json()).then((data)=>{
                            this.setState({videos:data['results']})
                            if(data['results'].length!==0){
                                this.setState({videoAvailable:true})
                            }
                        })
                    })
                })
            }
        })
    }

    render(){
        const {movie,loading,isMovie,videoAvailable} = this.state;
        let count=0;
        let cast = this.state.cast;
        let videos = this.state.videos;
        if(!loading){
            cast = cast.filter((c)=>{
                if(c['profile_path']){
                    count+=1;
                }
                return c['profile_path'] && count<11;
            })
            count=0;
            videos = videos.filter((videos)=>{
                count+=1;
                return count<3;
            })
        }
        const img = `https://image.tmdb.org/t/p/w500${movie['poster_path']}`
        const bgImg = `https://image.tmdb.org/t/p/w500${movie['backdrop_path']}`
        let year = !loading && (isMovie ? movie['release_date'].split('-')[0] : movie['first_air_date'].split('-')[0]);
        let genres = !loading && movie['genres'].filter((gen)=> {
            return gen
        });
        return (
            <>{ !loading &&
            <div style={{height:'300',background:`linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${bgImg}) 0px 0px/cover no-repeat`}}>
            <div  
                    className='overview'>
                <div>
                    <img alt={isMovie ? movie['original_title']+' ('+year+')' : movie['name']+' ('+year+')'} style={styles.poster} src={img}/>
                </div>
                <div className='right-block'>
                    <div className='right-block-title'>
                    <div style={styles.title}>{isMovie ? movie['original_title']+' ('+year+')' : movie['name']+' ('+year+')'}</div>
                    <div className='genres'>
                        
                            {genres.map((gen)=> <li key={gen.id}>{gen.name}</li>)}
                       
                    </div>
                    
                    <div style={{fontSize:21,fontWeight:500,marginTop:10,marginBottom:10,color:'white'}}>Overview</div>
                    <div style={{color:'white',fontSize:15}}>{movie['overview']}</div>
                    </div>
                
                    <div className='right-block-cast'>
                       { count!==0 && <>
                        <div style={{fontSize:21,fontWeight:500,marginTop:10,marginLeft:20,color:'white'}}>Cast</div>
                        <div className='cast'>
                            {cast.map((c)=><PersonCard key={c.id} cast={c}/>)}
                        </div>
                        </>
                        }
                    </div>
                </div>
            </div>

            {videoAvailable && 
            <div className='clips'>
                <div style={{color:'white',marginLeft:'20px',fontSize:30}}>Clips</div>
                <div className='videos'>
                    { videos.map((video)=> <ReactPlayer
                    controls={true}
                    width={'640px'}
                    height={'360px'}
                    key={video.id}
                    style={{marginLeft:'20px',width:'800px'}}
                    url={`https://www.youtube.com/watch?v=${video.key}`}/>)}
                </div>
            </div>}
            </div>
            }

            </>
        )
    }
}

const styles = {
    poster:{
        height:450,
        width:300,
        marginLeft:20,
        marginTop:20,
        marginBottom:20,
        borderRadius:8
    },
    title:{
        fontSize:30,
        fontWeight:600,
        color:'white',
        marginBottom:2
    }
}

export default Overview;
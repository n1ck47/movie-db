import React from 'react';

import './HomeCard.css'


class HomeCard extends React.Component{
    

    render(){
        const {title,poster,id} = this.props.movie;
        const {isMovie,isTv} = this.props;
        
        const img = `https://image.tmdb.org/t/p/w500${poster}`
        return (
            <>
                <div className='home-card'>
                    <div>
                        <a href={`http://n1ck47.github.io/movies-db/?id=${id}&isMovie=${isMovie}&isTv=${isTv}#/overview`}><img alt={title} src={img} /></a>
                    </div>
                    <div className='home-card-bottom'>
                        <div style={styles.title}>{title}</div>
                    </div>
                </div>
            </>
        )
    }
}

const styles = {
    title : {
        fontWeight: 600,
        marginRight : 2
    }
}

export default HomeCard;
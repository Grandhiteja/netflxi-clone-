import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Row from '../components/Row';

function Home() {
  return (
    <div className="home">
      <Navbar />
      <Banner />
      <Row 
        title="NETFLIX ORIGINALS" 
        fetchUrl="/api/movies?category=netflixOriginals" 
        isLargeRow 
      />
      <Row title="Trending Now" fetchUrl="/api/movies?category=trending" />
      <Row title="Top Rated" fetchUrl="/api/movies?category=top-rated" />
      <Row title="Action Movies" fetchUrl="/api/movies?category=action" />
      <Row title="Comedy Movies" fetchUrl="/api/movies?category=comedy" />
      <Row title="Horror Movies" fetchUrl="/api/movies?category=horror" />
      <Row title="Romance Movies" fetchUrl="/api/movies?category=romance" />
      <Row title="Science Fiction" fetchUrl="/api/movies?category=scifi" />
      <Row title="Animation" fetchUrl="/api/movies?category=animation" />
      <Row title="Mystery & Thrillers" fetchUrl="/api/movies?category=mystery" />
      <Row title="Family Movies" fetchUrl="/api/movies?category=family" />
      <Row title="Crime" fetchUrl="/api/movies?category=crime" />
      <Row title="Documentaries" fetchUrl="/api/movies?category=documentary" />
    </div>
  );
}

export default Home;

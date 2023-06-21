import React, { useEffect, useState } from "react"
import Carousel from "./Carousel";
import style from '../assets/Album.module.css'
import AddNewAlbum from "./AddNewAlbum";

export default function Album() {

    // setup state
    const [album, setAlbum] = useState([]);
    const [addNew, setAddNew] = useState(false);
    const [fetchedData, setFetchedData] = useState('');

    function onAddNewAlbum(data) {
        setAddNew(true)
        console.log(data);
        setFetchedData(data)



    }

    useEffect(() => {
        // function for fetching data from API
        (async function fetchAlbumData() {
            const albumArray = [];
            const response = await fetch('https://jsonplaceholder.typicode.com/albums');
            const responseJSON = await response.json();
            console.log(responseJSON)

            for (let i = 0; i < responseJSON.length; i += 10) {
                let emptyArray = [];
                emptyArray = responseJSON.slice(i, [i + 10]);
                albumArray.push(emptyArray)
            }
            setAlbum(albumArray)
        })();
    }, []);

    return (
        <>
            <header>
                <h1 className={`display-1 text-center py-5 ${style.albumH1}`}> <img src="https://cdn.onlinewebfonts.com/svg/img_296255.png" width={'100px'} alt="..." />  Albums Collection </h1>
            </header>
            <main className={style.albumMain}>
                <section className={style.albumSection}>
                    {
                        album.map((album) => {
                            // give fetched data as album to Carousel as prop
                            return (<Carousel album={album} key={album[0].userId} />)
                        })
                    }
                    {
                        addNew &&
                        <div style={{ "borderRadius": "0.75rem", "backgroundColor": "aliceblue", "cursor": "pointer", "border": "1px solid black", "boxShadow": "0 0 10px 1.5px #888", "position": "relative" }}>
                            <img height={"350px"} width={"350px"} style={{ "borderRadius": "1rem" }} src="https://static.vecteezy.com/system/resources/previews/000/252/182/large_2x/mountain-landscape-pop-color-vector.jpg" alt="..." />
                            <div style={{ "backgroundColor": "aliceblue", "borderRadius": "0.5rem", "padding": "10px", "position": "absolute", "bottom": "20px", "left": "50px", "height": "15rem", "width": "15rem" }}>
                                

                                
                                <h3 className="display-6" style={{ "textAlign": "center", "textTransform": "capitalize" }}>Album 11</h3>
                                <h5 style={{ "textAlign": "center", "textTransform": "capitalize" }}>{`Title  ${fetchedData.id}`}</h5>
                                <p style={{ "textAlign": "center" }} >{fetchedData.body}</p>
                            <div className="d-flex flex-row justify-content-evenly w-100 py-3" style={{ "position": "relative" }}>
                                <button  type="button" className="btn btn-outline-danger"><i className="fa-solid fa-trash"></i></button>
                                <button type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample_${fetchedData.id}`} className="btn btn-outline-dark"><i className="fa-solid fa-music"></i> &nbsp;Modify</button>

                              

                            </div>
                            </div>
                        </div>
                    }
                    {/* Adding functionality to add new album */}
                    <AddNewAlbum onAddNewAlbum={onAddNewAlbum} />
                </section>
            </main>
            <footer className={style.albumFooter}>
               
                <p> © 2023 Albums Collection™ Ltd. All rights reserved.</p>
            </footer>
        </>

    )
}
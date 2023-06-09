import  React, {useState, useEffect, useMemo, useCallback} from 'react';

interface UnsplashImage {
  id: string;
  urls: {
    thumb: string;
  };
  alt_description: string;
}

const Home = () => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState(1);

  const loadMoreImages = useCallback(() => {
    setPage(page + 1);
  }, [page]);


  useEffect (()=> {
    const fetchImages = async () => {
      try {
        const response = await fetch (
          'https://api.unsplash.com/photos?client_id=MTfMutHlSMcxw3h2RNlGMeGHJWwPQRa9IR0CrePpR_M'
        );
        const data = await response.json();

        // Verificar si la respuesta contiene la propiedad errors
        if ('errors' in data){
          console.error('La respuesta de la API contiene errores:', data.errors);
        } else {
          //Verificar si la respuesta en un arreglo de objetos
          if (Array.isArray(data)){
            setImages(prevImages => [...prevImages, ...data]);
          }else{
            console.error('La respuesta de la API no es un arreglo de objetos:', data);
          }
        }
      } catch (error){
        console.error('Error al obtener imagenes:',error ); 
      }
    };
    fetchImages();
  }, [page]);

  const renderedImages = useMemo(()=>
    images.map((image) => (
      <img
        key={image.id}
        src={image.urls.thumb}
        alt={image.alt_description}
        style={{width: '200px', height: '200px', objectFit: 'cover', margin: '8px'}}
      />
    )),
    [images]
  );

  return (
    <div>
      <h1>Imagenes de Unsplash</h1>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {renderedImages} 
      </div>
      <button onClick={loadMoreImages}>Cargar mas imagenes</button>
    </div>
  );
};

export default Home;

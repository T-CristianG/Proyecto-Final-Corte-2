const Principal: React.FC = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-300 w-full">
         <h1
            className="text-6xl font-bold sm:text-4xl md:text-5xl lg:text-6xl"
            style={{
              fontFamily: "Bangers", 
              color: '#FFEA00', // Color amarillo
              textShadow: '5px 10px 4px rgba(0, 0, 255, 0.7)', // Sombra azul alrededor del texto
              height: '25vh', 
              display: 'flex',
              fontSize: '10vw',
            }}
          >
          Pokédex
          </h1>
          <p>
            Qué mas ´pues 
          </p>
      <img 
        src=".\public\hero-img.png" 
        alt="Pokédex Logo" 
      />
      </div>
    );
  };
  
  export default Principal;
  
const Card = (pok) => {
  return (
    <div>
      <div>
        {pok.map((p) => {
          return (
            <div>
              <h2>Key: {p.id}</h2>
              <h2>Name:</h2>
              <h2>Specie:</h2>
              <h2>Genero:</h2>
              <h2>Origen:</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;

const input = document.getElementById('cameraInput');
const canvas = document.getElementById('fotoCanvas');
const ctx = canvas.getContext('2d');
const resultado = document.getElementById('resultado');

input.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = async () => {
    // Desenha a foto no canvas
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    try {
      // Sorteia um Pokémon
      const id = Math.floor(Math.random() * 151) + 1;
      console.log("Sorteando Pokémon ID:", id);

      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error("Erro ao buscar Pokémon");
      const pokemon = await res.json();
      console.log("Pokémon recebido:", pokemon);

      // Mostra resultado
      resultado.innerHTML = `
        <h2>Seu Pokémon é: ${pokemon.name.toUpperCase()}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Tipo: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
      `;
    } catch (error) {
      console.error(error);
      resultado.innerHTML = `<p style="color:red">Erro ao carregar Pokémon 😢</p>`;
    }
  };
});

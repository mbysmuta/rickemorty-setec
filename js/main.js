(async function() {

    const $divEpisodios = $('.episodios');
    const $divPersonagens = $('.personagens');

    if ($divEpisodios.length) {
        const episodios = await fazerRequisicao("episode")
        montarEpisodios(episodios)
    }
    
    if ($divPersonagens.length) {
        const episodios = await fazerRequisicao("character")
        montarPersonagens(episodios)
    }
    
    function montarEpisodios(episodios) {
        let episodio = episodios.map((ep) => {
            return templateEpisodio(ep.name, ep.air_date, ep.episode);
        })

        $divEpisodios.append(episodio);
    }

    function montarPersonagens(personagens) {
        let elenco = personagens.map((personagem) => {
            return templatePersonagem(personagem);
        })

        $divPersonagens.append(elenco);
    }

    
    async function fazerRequisicao(name) {
        let result;
        
        $('.episodios').append('<p id="load"> carregando </p>')
        
        await $.ajax({
            url: `https://rickandmortyapi.com/api/${name}`,
            method: "GET",
            dataType: "json"
        }).done(function(data) {
            result = data.results
        });
        
        $('#load').remove()
        
        
        return result;
    }

    function templateEpisodio(name, data, episodio) {
        return `
            <div class="episodio">
                <p id="name"> ${name} </p>
                <p id="info"> Data de lançamento: <span> ${data} </span> </p>
                <p id="info"> Episódio:  <span> ${episodio} </span> </p>
                <button class="botao"> PERSONAGENS </button>
            </div>
        `
    }

    function templatePersonagem({ gender, image, name, species, origin, location, status }) {
        return `
            <div class="personagem p-0">
                <img src="${image}" alt="" srcset="" width="254px">
                <div class="informacoes">
                    <p id="name"> ${name} </p>
                    <p id="tipo"> ${species} - ${gender} </p>
                    
                    <p class="info mt-2"> Origem: <span> ${origin.name} </span> </p>
                    <p class="info mt-2"> Localização: <span> ${location.name} </span> </p>
                    <p class="info mt-2"> Status: <span> ${status} </span> </p>
                    <button class="botao">EPISÓDIOS</button>
                </div>
            </div>  
        `
    }
})();



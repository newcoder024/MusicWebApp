// // data voor home slideshow met artiesten en info..
// const artists = ['The Weeknd', 'SZA', 'Billie Eilish', 'Doechii', 'Tyler the Creator']
// const slideContainer = document.querySelector('.slide-show');

// // Maak de slides voor de artiesten..
// artists.forEach(artist => {
//     fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artist)}&media=music&entity=musicTrack&limit=1`)
//     .then(response => response.json())
//     .then(data => {
//         const song = data.results[0];
//         if (song){
//             const slide = document.createElement('div');
//             slide.className = 'artist-slide';
//             slide.innerHTML = `
//             <img src="${song.artworkUrl100.replace('100x100', '400x400')}" alt="${song.trackName}">
//             <div class="artist-info">
//                 <h2>${song.trackName}</h2>
//                 <p>Artist: ${song.artistName}</p>
//                 <p>Album: ${song.collectionName}</p>
//             </div>
//             `;
//             slideContainer.appendChild(slide);
//         }
//     })
// })

function searchMusic(){
    const input = document.getElementById('searchInput').value;
    const results = document.getElementById('results');
    const loading = document.getElementById('loading');

    results.innerHTML = '';
    loading.textContent = 'Searching...'; // laat zoek-tekst zien

    if (!input){ // als er geen input is
        loading.textContent = 'Please enter a search term.';
        return;
    }

    // API-aanroep
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(input)}&media=music&limit=12`)
    .then(response => response.json()) // verwerk de JSON-respons
    .then(data => { // verwerk de data
        loading.textContent = ''; // verwijder zoek-tekst
        if (data.results.length === 0) { // als er geen resultaten zijn
            results.innerHTML = '<p>No results found.</p>';
            return;
        }

        data.results.forEach(song => { // loop door de resultaten
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
            <img src="${song.artworkUrl100.replace('100x100', '400x400')}" alt="${song.trackName}">
            <h3 class="songTitle">${song.trackName}</h3>
            <p class="artist" data-artist="${song.artistName}">${song.artistName}</p>
            <p>Album: ${song.collectionName}</p>
            <audio controls>
                <source src="${song.previewUrl}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
            `;

            results.appendChild(card);
        })

        // laat meer van zelfde artiest zien..
        document.querySelectorAll('.artist').forEach(artistEl => {
            artistEl.addEventListener('click', () => {
                
                const artist = artistEl.getAttribute('data-artist');
                searchMusic(artist);
            })
        })


    })
    .catch(err => {
        console.error(err);
        loading.textContent = 'An error occurred while fetching data.';
    })
}

// Event listener voor de zoekknop
document.getElementById('searchInput').addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        searchMusic();
    }
})
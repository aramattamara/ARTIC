document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch data from the API
    async function fetchData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Function to generate an HTML list from an array of items
    function generateListArtworks(artwork, images) {
        return `<ul>${items.map((item, index) => {
            const imageUrl = `src="${images[index]}"`;
            return `<li>
                    <img ${imageUrl} alt="${item}" width="200">
                    <p>${item}</p>
                </li>`;
        }).join('')}</ul>`;
       }

    function generateListArtist(cleanArtistsData) {
        return `<ul>${cleanArtistsData.map((item) => {
            const title = item.title
            const birthDate = item.birth_date ? `<span class="date">Birth Date: ${item.birth_date}</span>` : '';
            const deathDate = item.death_date ? `<span class="date">Death Date: ${item.death_date}</span>` : '';
            
            return `<li>
                        <p>${title} ${birthDate} ${deathDate}</p>
                    </li>`;
        }).join('')}</ul>`;
    }

    // Function to update the main content
    function updateContent(content) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = content;
    }

    // Event listeners for navigation links
    const artworksLink = document.querySelector('a[href="#artworks"]');
    const artistsLink = document.querySelector('a[href="#artists"]');

    artworksLink.addEventListener('click', async () => {
        const artworksData = await fetchData('https://api.artic.edu/api/v1/artworks');
        // // Customize this part to display relevant artwork data
        console.log(artworksData)
        // const artworkTitles = artworksData.data.map(artwork => artwork.title);
        const artworkData = artworksData.data
        const artworkImage = artworksData.data.map(artwork => `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`);
        const content = `<h2>Artworks</h2>${generateListArtworks(artworkData, artworkImage)}`;
        updateContent(content);
    });

    artistsLink.addEventListener('click', async () => {
        const artistsData = await fetchData('https://api.artic.edu/api/v1/agents');
        const cleanArtistsData = artistsData.data
        const content = `<h2>Artists</h2>${generateListArtist(cleanArtistsData)}`;
        updateContent(content);
    });

    // Initial content on page load
    artworksLink.click();
});

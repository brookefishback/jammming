let accessToken = undefined;
let expiresIn = undefined;
const redirectUri = 'http://localhost:3000/';
const clientId = 'ffc99a15c9364607927ed84cf973030d';
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}`;


const Spotify = {
    getAccessToken() {
      if(accessToken){
        return accessToken;
      }
      const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
      const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

      if(urlAccessToken && urlExpiresIn){
         expiresIn = urlExpiresIn[1];
        accessToken = urlAccessToken[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    }else{
       window.location = spotifyUrl;
  }
},

search(term) {
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
    return fetch(searchUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        })
      });
  },

  savePlaylist(name, trackURIs) {
    if(!name || !trackURIs) return;

      const currentUser = 'https://api.spotify.com/v1/me';
      const headers = {
        Authorization: `Bearer ${accessToken}`
      };
      let userId = undefined;
      let playlistId = undefined;

      fetch(currentUser, {
        headers: headers
      })
      .then(response => response.json())
      .then(jsonResponse => userId = jsonResponse.id)
      .then(() => {
        const createPlayListURL = `https://api.spotify.com/v1/users/${userId}/playlists`;
        fetch(createPlayListURL, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            name: name
          })
        })
        .then(response => response.json())
        .then(jsonResponse => playlistId = jsonResponse.id)
        .then(() => {
          const addPlayListTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
          fetch(addPlayListTracksUrl , {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              uris: trackURIs
          })
        });
      })
    })
  }
}

export default Spotify;
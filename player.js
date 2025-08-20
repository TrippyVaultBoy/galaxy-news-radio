document.addEventListener('DOMContentLoaded', () => {
    // Music Player
    
    // playlists of music tracks and corresponding into and outro tracks
    const playlist = [
        { 
            name: "Maybe",
            artist: "The Ink Spots",
            song: "./audio/music/Maybe - The Ink Spots.mp3",
            intro: "./audio/intros/maybe_intro.mp3",
            outro: "./audio/outros/maybe_outro.mp3",
            image: "./images/artists/ink_spots.jpg",
            alt: "The Ink Spots",
        },
        { 
            name: "Mighty Mighty Man",
            artist: "Roy Brown",
            song: "./audio/music/Mighty Mighty Man - Roy Brown.mp3",
            intro: "./audio/intros/mighty_mighty_man_intro.mp3",
            outro: "./audio/outros/mighty_mighty_man_outro.mp3",
            image: "./images/artists/Roy_brown.jpg",
            alt: "Roy Brown",
        },
        { 
            name: "Way Back Home",
            artist: "Bob Crosby & The Bobcats",
            song: "./audio/music/Way Back Home - Bob Crosby and the Bobcats.mp3",
            intro: "./audio/intros/way_back_home_intro.mp3",
            outro: "./audio/outros/way_back_home_outro.mp3",
            image: "./images/artists/Bob_Crosby.jpeg",
            alt: "Bob Crosby & The Bobcats",
        },
        {
            name: "Into Each Life Some Rain Must Fall",
            artist: "Ella Fitzgerald & The Ink Spots",
            song: "./audio/music/Into Each Life Some Rain Must Fall - Ella Fitzgerald and The Inkspots.mp3",
            intro: "./audio/intros/into_each_life_some_rain_must_fall_intro.mp3",
            outro: "./audio/outros/into_each_life_some_rain_must_fall_outro.mp3",
            image: "./images/artists/Ella_Fitzgerald.webp",
            alt: "Ella Fitzgerald & The Ink Spots",
        },
        {
            name: "Anything Goes",
            artist: "Cole Porter",
            song: "./audio/music/Anything Goes - Cole Porter.mp3",
            intro: "./audio/intros/anything_goes_intro.mp3",
            outro: "./audio/outros/anything_goes_outro.mp3",
            image: "./images/artists/Cole_Porter.jpg",
            alt: "Cole Porter",
        },
        {
            name: "I Don't Want To Set The World On Fire",
            artist: "The Ink Spots",
            song: "./audio/music/I Don't Want to Set the World on Fire - The Ink Spots.mp3",
            intro: "./audio/intros/i_dont_want_to_set_the_world_on_fire_intro.mp3",
            outro: "./audio/outros/i_dont_want_to_set_the_world_on_fire_outro.mp3",
            image: "./images/artists/ink_spots.jpg",
            alt: "The Ink Spots",
        },
    ];

    // hello tracks to play before and after each song
    const hellos = [
        "./audio/hellos/hello_0.mp3",
        "./audio/hellos/hello_1.mp3",
        "./audio/hellos/hello_2.mp3",
        "./audio/hellos/hello_3.mp3",
        "./audio/hellos/hello_4.mp3",
        "./audio/hellos/hello_5.mp3",
        "./audio/hellos/hello_6.mp3",
        "./audio/hellos/hello_7.mp3",
        "./audio/hellos/hello_8.mp3",
        "./audio/hellos/hello_9.mp3",
        "./audio/hellos/hello_10.mp3",
    ];

    // transition tracks to play after each hello
    const transitions = [
        "./audio/transitions/transition_0.mp3",
        "./audio/transitions/transition_1.mp3",
    ];

    const player = document.getElementById("audioPlayer");
    player.setAttribute('playsinline', '');
    player.setAttribute('webkit-playsinline', '');

    const playButton = document.getElementById("play_pause_button");
    const muteButton = document.getElementById("muteButton");
    const volumeSlider = document.getElementById("volumeSlider");

    let tempVolume;

    let currentTrack = null;
    let segmentQueue = []; //intro, song, outro
    let isPlaying = false;

    // Fetches next track
    function getRandomTrack(exclude) {
        let next;
        do {
            next = playlist[Math.floor(Math.random() * playlist.length)];
        } while (next === exclude && playlist.length > 1) {
            return next;
        }
    }

    // Builds each segemnt of hello, transition, track intro, track and track outro
    function buildSegment(track) {
        let hello = hellos[Math.floor(Math.random() * hellos.length)];
        let transition = transitions[Math.floor(Math.random() * transitions.length)];

        segmentQueue = [hello, transition, track.intro, track.song, track.outro];
    }

    // Updates the music player with current track metadata
    function updateTrackInfo(track) {
        const name = document.getElementById("track_title");
        const artist = document.getElementById("track_artist");
        const image = document.getElementById("artist_img");

        name.textContent = track.name;
        artist.textContent = track.artist;
        image.src = track.image;
        image.alt = track.alt;

        console.log("Now playing:", track.name, "by", track.artist);
    }

    // Plays the next track in the segment
    function playNextInQueue() {
        if (segmentQueue.length === 0) {
            currentTrack = getRandomTrack(currentTrack);
            buildSegment(currentTrack);
            updateTrackInfo(currentTrack);
        }

        // If hello has played update track info
        if (segmentQueue.length === 3) {
            updateTrackInfo(currentTrack);
        }

        const next = segmentQueue.shift();
        player.src = next;
        player.play();
    }

    // Initializes audio context for apple devices
    function initAudioContext() {
        // Create and resume AudioContext on user interaction
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    }
   
    // Play button event listeners
    playButton.addEventListener('click', () => {
        initAudioContext();
        if (!isPlaying) {
            currentTrack = getRandomTrack(null);
            buildSegment(currentTrack);
            playNextInQueue();
            playButton.style.backgroundImage = "url('./images/icons/pause-button.png')";
            isPlaying = true;
        } else if (player.paused) {
            player.play();
            playButton.style.backgroundImage = "url('./images/icons/pause-button.png')";
        } else {
            player.pause();
            playButton.style.backgroundImage = "url('./images/icons/play-button.png')";
        }
    });

    // Player event listeners
    player.addEventListener('ended', () => {
        playNextInQueue();
    });

    // Mute button event listeners
    muteButton.addEventListener('click', () => {
        if (player.muted) {
            player.muted = false;
            muteButton.style.backgroundImage = "url('./images/icons/volume.png')";
            volumeSlider.value = tempVolume;
            document.getElementById("volumeSlider").disabled = false;
            console.log("Player unmuted");
        } else if (!player.muted) {
            player.muted = true;
            muteButton.style.backgroundImage = "url('./images/icons/mute.png')";
            tempVolume = volumeSlider.value;
            volumeSlider.value = 0;
            document.getElementById("volumeSlider").disabled = true;
            console.log("Player muted");
        }
    });

    // Volume slider event listeners
    volumeSlider.addEventListener('input', () => {
        const volume = parseFloat(volumeSlider.value);
        player.volume = Math.min(Math.max(volume, 0), 1);
        tempVolume = player.volume;
    });
})
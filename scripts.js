document.addEventListener('DOMContentLoaded', () => {
    // Music Player
    const playlist = [
        { 
            name: "Maybe",
            artist: "The Ink Spots",
            song: "./audio/music/Maybe - The Ink Spots.mp3",
            intro: "./audio/intros/maybe_intro.ogg",
            outro: "./audio/outros/maybe_outro.ogg",
            image: "./images/artists/ink_spots.jpg",
        },
        { 
            name: "Mighty Mighty Man",
            artist: "Roy Brown",
            song: "./audio/music/Mighty Mighty Man - Roy Brown.mp3",
            intro: "./audio/intros/mighty_mighty_man_intro.ogg",
            outro: "./audio/outros/mighty_mighty_man_outro.ogg",
            image: "./images/artists/Roy_brown.jpg",
        },
        { 
            name: "Way Back Home",
            artist: "Bob Crosby & The Bobcats",
            song: "./audio/music/Way Back Home - Bob Crosby and the Bobcats.mp3",
            intro: "./audio/intros/way_back_home_intro.ogg",
            outro: "./audio/outros/way_back_home_outro.ogg",
            image: "./images/artists/Bob_Crosby.jpeg",
        },
        {
            name: "Into Each Life Some Rain Must Fall",
            artist: "Ella Fitzgerald & The Ink Spots",
            song: "./audio/music/Into Each Life Some Rain Must Fall - Ella Fitzgerald and The Inkspots.mp3",
            intro: "./audio/intros/into_each_life_some_rain_must_fall_intro.ogg",
            outro: "./audio/outros/into_each_life_some_rain_must_fall_outro.ogg",
            image: "./images/artists/Ella_Fitzgerald.webp",
        },
        {
            name: "Anything Goes",
            artist: "Cole Porter",
            song: "./audio/music/Anything Goes - Cole Porter.mp3",
            intro: "./audio/intros/anything_goes_intro.ogg",
            outro: "./audio/outros/anything_goes_outro.ogg",
            image: "./images/artists/Cole_Porter.jpg",
        },
        {
            name: "I Don't Want To Set The World On Fire",
            artist: "The Ink Spots",
            song: "./audio/music/I Don't Want to Set the World on Fire - The Ink Spots.mp3",
            intro: "./audio/intros/i_dont_want_to_set_the_world_on_fire_intro.ogg",
            outro: "./audio/outros/i_dont_want_to_set_the_world_on_fire_outro.ogg",
            image: "./images/artists/ink_spots.jpg",
        },
    ];

    const player = document.getElementById("audioPlayer");
    const playButton = document.getElementById("play_pause_button");
    const muteButton = document.getElementById("muteButton");
    const volumeSlider = document.getElementById("volumeSlider");

    let currentTrack = null;
    let segmentQueue = []; //intro, song, outro
    let isPlaying = false;

    function getRandomTrack(exclude) {
        let next;
        do {
            next = playlist[Math.floor(Math.random() * playlist.length)];
        } while (next === exclude && playlist.length > 1) {
            return next;
        }
    }

    function buildSegment(track) {
        segmentQueue = [track.intro, track.song, track.outro];
    }

    function updateTrackInfo(track) {
        const name = document.getElementById("track_title");
        const artist = document.getElementById("track_artist");
        const image = document.getElementById("artist_img");

        name.textContent = track.name;
        artist.textContent = track.artist;
        image.src = track.image;

        console.log("Now playing:", track.name, "by", track.artist);
    }

    function playNextInQueue() {
        if (segmentQueue.length === 0) {
            currentTrack = getRandomTrack(currentTrack);
            buildSegment(currentTrack);
            updateTrackInfo(currentTrack);
        }

        updateTrackInfo(currentTrack);
        const next = segmentQueue.shift();
        player.src = next;
        player.play();
    }

    playButton.addEventListener('click', () => {
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

    player.addEventListener('ended', () => {
        playNextInQueue();
    });

    muteButton.addEventListener('click', () => {
        if (player.muted) {
            player.muted = false;
            muteButton.style.backgroundImage = "url('./images/icons/volume.png')";
        } else {
            player.muted = true;
            muteButton.style.backgroundImage = "url('./images/icons/mute.png')";
        }
    });

    volumeSlider.addEventListener('input', () => {
        player.volume = volumeSlider.value;
    });
})
const sanitize = require('sanitize-filename');
const prompt = require('prompt-sync')();
const colors = require('colors');
const ytdl = require('ytdl-core');

const fs = require('fs');

const main = async function(url, type) {
    if (!ytdl.validateURL(url)) throw new Error();

    const safeName = sanitize(await( await ytdl.getBasicInfo(url) ).videoDetails.title);

    if (type === "mp3")        ytdl(url, { filter: "audioonly" } ).pipe( fs.createWriteStream( `${safeName}.mp3` ) );
    else if (type === "mp4")   ytdl(url).pipe( fs.createWriteStream( `${safeName}.mp4` ) );
    else                        console.warn(`Error: invalid type: ${type}`);
};

console.log('YouTube Downloader'.red.bold);
console.log('Made by https://github.com/zihasz/');
console.log('zihasz#1210');

const videoUrl = prompt('Whats the URL of the video? '.green);
const videoType = prompt('What format do you want the donwload in? (mp3/mp4) '.green);
main(videoUrl, videoType);
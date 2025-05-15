# Hottest Hundred Heardle Backend

## Introduction

This is the backend for Hottest Hundred Heardle, a web app inspired by the now-defunct music guessing game Heardle, and featuring songs that have featured in Triple J's Hottest 100. The backend will be used to provide song data to the app.

## Table of Contents
- [1 - Architecture](#1---architecture)
  - [1.1 - Render](#11---render)
  - [1.2 - TypeScript](#12---typescript)
  - [1.3 - Jest](#13---jest)
- [2 - CI/CD](#2---cicd)
  - [2.1 - Automated Testing](#21---automated-testing)
  - [2.2 - Automated Deployment](#22---automated-deployment)
- [3 - Data](#3---data)
  - [3.1 - Tracks](#31---tracks)
  - [3.2 - tracks.json](#32---tracksjson)
  - [3.3 - defaults.json](#33---defaultsjson)
  - [3.4 - track-info.json](#34---track-infojson)
- [4 - Endpoints](#4---endpoints)
  - [4.1 - current-song](#41---current-song)


## 1 - Architecture

### 1.1 - Render

Render is used to host the backend.

### 1.2 - TypeScript

The backend features a REST api written in TypeScript, which is hosted on Render.

### 1.3 - Jest

The tests for the typescript files are handled by Jest.

## 2 - CI/CD

This project features a [CI/CD pipeline](.github/workflows/test-deploy.yml) that runs through Github Actions. In order to conserve CI/CD minutes, it is set to run on pull requests and pushes to main.

### 2.1 - Automated Testing

The CI/CD pipeline is set to run the tests provided in the [tests folder](test/). Tests are set to run on pull requests and pushes to main.

### 2.2 - Automated Deployment

The CI/CD pipeline is set to deploy to Render if all tests pass. This is set only on pushes to main.

## 3 - Data

### 3.1 - Tracks

mp3 files for tracks are stored in the [Tracks folder](/Tracks/); 6 mp3 clips are stored in a subfolder of the artist and then title of the song.

```
Tracks
└── <artist>
  └── <title>
    ├── clip1.mp3
    ├── clip2.mp3
    ├── clip3.mp3
    ├── clip4.mp3
    ├── clip5.mp3
    └── clip6.mp3
```

### 3.2 - tracks.json

Track information is stored in [tracks.json](data/tracks.json), with the date the song is chosen as the key - the appropriate song should be accessed by using the current date as the key.

| Key                   | Value  | Description                     |
| --------------------- | ------ | ------------------------------- |
| year                  | object | year song is chosen             |
| year.month            | object | month song is chosen            |
| year.month.day        | object | day of the month song is chosen |
| year.month.day.artist | string | the artist of the song          |
| year.month.day.title  | string | the title of the song           |

### 3.3 - defaults.json

[defaults.json](data/defaults.json) stores a default track for each day of the month in the event that one was not specified for a given date in [tracks.json](#32---tracksjson).

| Key        | Type   | Description                     |
| ---------- | ------ | ------------------------------- |
| day        | object | day of the month song is chosen |
| day.artist | string | the artist of the song          |
| day.title  | string | the title of the song           |

### 3.4 - track-info.json

Additional data for answers is stored in [track-info.json](data/track-info.json).

| Key                | Type   | Description                |
| ------------------ | ------ | -------------------------- |
| artist             | object | artist of the song         |
| artist.title       | object | title of the song          |
| artist.title.year  | number | year song was in countdown |
| artist.title.place | number | song's place in countdown  |

## 4 - Endpoints

### 4.1 - current-song

/api/current-song

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Query Parameters</th>
      <th>Request Body</th>
      <th>Response Body</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="vertical-align:top">GET</td>
      <td style="vertical-align:top">None</td>
      <td style="vertical-align:top">None</td>
      <td>
        <ul>
          <li>title: string (the title of the song)</li>
          <li>artist: string (the artist of the song)</li>
          <li>place: int (position of the song in the hottest hundred)</li>
          <li>year: int (year song was in hottest hundred)</li>
        </ul>  
      </td>
    </tr>
  </tbody>
</table>

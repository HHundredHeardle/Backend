# Hottest Hundred Heardle Backend

## Introduction

This is the backend for Hottest Hundred Heardle, a web app inspired by the now-defunct music guessing game Heardle, and featuring songs that have featured in Triple J's Hottest 100. The backend will be used to store user data including statistics such as streaks, as well as data for the current day's song.

## Table of Contents
- [1 - Architecture](#1---architecture)
  - [1.1 - Render](#11---render)
  - [1.2 - TypeScript](#12---typescript)
  - [1.3 - Redis](#13---redis)
  - [1.4 - Jest](#14---jest)
- [2 - CI/CD](#2---cicd)
  - [2.1 - Automated Testing](#21---automated-testing)
  - [2.2 - Automated Deployment](#22---automated-deployment)
- [3 - Database Layout](#3---database-layout)
- [4 - Endpoints](#4---endpoints)
  - [4.1 - current-song](#41---current-song)


## 1 - Architecture

### 1.1 - Render

Render is used to host the backend.

### 1.2 - TypeScript

The backend features a REST api written in TypeScript, which is hosted on Render.

### 1.3 - Redis

The data for the backend is stored in a Redis database provided by Render.

### 1.4 - Jest

The tests for the typescript files are handled by Jest.

## 2 - CI/CD

This project features a [CI/CD pipeline](.github/workflows/test-deploy.yml) that runs through Github Actions. In order to conserve CI/CD minutes, it is set to run on pull requests and pushes to main.

### 2.1 - Automated Testing

The CI/CD pipeline is set to run the tests provided in the [tests folder](test/). Tests are set to run on pull requests and pushes to main.

### 2.2 - Automated Deployment

The CI/CD pipeline is set to deploy to Render if all tests pass. This is set only on pushes to main.

## 3 - Database Layout

Representation of key format in the database

    { 
        tracks : {
            default : {
                day : {
                    title : string,
                    artist : string,
                    place : int,
                    year : int,
                    clip1 : mp3 binary,
                    clip2 : mp3 binary,
                    clip3 : mp3 binary,
                    clip4 : mp3 binary,
                    clip5 : mp3 binary,
                    clip6 : mp3 binary
                }
            },
            daily :  {
                date : {
                    title : string,
                    artist : string,
                    place : int,
                    year : int,
                    clip1 : mp3 binary,
                    clip2 : mp3 binary,
                    clip3 : mp3 binary,
                    clip4 : mp3 binary,
                    clip5 : mp3 binary,
                    clip6 : mp3 binary
                }
            },
        },
        answers : {
            artist : [string]
        }
    }

## 4 - Endpoints

### 4.1 - current-song

/api/current-song

<table><thead>
  <tr>
    <th>Method</th>
    <th>Query Parameters</th>
    <th>Request Body</th>
    <th>Response Body</th>
  </tr></thead>
<tbody>
  <tr>
    <td style="vertical-align:top">GET</td>
    <td style="vertical-align:top">None</td>
    <td style="vertical-align:top">None</td>
    <td>
      <ul>
        <li>title : string (the title of the song)</li>
        <li>artist : string (the artist of the song)</li>
        <li>place : int (position of the song in the hottest hundred)</li>
        <li>year : int (year song was in hottest hundred)</li>
        <li>clip1 : mp3 binary (1st audio clip of song)</li>
        <li>clip2 : mp3 binary (2nd audio clip of song)</li>
        <li>clip3 : mp3 binary (3rd audio clip of song)</li>
        <li>clip4 : mp3 binary (4th audio clip of song)</li>
        <li>clip5 : mp3 binary (5th audio clip of song)</li>
        <li>clip6 : mp3 binary (6th audio clip of song)</li>
      </ul>  
    </td>
  </tr>
</tbody>
</table>

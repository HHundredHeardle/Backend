# Hottest Hundred Heardle Backend

## Introduction

This is the backend for Hottest Hundred Heardle, a web app inspired by the now-defunct music guessing game Heardle, and featuring songs that have featured in Triple J's Hottest 100. The backend will be used to store user data including statistics such as streaks, as well as data for the current day's song.

## Table of Contents
- [1 - Architecture](#1---architecture)
  - [1.1 - Render](#11---render)
  - [1.2 - TypeScript](#12---typescript)
  - [1.3 - PostgreSQL](#13---postgresql)
  - [1.4 - Jest](#14---jest)
- [2 - CI/CD](#2---cicd)
  - [2.1 - Automated Testing](#21---automated-testing)
  - [2.2 - Automated Deployment](#22---automated-deployment)
- [3 - Database Layout](#3---database-layout)
  - [3.1 - tracks](#31---tracks)
  - [3.2 - answers](#32---answers)
  - [3.3 - daily-tracks](#33---daily-tracks)
  - [3.4 - default-tracks](#34---default-tracks)
- [4 - Endpoints](#4---endpoints)
  - [4.1 - current-song](#41---current-song)


## 1 - Architecture

### 1.1 - Render

Render is used to host the backend.

### 1.2 - TypeScript

The backend features a REST api written in TypeScript, which is hosted on Render.

### 1.3 - PostgreSQL

The data for the backend is stored in a PostgreSQL database provided by Render.

### 1.4 - Jest

The tests for the typescript files are handled by Jest.

## 2 - CI/CD

This project features a [CI/CD pipeline](.github/workflows/test-deploy.yml) that runs through Github Actions. In order to conserve CI/CD minutes, it is set to run on pull requests and pushes to main.

### 2.1 - Automated Testing

The CI/CD pipeline is set to run the tests provided in the [tests folder](test/). Tests are set to run on pull requests and pushes to main.

### 2.2 - Automated Deployment

The CI/CD pipeline is set to deploy to Render if all tests pass. This is set only on pushes to main.

## 3 - Database Layout

### 3.1 - tracks

Data for each song

| Column Name      | Data Type      | Constraints                                 | Description                        |
| ---------------- | -------------- | ------------------------------------------- | ---------------------------------- |
| `id`             | `INTEGER`      | `PRIMARY KEY`, `AUTO_INCREMENT`, `NOT NULL` | Unique identifier for each track   |
| `artist`         | `VARCHAR(255)` | `NOT NULL`                                  | Artist of track                    |
| `title`          | `VARCHAR(255)` | `NOT NULL`                                  | Title of track                     |
| `countdown_year` | `SMALLINT`     | `NOT NULL`                                  | Year of hottest hundred countdown  |
| `place`          | `SMALLINT`     | `NOT NULL`                                  | Place in hottest hundred countdown |
| `clip1`          | `BYTEA`        | `NOT NULL`                                  | 1st audio clip of track            |
| `clip2`          | `BYTEA`        | `NOT NULL`                                  | 2nd audio clip of track            |
| `clip3`          | `BYTEA`        | `NOT NULL`                                  | 3rd audio clip of track            |
| `clip4`          | `BYTEA`        | `NOT NULL`                                  | 4th audio clip of track            |
| `clip5`          | `BYTEA`        | `NOT NULL`                                  | 5th audio clip of track            |
| `clip6`          | `BYTEA`        | `NOT NULL`                                  | 6th audio clip of track            |

### 3.2 - answers

List of possible answers

| Column Name | Data Type      | Constraints                                 | Description                       |
| ----------- | -------------- | ------------------------------------------- | --------------------------------- |
| `id`        | `INTEGER`      | `PRIMARY KEY`, `AUTO_INCREMENT`, `NOT NULL` | Unique identifier for each answer |
| `artist`    | `VARCHAR(255)` | `NOT NULL`                                  | Artist of track                   |
| `title`     | `VARCHAR(255)` | `NOT NULL`                                  | Title of track                    |

### 3.3 - daily-tracks

Chosen tracks for specific days

| Column Name | Data Type | Constraints               | Description                                     |
| ----------- | --------- | ------------------------- | ----------------------------------------------- |
| `date`      | `DATE`    | `PRIMARY KEY`, `NOT NULL` | Date track is played on                         |
| `track`     | `INTEGER` | `FOREIGN KEY`,`NOT NULL`  | id of track (references [tracks](#31---tracks)) |

### 3.4 - default-tracks

Default tracks for each day of the month

| Column Name | Data Type  | Constraints               | Description                                     |
| ----------- | ---------- | ------------------------- | ----------------------------------------------- |
| `date`      | `SMALLINT` | `PRIMARY KEY`, `NOT NULL` | Day track is played on                          |
| `track`     | `INTEGER`  | `FOREIGN KEY`,`NOT NULL`  | id of track (references [tracks](#31---tracks)) |

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
        <li>countdown_year : int (year song was in hottest hundred)</li>
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

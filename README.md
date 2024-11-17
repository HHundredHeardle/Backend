# Hottest Hundred Heardle Backend

## Introduction

This is the backend for Hottest Hundred Heardle, a web app inspired by the now-defunct music guessing game Heardle, and featuring songs that have featured in Triple J's Hottest 100. The backend will be used to store user data including statistics such as streaks, as well as data for the current day's song.

## Table of Contents
- [1 - Architecture](#1---architecture)
  - [1.1 - Render](#11---render)
  - [1.2 - TypeScript](#12---typescript)
  - [1.3 - Redis](#13---redis)


## 1 - Architecture

### 1.1 - Render

Render is used to host the backend.

### 1.2 - TypeScript

The backend features a REST api written in TypeScript, which is hosted on Render.

### 1.3 - Redis

The data for the backend is stored in a Redis database provided by Render.

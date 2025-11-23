# Vehicle Renting App

A simple, mobile vehicle renting application built with React Native and Expo. This repository contains the frontend app (TypeScript + Expo) that lets users browse, post, filter, and contact owners for vehicles available for rent.

**Tech stack:**
- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **Styling:** Tailwind and custom styles

## Features
- Browse available vehicles on the home screen
- View vehicle details and contact owner 
- Post a new vehicle listing 
- Save favorites 
- Filter listings using a modal 
- User profile and onboarding screens

## Project structure (key files)
- `App.tsx` — App entry
- `Home.tsx` — Home / listing screen
- `VehicleDetailsPage.tsx` — Vehicle detail view
- `PostVehiclePage.tsx` — Form to post vehicles
- `ProfilePage.tsx` — User profile
- `FavoritesPage.tsx` — Saved vehicles
- `FilterModal.tsx` — Listing filters
- `ContactDetailsPage.tsx` — Contact owner flow
- `assets/` — Images and static assets
- `package.json` — scripts and dependencies

## Prerequisites
- Node.js (16+ recommended)
- npm or yarn
- Expo CLI (optional globally) — you can use `npx expo` instead

## Setup (Windows PowerShell)
1. Install dependencies:

```powershell
npm install
# or
yarn install
```

2. Start the development server:

```powershell
npx expo start
# or if you have npm script, use
# npm run start
```

3. Open the project on your device:
- Scan the QR code with the Expo Go app (Android/iOS) or run on an emulator.

## Useful scripts
- `npm start` — Start Expo dev server
- `npm run ios` / `npm run android` — Platform-specific commands if configured in `package.json`

## Note
- If you see issues with `expo` commands, try clearing Metro's cache:

```powershell
npx expo start -c
```



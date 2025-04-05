# Offline Todo App

A modern, offline-capable todo list application built with Expo, TypeScript, Redux Toolkit, and SQLite. This app allows users to create, read, update, and delete (CRUD) todos with an attractive UI, animations, and a confirmation dialog for deletions. New and updated todos appear at the top of the list for better visibility.

## Features

- **Offline Functionality**: Works without an internet connection using SQLite for local storage.
- **CRUD Operations**:
  - **Create**: Add new todos with a title and optional description.
  - **Read**: View all todos in a list, with new/updated items at the top.
  - **Update**: Edit existing todos and move them to the top of the list.
  - **Delete**: Remove todos with a confirmation dialog.
- **Attractive UI**:
  - Material Design-inspired styling with gradients, shadows, and rounded corners.
  - Custom buttons for save, edit, and delete with `LinearGradient` and icons.
- **Animations**:
  - Fade-in effects for list items and headers.
  - Bounce-in animations for action buttons.
  - Pulse animation on save/update buttons.
  - Scale animation on button press.
- **TypeScript**: Fully typed for better development experience and error prevention.
- **Redux Toolkit**: State management for todos with type-safe reducers and actions.
- **Expo Router**: File-based routing for navigation (`index.tsx`, `add.tsx`, `edit.tsx`).

## Tech Stack

- **Expo**: Framework for building React Native apps (SDK 51).
- **React Native**: UI framework.
- **TypeScript**: Static typing.
- **Redux Toolkit**: State management.
- **Expo SQLite**: Local database for offline storage.
- **Expo Router**: Navigation.
- **Expo Vector Icons**: Icon library.
- **Expo Linear Gradient**: Gradient buttons.
- **React Native Animatable**: Animations.
- **Formik & Yup**: Form handling and validation.

## Prerequisites

- Node.js (v16 or later)
- npm or Yarn
- Expo CLI (`npm install -g expo-cli`)
- An iOS/Android emulator or physical device with the Expo Go app

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

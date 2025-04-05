import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { SQLiteProvider } from "expo-sqlite";
import { initDB } from "../db/sqlite";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SQLiteProvider databaseName="todoDB.db" onInit={initDB}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Todos",
              headerStyle: { backgroundColor: "#6200ee" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="add"
            options={{
              title: "Add Todo",
              headerStyle: { backgroundColor: "#6200ee" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="edit"
            options={{
              title: "Edit Todo",
              headerStyle: { backgroundColor: "#6200ee" },
              headerTintColor: "#fff",
            }}
          />
        </Stack>
      </SQLiteProvider>
    </Provider>
  );
}

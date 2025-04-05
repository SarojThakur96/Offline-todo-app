import React, { useEffect } from "react";
import { FlatList, TouchableOpacity, View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setTodos } from "@/redux/todoSlice";
import TodoItem from "@/components/TodoItem";

import { RootState, AppDispatch } from "@/redux/store";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { Href, Link } from "expo-router";
import { getTodos } from "@/db/sqlite";
import { RootStackParamList } from "@/types/navigation";
const HomeScreen: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.items);
  const dispatch = useDispatch<AppDispatch>();
  const db = useSQLiteContext();

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const todoList = await getTodos(db);
    dispatch(setTodos(todoList));
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInDown"
        duration={1000}
        style={styles.header}
      >
        <Ionicons name="list" size={30} color="#fff" />
      </Animatable.View>

      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <Animatable.View
            animation="fadeInUp"
            duration={800}
            delay={index * 100}
          >
            <TodoItem todo={item} />
          </Animatable.View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />

      <Animatable.View
        animation="bounceIn"
        duration={1000}
        style={styles.fabContainer}
      >
        <Link href={"/add"} asChild>
          <TouchableOpacity style={styles.fab}>
            <Ionicons name="add" size={30} color="#fff" />
          </TouchableOpacity>
        </Link>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    backgroundColor: "#6200ee",
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  list: { padding: 16 },
  fabContainer: { position: "absolute", bottom: 20, right: 20 },
  fab: {
    backgroundColor: "#6200ee",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default HomeScreen;

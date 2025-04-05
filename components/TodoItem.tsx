import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { Todo, deleteTodo as dbDeleteTodo } from "../db/sqlite";
import { removeTodo } from "../redux/todoSlice";
import { AppDispatch } from "../redux/store";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { Link } from "expo-router";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch<AppDispatch>();
  const db = useSQLiteContext();

  const handleDelete = () => {
    // Show confirmation dialog
    Alert.alert(
      "Delete Todo",
      `Are you sure you want to delete "${todo.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await dbDeleteTodo(db, todo.id);
            dispatch(removeTodo(todo.id));
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Animatable.View animation="fadeIn" duration={500} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{todo.title}</Text>
        <Text style={styles.description}>{todo.description}</Text>
      </View>
      <View style={styles.actions}>
        <Link
          href={{
            pathname: "/edit",
            params: {
              id: todo.id.toString(),
              title: todo.title,
              description: todo.description,
            },
          }}
          asChild
        >
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={16} color="#6200ee" />
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash" size={16} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  editButton: {
    padding: 8,
    backgroundColor: "#f3f3f3",
    borderRadius: 1000,
  },
  deleteButton: {
    padding: 8,
    backgroundColor: "#f3f3f3",
    borderRadius: 1000,
  },
});

export default TodoItem;

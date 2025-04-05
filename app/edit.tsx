import React from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { updateTodo } from "@/redux/todoSlice";
import { updateTodo as dbUpdateTodo, getTodos, Todo } from "@/db/sqlite";
import { AppDispatch } from "@/redux/store";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

interface FormValues {
  id: number;
  title: string;
  description: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
});

const EditScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const db = useSQLiteContext();
  const router = useRouter();
  const { id, title, description } = useLocalSearchParams(); // Get todo data from params

  const initialValues: FormValues = {
    id: Number(id),
    title: (title as string) || "",
    description: (description as string) || "",
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    await dbUpdateTodo(db, values.id, values.title, values.description);

    const todos = await getTodos(db);
    const updatedTodo = todos.find((todo) => todo.id === values.id);
    if (updatedTodo) {
      dispatch(updateTodo(updatedTodo)); // Dispatch with full Todo object including timestamp
    }
    resetForm();
    router.back();
  };

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInDown"
        duration={800}
        style={styles.header}
      >
        <Ionicons name="pencil" size={30} color="#fff" />
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        duration={800}
        delay={200}
        style={styles.formContainer}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Title"
                placeholderTextColor="#999"
                onChangeText={handleChange("title")}
                value={values.title}
              />
              {touched.title && errors.title && (
                <Text style={styles.error}>{errors.title}</Text>
              )}

              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Description"
                placeholderTextColor="#999"
                onChangeText={handleChange("description")}
                value={values.description}
                multiline
              />
              <Animatable.View
                animation="pulse"
                duration={300}
                style={styles.buttonContainer}
              >
                <TouchableOpacity onPress={() => handleSubmit()}>
                  <LinearGradient
                    colors={["#6200ee", "#8a4af3"]}
                    style={styles.updateButton}
                  >
                    <Ionicons name="checkmark" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Update</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animatable.View>
            </View>
          )}
        </Formik>
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
  formContainer: { padding: 16, marginTop: 20 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonContainer: { alignItems: "center" },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: "#6200ee",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  descriptionInput: { height: 100, textAlignVertical: "top" },
  error: { color: "#ff4444", marginBottom: 12, marginLeft: 8, fontSize: 14 },
});

export default EditScreen;

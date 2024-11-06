import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addTask, removeTask } from "../store/tasksSlice";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const TaskManager = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const titleRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleAddTask = () => {
    if (title && description) {
      dispatch(addTask({ title, description }));
      setTitle("");
      setDescription("");
      titleRef.current?.focus();
    }
  };

  const handleRemoveTask = (id: string) => {
    dispatch(removeTask(id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputs}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.label}>Name:</Text>
              <TextInput
                ref={titleRef}
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                onSubmitEditing={() => descriptionRef.current?.focus()}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.label}>Descr:</Text>
              <TextInput
                ref={descriptionRef}
                style={styles.input}
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>
          <View style={styles.addButtonContainer}>
            <Button title="Add" onPress={handleAddTask} color="#00008B" />
          </View>
        </View>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <View style={styles.taskTextContainer}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.dot} />
                <View>
                  <View style={styles.taskHeader}>
                    <Text style={styles.taskTitle}>{item.title}</Text>
                  </View>
                  <Text style={styles.taskDescription}>{item.description}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleRemoveTask(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  label: {
    fontSize: 16,
    paddingVertical: 10,
    marginRight: 5,
  },
  addButtonContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 5,
    borderRadius: 5,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
    marginRight: 10,
  },
  taskTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  taskDescription: {
    fontSize: 14,
    color: "#555",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
  },
  inputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default TaskManager;

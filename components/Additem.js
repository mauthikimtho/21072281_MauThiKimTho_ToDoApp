import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { addJob } from '../recoil/jobState';

export default function Additem({ route, navigation }) {
  const { userName } = route.params;
  const [input, setInput] = useState('');
  const addJobState = useSetRecoilState(addJob);

  const create = () => {
    if (!input) {
      Alert.alert('Error', 'Please fill in the job title field.');
      return;
    }

    const newJob = { title: input };
    addJobState(newJob);
    setInput('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userContainer}>
          <Image source={require('../assets/avata.png')} style={styles.avatar} />
          <View>
            <Text style={styles.greetingText}>Hi {userName}</Text>
            <Text style={styles.subtitle}>Have a great day ahead</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>ADD YOUR JOB</Text>
        <View style={styles.inputContainer}>
          <Image source={require('../assets/task.png')} style={styles.icon} />
          <TextInput
            placeholder="Input your job"
            style={styles.input}
            value={input}
            onChangeText={setInput}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={create}>
          <Text style={styles.submitButtonText}>FINISH ></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'space-between', padding: 8 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  userContainer: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40 ,marginRight:10},
  greetingText: { fontSize: 14, fontWeight: '700' },
  subtitle: { fontSize: 13 },
  formContainer: { alignItems: 'center', justifyContent: 'center', width: '100%', flex: 1 },
  title: { fontWeight: '700', fontSize: 25, marginBottom: 20 },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    borderColor: '#c4c4c4',
    width: '90%',
    marginBottom: 20,
  },
  input: { paddingLeft: 10, width: '90%' },
  submitButton: {
    backgroundColor: '#00bdd6',
    borderRadius: 10,
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: { color: '#ffffff', fontWeight: '500' },
  icon: { width: 20, height: 20 },
});
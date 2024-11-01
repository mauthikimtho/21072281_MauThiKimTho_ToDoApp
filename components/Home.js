import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { jobListState, deleteJob } from '../recoil/jobState';

const Item = ({ job, handleDelete }) => (
  <View style={styles.itemContainer}>
    <Image source={require('../assets/tick.png')} style={styles.icon} />
    <Text style={styles.itemText}>{job.title}</Text>
    <TouchableOpacity onPress={() => handleDelete(job.id)}>
      <Text style={styles.deleteText}>Del</Text>
    </TouchableOpacity>
  </View>
);

export default function Home({ route, navigation }) {
  const { userName } = route.params;
  const jobs = useRecoilValue(jobListState);
  const deleteJobState = useSetRecoilState(deleteJob);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (id) => {
    deleteJobState(id);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.userContainer}>
          <Image source={require('../assets/avata.png')} style={styles.avatar} />
          <View>
            <Text style={styles.greetingText}>Hi {userName}</Text>
            <Text style={styles.subtitle}>Have a great day ahead</Text>
          </View>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Image source={require('../assets/search.png')} style={styles.icon} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredJobs}
        renderItem={({ item }) => <Item job={item} handleDelete={handleDelete} />}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Additem', { userName })}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding:10
  },
  userContainer: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40,marginRight:10},
  greetingText: { fontSize: 14, fontWeight: '700' },
  subtitle: { fontSize: 13 },
  searchContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    borderColor: '#c4c4c4',
  },
  searchInput: { paddingLeft: 10, width: '90%' },
  listContainer: { padding: 10},
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#c4c4c4',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
  },
  itemText: { fontWeight: '700' },
  deleteText: { color: 'red' },
  icon: { width: 20, height: 20 },
  addButton: {
    backgroundColor: '#00bdd6',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop:10,
  },
  addButtonText: { fontSize: 30, color: '#ffffff', marginTop:-5},
});
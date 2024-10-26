import FoodListItem from '@/components/FoodListItem';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import PieChart from 'react-native-pie-chart';

const foodItems = [
    { label: 'Milk', cal: 200, brand: 'Vitalait' },
    { label: 'm9rouna', cal: 500, brand: 'randa' },
    { label: 'ba3rour', cal: 210, brand: 'Feres' },
    { label: 'mahdi', cal: 666, brand: 'rym' },

];

const Products = () => {
    const [search, setSearch] = useState('');
    
    const performSearch = () => {
        console.warn('Searching for:', search);
        setSearch('');
    };

    // Define PieChart data
    const widthAndHeight = 250;
    const series = [200, 500, 210];  
    const sliceColor = ['#C96868', '#161D6F', '#FFCE56'];

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={{ gap: 50 }}>
                <View style={{
                    backgroundColor: 'gainsboro',
                    padding: 5,
                    borderRadius: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <FontAwesome name="search" size={24} color="royalblue" style={{ padding: 10 }} />
                    <TextInput
                        value={search}
                        onChangeText={setSearch}
                        placeholder='Search...'
                        style={styles.input}
                    />
                </View>
                {search && <Button title='Search' onPress={performSearch} />}
                
                {/* Food List */}
                <FlatList 
                    data={foodItems}
                    renderItem={({ item }) => <FoodListItem item={item} />}
                    keyExtractor={(item) => item.label}
                    contentContainerStyle={{ gap: 10 }}
                />
            </View>

            {/* Pie Charts */}
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <PieChart
                        widthAndHeight={widthAndHeight}
                        series={series}
                        sliceColor={sliceColor}
                        coverRadius={0.8}
                        coverFill={'transparent'}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    input: {
        backgroundColor: 'gainsboro',
        padding: 10,
        borderRadius: 20,
    },
    title: {
        fontSize: 24,
        margin: 10,
    },
});

export default Products;

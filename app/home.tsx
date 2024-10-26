import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Alert, Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const Gender = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
];

const Home = () => {
    const [scaleValue] = useState(new Animated.Value(1)); // For button animation

    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [unit, setUnit] = useState('kg');
    const [goal, setGoal] = useState(null); // 'bulk', 'cut', 'normal'
    const animateButton = () => {
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 0.95,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };
    const calculateMacros = () => {
        animateButton(); // Start button animation
        if (!weight || !height || !age || !gender || goal === null) {
            Alert.alert("Please fill out all fields");
            return;
        }
        if (!weight || !height || !age || !gender || goal === null) {
            Alert.alert("Please fill out all fields");
            return;
        }

        const weightInKg = unit === 'lbs' ? parseFloat(weight) * 0.453592 : parseFloat(weight);
        const heightInCm = parseFloat(height);

        let BMR;
        if (gender === 'Male') {
            BMR = 10 * weightInKg + 6.25 * heightInCm - 5 * parseFloat(age) + 5;
        } else {
            BMR = 10 * weightInKg + 6.25 * heightInCm - 5 * parseFloat(age) - 161;
        }

        let dailyCalories = BMR * 1.2;
        
        // Adjust calories based on goal
        if (goal === 'bulk') {
            dailyCalories += 500;
        } else if (goal === 'cut') {
            dailyCalories -= 500;
        }

        const carbs = (dailyCalories * 0.5) / 4;
        const protein = (dailyCalories * 0.25) / 4;
        const fats = (dailyCalories * 0.25) / 9;

        Alert.alert(
            "Macro Calculation",
            `Based on your inputs:
            - Calories: ${dailyCalories.toFixed(0)} kcal
            - Carbs: ${carbs.toFixed(0)}g
            - Protein: ${protein.toFixed(0)}g
            - Fats: ${fats.toFixed(0)}g`
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {/* Add the introductory text here */}
                <Text style={styles.introText}>
                    In recent years, a dietary approach called IIFYM, or "if it fits your macros," has taken the fitness world by storm. Also known as "flexible dieting," it turns old-school, calorie-based dieting on its head by focusing instead on the amount of protein, carbohydrates, and fats making up those calories. As long as you come close to your numbers (how close remains a subject of debate), you have a lot of flexibility on what foods you can use to get there.
                </Text>
                <Text style={styles.introText}>
                    Sound a little advanced? It is. If you're wondering if this approach is right for you, trainer and health coach Sohee Lee provides guidance in her article, "To Macro or Not: Should You Track Your Macro Intake?" If you know you're ready to know your macros, the macro calculator below can help you determine your daily targets for three goals:
                </Text>
                <Text style={styles.introText}>
                    Weight loss
                    {'\n'}Weight gain
                    {'\n'}Overall health and weight maintenance
                </Text>
                <Image source={require('../assets/images/food.jpg')} style={styles.image} />

                <Text style={styles.introText}>
                    You can find in-depth explanations of our preferred macros for each goal below. And if you'd like to use the calculator to determine your targets for the macros of your choice—say, you're starting a ketogenic diet and want to know how many grams of fats make up 80 percent of your calories—click Customize My Macros to dial in your personalized numbers!
                </Text>
                <Text style={styles.title}>Calculate Your Macros</Text>
                
                <Text>Height:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Height (cm)'
                    keyboardType="numeric"
                    value={height}
                    onChangeText={setHeight}
                />
                
                <Text>Weight:</Text>
                <TextInput
                    style={styles.input}
                    placeholder={`Weight (${unit})`}
                    keyboardType="numeric"
                    value={weight}
                    onChangeText={setWeight}
                />
                
                <View style={styles.radioContainer}>
                    <TouchableOpacity
                        style={[styles.radioButton, unit === 'kg' && styles.radioSelected]}
                        onPress={() => setUnit('kg')}
                    >
                        <Text style={unit === 'kg' ? styles.radioTextSelected : styles.radioText}>kg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.radioButton, unit === 'lbs' && styles.radioSelected]}
                        onPress={() => setUnit('lbs')}
                    >
                        <Text style={unit === 'lbs' ? styles.radioTextSelected : styles.radioText}>lbs</Text>
                    </TouchableOpacity>
                </View>
                
                <Text>Age:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Age'
                    keyboardType="numeric"
                    value={age}
                    onChangeText={setAge}
                />
                
                <Text>Gender:</Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={Gender}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select Gender' : '...'}
                    value={gender}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setGender(item.value);
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() =>
                        gender === 'Male' ? (
                            <Entypo name="man" size={24} color="black" />
                        ) : gender === 'Female' ? (
                            <Ionicons name="woman" size={24} color="black" />
                        ) : (
                            <Entypo name="man" size={24} color="gray" /> 
                        )
                    }
                />
                
                {/* Goal Selection */}
                <Text>Goal:</Text>
                <View style={styles.goalContainer}>
                    <TouchableOpacity
                        style={[styles.goalButton, goal === 'Nothing' && styles.goalSelected]}
                        onPress={() => setGoal('Nothing')}
                    >
                        <Text style={goal === 'Nothing' ? styles.goalTextSelected : styles.goalText}>Nothing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.goalButton, goal === 'bulk' && styles.goalSelected]}
                        onPress={() => setGoal('bulk')}
                    >
                        <Text style={goal === 'bulk' ? styles.goalTextSelected : styles.goalText}>Bulk</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.goalButton, goal === 'cut' && styles.goalSelected]}
                        onPress={() => setGoal('cut')}
                    >
                        <Text style={goal === 'cut' ? styles.goalTextSelected : styles.goalText}>Cut</Text>
                    </TouchableOpacity>
                </View>

                <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                    <TouchableOpacity onPress={calculateMacros}>
                        <Text style={styles.buttonText}>Calculate Macros</Text>
                    </TouchableOpacity>
                </Animated.View>                
                {/* Add the additional text at the bottom */}
                <Text style={styles.questionText}>SHOULD I TRACK MY MACROS?</Text>
                <Text style={styles.bodyText}>
                    Not everybody needs to track their macronutrient intake. But plenty of people find that as their fitness and physique goals get more specific, dialing in their nutrition in this way helps them fuel their training and achieve better results. According to one expert, it can be helpful even if it's just a temporary experiment:
                    {'\n'}"I think everybody would benefit from tracking macros for at least a 3-6-month period of their life," recommends Dr. Bill Campbell director of the Performance & Physique Enhancement Laboratory at the University of South Florida, in an episode of the Bodybuilding.com Podcast. "You just learn so much about making food choices, about overeating, undereating, and hunger. Someone might not change their behavior, but they'll know, 'Oh, that doughnut is a lot different than that chicken sandwich.' Even though the calories may be the same."
                </Text>
                <Image source={require('../assets/images/cbum.jpg')} style={styles.image} />

                <Text style={styles.questionText}>DOES FLEXIBLE DIETING WORK?</Text>
                <Text style={styles.bodyText}>
                    A significant meta-study from 2020 concluded that the old-school model of restriction-based dieting, such as those that cut back on calories by minimizing carbs or fat, are largely ineffective for long-term, sustainable weight loss. This wasn't news to the thousands of frustrated dieters out there!
                    {'\n'}But is counting and balancing macronutrients any better? A study from 2005 comparing strict and flexible dieting found that people following a restrictive approach to dieting were more likely to have a higher BMI, reduced feelings of self-control, and more psychological stress related to weight and food intake. Chalk this up as another victory for IIFYM!
                    {'\n'}But don't think that just because a macro-based approach is "flexible," it's perfect. It has advantages and drawbacks like any other nutritional approach.
                </Text>
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
    scrollContainer: {
        paddingBottom: 20, // Optional for some padding at the bottom of the ScrollView
    },
    input: {
        backgroundColor: 'gainsboro',
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginVertical: 5,
    },
    title: {
        fontSize: 24,
        margin: 10,
    },
    introText: {
        fontSize: 16,
        marginVertical: 10,
        lineHeight: 24,
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    bodyText: {
        fontSize: 16,
        marginBottom: 20,
        lineHeight: 24,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginHorizontal: 5,
    },
    radioSelected: {
        backgroundColor: 'lightblue',
        borderColor: 'blue',
    },
    radioText: {
        fontSize: 16,
        color: 'gray',
    },
    radioTextSelected: {
        fontSize: 16,
        color: 'blue',
    },
    goalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    goalButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginHorizontal: 5,
    },
    goalSelected: {
        backgroundColor: 'lightgreen',
        borderColor: 'green',
    },
    goalText: {
        fontSize: 16,
        color: 'gray',
    },
    goalTextSelected: {
        fontSize: 16,
        color: 'green',
    },
    buttonText: {
        padding: 10,
        backgroundColor: 'blue',
        color: 'white',
        textAlign: 'center',
        borderRadius: 5,
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: 200,
        marginVertical: 10,
        borderRadius: 10,
    },
});

export default Home;

import {StatusBar} from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import BottomNavBar from "./components/BottomNavBar";
import React from "react";
import colors from "./style/theme";
import {LinearGradient} from 'expo-linear-gradient'
import getCategories from './entities/YCategory';
import CardXL from './entities/CardXL';
import getEvents from './entities/Yevents';

export default function App() {

    //TODO add scss implementation https://seasparta618.medium.com/how-to-integrate-scss-sass-into-react-native-c56563aa8f6e

    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.gradient_container}
                colors={[colors.darkGradientFirstColor, colors.darkGradientSecondeColor]}
                start={{x: 0, y: 0}}
                end={{x: 0.2, y: 1}}
            >
                <View style={styles.titlesAndCategories}>
                    <View>
                        <Text style={[styles.textSmall, styles.textFont]}>Hi, new user</Text>
                        <Text style={[styles.textXL, styles.textFont]}>Book a Ticket {"\n"}for your next event</Text>
                    </View>
                    <ScrollView
                        style={styles.scrollview}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContentContainer}>
                        {
                            getCategories().map((category, index) => {
                                return (
                                    <View key={index} style={styles.categoryContainer}>
                                        <Text style={styles.category}>{category.label}</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View style={styles.cardViewMainContainer}>
                    <Text style={styles.subTitleWeight}>Top Events</Text>
                    <ScrollView style={styles.xlCardScrollView}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.scrollXLContentContainer}
                    >
                        {getEvents().map((aYEvent, index) => {
                            return (
                                <CardXL key={index} label={aYEvent.label} date={aYEvent.date}
                                        image={aYEvent.image}></CardXL>
                            )
                        })}
                    </ScrollView>
                </View>
                <View style={styles.cardViewMainContainer}>
                    <Text style={styles.subTitleSlim}>Event on{"\n"}this month</Text>
                    <View>

                    </View>
                </View>
                <StatusBar style="auto"/>
                <BottomNavBar></BottomNavBar>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient_container: {
        height: '100%',
        width: '100%',
        padding: 10,
        paddingTop: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    titlesAndCategories: {
        gap: 10
    },
    textFont: {
        color: colors.white
    },
    textSmall: {
        fontSize: 14
    },
    textXL: {
        fontSize: 30,
        fontWeight: 500,
        textAlign: 'center',
    },
    subTitleWeight: {
        color: colors.primary,
        fontWeight: 700,
        fontSize: 18
    },
    subTitleSlim: {
        color: colors.primary,
        fontWeight: 500,
        fontSize: 16
    },
    scrollview: {
        flexGrow: 0,
        height: 50
    },
    scrollContentContainer: {
        height: 30,
        gap: 5
    },
    categoryContainer: {
        width: 90,
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30
    },
    category: {
        color: colors.primary,
        textAlign: 'center'
    },
    cardViewMainContainer: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    xlCardScrollView: {
        paddingTop: 10,
        height: 310,
        gap: 10
    },
    scrollXLContentContainer: {
        gap: 15
    }
});

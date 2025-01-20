import colors from "../style/theme";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import getCategories from "../entities/YCategory";
import getEvents from "../entities/Yevents";
import CardXL from "../entities/CardXL";
import CardS from "../entities/CardS";
import React from "react";
import {StatusBar} from "expo-status-bar";
import BottomNavBar from "./BottomNavBar";
import {LinearGradient} from "expo-linear-gradient";
import {styles} from "../style/shared-styles";


export default function HomeComponent() {
    return (<View style={styles.container}>
            <LinearGradient
                style={styles.gradient_container}
                colors={[colors.darkGradientFirstColor, colors.darkGradientSecondeColor, colors.primary]}
                start={{x: 2, y: 0}}
                end={{x: 0.1, y: 1.1}}
            >
                <View style={styles.titlesAndCategories}>
                    <View>
                        <Text style={[styles.textSmall, styles.textFont]}>Hi, new user</Text>
                        <Text style={[styles.textXL, styles.textFont]}>Réserve ton {"\n"}prochain évènement</Text>
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
                    <Text style={styles.subTitleWeight}>À la une</Text>
                    <ScrollView style={styles.xlCardScrollView}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.scrollXLContentContainer}
                    >
                        {getEvents().map((aYEvent, index) => {
                            return (
                                <CardXL key={index} type={aYEvent.type!!} label={aYEvent.label} date={aYEvent.date}
                                        image={aYEvent.image}></CardXL>
                            )
                        })}
                    </ScrollView>
                </View>
                <View style={styles.cardViewMainContainer}>
                    <Text style={styles.subTitleSlim}>Dans{"\n"}ce mois</Text>
                    <ScrollView style={styles.smallCardScrollView}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.scrollSmallContentContainer}
                    >
                        {getEvents().map((aYEvent, index) => {
                            let actualMonth = new Date().getMonth();
                            if (aYEvent.date.getMonth() === actualMonth) {
                                return (
                                    <CardS key={index} type={aYEvent.type!!} label={aYEvent.label}
                                           date={aYEvent.date}
                                           image={aYEvent.image}></CardS>
                                )
                            }
                        })}
                    </ScrollView>
                </View>

                <StatusBar style="auto"/>
                <BottomNavBar screenIndex={0}></BottomNavBar>
            </LinearGradient>
        </View>
    )
}
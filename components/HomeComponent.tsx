import colors from "../style/theme";
import {ScrollView, Text, View} from "react-native";
import getEvents from "../entities/Yevents";
import CardXL from "../entities/CardXL";
import CardS from "../entities/CardS";
import React from "react";
import {StatusBar} from "expo-status-bar";
import BottomNavBar from "./BottomNavBar";
import {LinearGradient} from "expo-linear-gradient";
import {styles} from "../style/shared-styles";
import Categories from "./Categories";


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
                    <Categories></Categories>
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
                                <CardXL key={index} type={aYEvent.type!!}
                                        label={aYEvent.label}
                                        id={aYEvent.id}
                                        places={aYEvent.places}
                                        placesTotale={aYEvent.placesTotale}
                                        lieu={aYEvent.lieu}
                                        description={aYEvent.description}
                                        date={aYEvent.date}
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
                                           date={aYEvent.date} lieu={aYEvent.lieu}
                                           image={aYEvent.image} places={aYEvent.places}
                                           placesTotale={aYEvent.placesTotale}
                                           id={aYEvent.id} description={aYEvent.description}>
                                    </CardS>
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
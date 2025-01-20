import {ScrollView, Text, View} from "react-native";
import {styles} from "../style/shared-styles";
import getCategories from "../entities/YCategory";
import React from "react";

export default function Categories() {
    return (<ScrollView
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
    </ScrollView>);
}
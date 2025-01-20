import {StyleSheet} from "react-native";
import colors from "./theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient_container: {
        height: '100%',
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: 50,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    titlesAndCategories: {
        gap: 20,
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
        color: colors.white,
        fontWeight: 700,
        fontSize: 18
    },
    subTitleSlim: {
        color: colors.white,
        fontWeight: 500,
        fontSize: 16
    },
    smallFlex: {
        display: 'flex',
        gap: 10,
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
    },
    smallCardScrollView: {
        paddingTop: 10,
        height: 170,
        gap: 5
    },
    scrollSmallContentContainer: {
        gap: 10
    }
});
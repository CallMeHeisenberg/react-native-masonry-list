import React from "react";
import {
    FlatList,
    StyleSheet,
    View,
} from "react-native";
import SafeAreaView, {SafeAreaProvider} from "react-native-safe-area-view";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    }
});

export default class ReactNativeMasonryListExample extends React.Component {
    renderItem = ({item}) => {
        return (<View style={{flexDirection: "row"}}>
            <View style={{flex: 3, margin: 1}}>
                <View style={{width: "100%", height: 50, backgroundColor: "red", marginVertical: 1}} />
                <View style={{width: "100%", height: 120, backgroundColor: "red", marginVertical: 1}} />
                <View style={{width: "100%", height: 200, backgroundColor: "red", marginVertical: 1}} />
            </View>
            <View style={{flex: 3, margin: 1}}>
                <View style={{width: "100%", height: 200, backgroundColor: "red", marginVertical: 1}} />
                <View style={{width: "100%", height: 120, backgroundColor: "red", marginVertical: 1}} />
                <View style={{width: "100%", height: 100, backgroundColor: "red", marginVertical: 1}} />
            </View>
            <View style={{flex: 3, margin: 1}}>
                <View style={{width: "100%", height: 90, backgroundColor: "red", marginVertical: 1}} />
                <View style={{width: "100%", height: 100, backgroundColor: "red", marginVertical: 1}} />
                <View style={{width: "100%", height: 160, backgroundColor: "red", marginVertical: 1}} />
            </View>
        </View>)
    };

    render() {
        const exampleData = [
            [
                new Array(5).fill("http://placeimg.com/640/360/any"),
                new Array(5).fill("http://placeimg.com/640/360/any"),
                new Array(5).fill("http://placeimg.com/640/360/any")
            ]
        ];

        return (
            <SafeAreaProvider>
                <SafeAreaView
                    style={styles.container}
                >
                    <FlatList data={exampleData}
                              // ListHeaderComponent={(<View style={{flex: 1, height: 120, backgroundColor: "red"}} />)}
                              // ListFooterComponent={(<View style={{flex: 1, height: 160, backgroundColor: "blue"}} />)}
                              renderItem={this.renderItem} />
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }
}

import Animated from "react-native-reanimated";
import {FlatList} from "react-native";
import * as React from "react";

const FlatListWithEventThrottle = React.forwardRef((props, ref) => (
    <FlatList scrollEventThrottle={0.0001} {...props} ref={ref} />
));

module.exports = (Animated.createAnimatedComponent(
    FlatListWithEventThrottle,
));
import {LineChart} from 'react-native-chart-kit';
import React from 'react';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width; 

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets:[{
        data: [20, 45, 28, 80, 99, 43, 50, 60, 70, 80, 90, 100],
    }]
};

const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff", 
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 1,
}

export default function GraphTeste(){
    return(
        <LineChart
        data={data}
        width={screenWidth - 30}
        height={300}
        chartConfig={chartConfig}
        // bezier
        />
    );
}
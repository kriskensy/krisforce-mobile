import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { Colors } from '../constants/Colors'

export default function RevenueChart({ data }) {
  if (!data || data.length === 0) return null;

  const colors = Colors.charts;

  const chartData = data
    .filter(item => Number(item.total) > 0)
    .map((item, index) => ({
      value: Number(item.total),
      color: colors[index % colors.length], //modulo: if there are more than 5 categories, they gonna repeat
      text: item.category,
    }))
    .sort((itemA, itemB) => itemB.value - itemA.value); //desc sort

  const renderLegend = () => {
    const totalValue = chartData.reduce((acc, item) => acc + item.value, 0);

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20, gap: 10 }}>
        {chartData.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            {/* color spot */}
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: item.color, marginRight: 6 }} />
            
            <Text style={{ color: Colors.text.muted, fontSize: 12 }}>
              {item.text} ({Math.round((item.value / totalValue) * 100)}%)
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: Colors.background,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 14, fontWeight: '600', color: Colors.text.muted, marginBottom: 20, alignSelf: 'flex-start' }}>
        Revenue by Category
      </Text>

      <PieChart
        data={chartData}
        donut
        showGradient
        sectionAutoFocus
        radius={70}
        innerRadius={50}
        innerCircleColor={Colors.background}
        centerLabelComponent={() => (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: Colors.text.white, fontWeight: 'bold' }}>
              {chartData.length}
            </Text>
            <Text style={{ fontSize: 10, color: Colors.text.white }}>Categories</Text>
          </View>
        )}
      />

      {renderLegend()}
    </View>
  );
}

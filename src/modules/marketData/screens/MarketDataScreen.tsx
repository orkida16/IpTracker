import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, ScrollView, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import useWebSocket from '../../../app/hooks/useWebSocket';
import {UIBox, UIText} from '../../../app/components/UI';

const MarketDataScreen = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [priceData, setPriceData] = useState<number[]>([]);

  const handleWebSocketMessage = (data: any) => {
    if (data.e === 'aggTrade') {
      const newPrice = parseFloat(data.p);
      const newQuantity = parseFloat(data.q);
      const newTimestamp = new Date(data.T).toLocaleTimeString();
      if (!isNaN(newPrice) && !isNaN(newQuantity) && newTimestamp) {
        setPrice(newPrice);
        setQuantity(newQuantity);
        setTimestamp(newTimestamp);

        setPriceData(prevData => {
          const updatedData = [...prevData, newPrice];
          return updatedData.length > 20 ? updatedData.slice(1) : updatedData;
        });
      } else {
        console.error('Invalid data received from WebSocket:', data);
      }
    }
  };

  useWebSocket(
    'wss://stream.binance.com:443/ws/btcusdt',
    handleWebSocketMessage,
  );

  useEffect(() => {
    return () => {};
  }, []);

  const hasValidData =
    priceData.length > 0 && priceData.every(value => !isNaN(value));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <UIBox style={styles.dataContainer}>
          <UIText
            textRole={'Title2'}
            marginBottom={'L'}
            color={'variant2'}
            textWeight={'bold'}>
            BTC/USDT Real-Time Data
          </UIText>
          {price !== null ? (
            <>
              <UIText textRole={'Title4'} color={'variant2'} marginBottom={'M'}>
                Price: {price}
              </UIText>
              <UIText textRole={'Title4'} color={'variant2'} marginBottom={'M'}>
                Quantity: {quantity}
              </UIText>
              <UIText textRole={'Title4'} color={'variant2'} marginBottom={'M'}>
                Timestamp: {timestamp}
              </UIText>
            </>
          ) : (
            <UIText textRole={'Body14'} color={'grey1'}>
              Loading...
            </UIText>
          )}
          {hasValidData ? (
            <LineChart
              data={{
                labels: [],
                datasets: [
                  {
                    data: priceData,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 16}
              height={220}
              yAxisLabel="$"
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: '#001ee2',
                backgroundGradientFrom: '#708dd8',
                backgroundGradientTo: '#4171ec',
                decimalPlaces: 2,
                color: () => '#e5eafb',
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#2659ff',
                },
              }}
              bezier
              style={styles.chart}
            />
          ) : (
            <UIText textRole={'Body14'} color={'grey1'}>
              No valid data available
            </UIText>
          )}
        </UIBox>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  dataContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default MarketDataScreen;

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import {UIMainHeader} from '../../../app/components/UI/UIMainHeader';
import {UIBox, UIText, UITextInput} from '../../../app/components/UI';
import {IconSearch} from '../../../app/components/icons';
import {COLORS} from '../../../theme/colors.ts';
import {actionsDashboardScreen} from '../store/actions';
import {useAppDispatch, useAppSelector} from '../../../store';
import Carousel from 'react-native-reanimated-carousel';
import {defaultImagesArray} from '../consts.ts';
import {
  selectError,
  selectErrorIp,
  selectInfos,
  selectLoading,
  selectLoadingIp,
  selectMyIp,
} from '../store/selectors/dashboardSelectors.tsx';
import {SPACINGS} from '../../../theme/spacings';
import {BORDER_RADIUS} from '../../../theme/border_radius';
const width = Dimensions.get('window').width;

const DashboardScreen = () => {
  const [searchedIp, setSearchedIp] = useState('');
  const dispatch = useAppDispatch();
  const loadingIp = useAppSelector(selectLoadingIp);
  const errorIp = useAppSelector(selectErrorIp);
  const myIp = useAppSelector(selectMyIp);
  const loadingIpInfo = useAppSelector(selectLoading);
  const errorIpInfo = useAppSelector(selectError);
  const ipInfo = useAppSelector(selectInfos);

  useEffect(() => {
    dispatch(actionsDashboardScreen.landing());
    return () => {
      dispatch(actionsDashboardScreen.dismiss());
    };
  }, [dispatch]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'We need access to your location to determine ISP details',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Error', 'Location permission denied');
        }
      } else {
        const permission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (permission !== 'granted') {
          Alert.alert('Error', 'Location permission denied');
        }
      }
    };
    requestLocationPermission();
  }, [dispatch]);

  const fetchISPDetails = async (searchString: string) => {
    if (searchString.length > 0) {
      try {
        dispatch(
          actionsDashboardScreen.onGetIpAddressSuccess({
            ipAddress: searchString,
          }),
        );
      } catch (err) {
        Alert.alert('Error', 'Failed to fetch ISP details.');
        console.error(err);
      }
    } else {
      Alert.alert('Warning', 'Write an IP before searching!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <UIMainHeader title={'IP Tracker'} color={COLORS.BASE_BLUE} />
      <UIBox backgroundColor={'variant2'} paddingVertical={'L'}>
        <UIBox paddingHorizontal={'L'}>
          <UIText
            textRole={'Title3'}
            color={'variant3'}
            marginBottom={'L'}
            style={styles.title}>
            Enter IP Address
          </UIText>
          <UITextInput
            placeholder="e.g., 8.8.8.8"
            value={searchedIp}
            onChangeText={setSearchedIp}
            keyboardType="numeric"
          />
          <TouchableOpacity
            onPress={() => fetchISPDetails(searchedIp)}
            style={styles.searchButtonStyle}>
            <UIText
              textRole={'Body14'}
              color={'variant2'}
              paddingHorizontal={'M'}>
              SEARCH
            </UIText>
            <IconSearch />
          </TouchableOpacity>
          {loadingIp && !errorIp ? (
            <ActivityIndicator size="large" color={'white'} />
          ) : (
            <UIBox marginVertical={'M'}>
              <UIText
                textRole={'Title4'}
                color={'variant3'}
                marginBottom={'XXXS'}>
                IP Address: {myIp}
              </UIText>
              {errorIpInfo ? (
                <UIText textRole={'Title4'} color={'red'}>
                  {errorIpInfo}
                </UIText>
              ) : loadingIpInfo ? (
                <ActivityIndicator color={'black'} />
              ) : (
                <>
                  <UIText
                    textRole={'Title4'}
                    color={'variant3'}
                    marginBottom={'XXXS'}>
                    ISP: {ipInfo?.org}
                  </UIText>
                  <UIText
                    textRole={'Title4'}
                    color={'variant3'}
                    marginBottom={'XXXS'}>
                    Location: {ipInfo?.city + ',' + ipInfo?.country_name}
                  </UIText>
                  <UIText
                    textRole={'Title4'}
                    color={'variant3'}
                    marginBottom={'XXXS'}>
                    timezone: UTC {ipInfo?.utc_offset}
                  </UIText>
                </>
              )}
            </UIBox>
          )}
        </UIBox>
        <Carousel
          width={width}
          height={200}
          data={defaultImagesArray}
          scrollAnimationDuration={1000}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() =>
                dispatch(
                  actionsDashboardScreen.onAddButtonPress({imageUrl: item}),
                )
              }>
              <Image source={{uri: item}} style={styles.itemContainer} />
            </TouchableOpacity>
          )}
          mode="parallax"
          modeConfig={{
            stackInterval: 18,
            showLength: 3,
            moveSize: 0.4,
          }}
          loop
        />
      </UIBox>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASE_WHITE,
  },
  title: {
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: COLORS.BASE_WHITE,
    borderRadius: BORDER_RADIUS.XS,
    width: width,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.BASE_BLACK,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  searchButtonStyle: {
    borderColor: COLORS.BASE_BLUE2,
    borderWidth: 2,
    borderRadius: BORDER_RADIUS.XS,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: SPACINGS.XS,
    alignSelf: 'flex-end',
  },
});

export default DashboardScreen;

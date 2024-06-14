import React from 'react';
import {UIBox} from '../../../app/components/UI/UIBox';
import {ActivityIndicator, Image, StyleSheet} from 'react-native';
import {UIText} from '../../../app/components/UI';
import {useAppSelector} from '../../../store';
import {
  selectError,
  selectInfos,
  selectSelectedImage,
} from '../../dashboard/store/selectors/dashboardSelectors.tsx';

const ProfileScreen = () => {
  const ipInfo = useAppSelector(selectInfos);
  const error = useAppSelector(selectError);
  const mySelectedImage = useAppSelector(selectSelectedImage);

  const imagePLaceholder =
    'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg';
  return (
    <UIBox backgroundColor={'variant2'} style={{flex: 1}} padding={'L'}>
      <Image
        source={{
          uri: mySelectedImage ?? imagePLaceholder,
        }}
        style={styles.itemContainer}
      />
      {error ? (
        <UIText textRole={'Body14'} color={'red'} style={styles.label}>
          Error IP message: {error}
        </UIText>
      ) : ipInfo ? (
        <UIBox>
          <UIText textRole={'Body14'} color={'variant3'} style={styles.label}>
            IP Address: {ipInfo.ip}
          </UIText>
          <UIText textRole={'Body14'} color={'variant3'} style={styles.label}>
            ISP: {ipInfo.org}
          </UIText>
          <UIText textRole={'Body14'} color={'variant3'} style={styles.label}>
            Location: {ipInfo.city + ',' + ipInfo?.country_name}
          </UIText>
          <UIText textRole={'Body14'} color={'variant3'} style={styles.label}>
            timezone: UTC {ipInfo?.utc_offset}
          </UIText>
        </UIBox>
      ) : (
        <ActivityIndicator />
      )}
    </UIBox>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemContainer: {
    borderRadius: 8,
    width: '100%',
    height: 200,
  },
  label: {
    fontSize: 18,
    margin: 10,
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
  title: {
    textAlign: 'center',
  },
});
export default ProfileScreen;

import metrics from '@app/theme/metrics';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import MyText from '../text';
import colors from '@app/theme/colors';
import MyIcon from '../icon/MyIcon';
import {TouchableWithoutFeedback} from 'react-native';
import {useAuth} from '@app/context/AuthContext';

const Header = ({title}: {title: string}) => {
  const {signOut} = useAuth();
  const onPressLogout = () => {
    signOut();
  };
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <MyText fontSize={32} variant="bold" style={styles.headerText}>
          {title}
        </MyText>
        <TouchableWithoutFeedback onPress={onPressLogout}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              marginTop: 10,
            }}>
            <MyIcon
              name="logout"
              size={16}
              color="#fff"
              family="MaterialIcons"
            />
            <MyText fontSize={16} style={styles.headerText}>
              Thoát ra
            </MyText>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.wavyBottom} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary.main,
    height: metrics.screenHeight * 0.2, // 20% of screen height
    position: 'relative',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
  },
  wavyBottom: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default Header;

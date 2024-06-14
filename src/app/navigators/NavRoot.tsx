import {useStackNavigator} from './hooks';
import {enableScreens} from 'react-native-screens';
import NavTabMain from './NavTabMain.tsx';

enableScreens();
const NavRoot = () => {
  const Stack = useStackNavigator();
  // Here we would add another stack example the auth stack or on boarding
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="NavTabMain">
      <Stack.Screen name="NavTabMain" component={NavTabMain} />
    </Stack.Navigator>
  );
};
export default NavRoot;

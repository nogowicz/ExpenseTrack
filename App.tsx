import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import RecentExpensesScreen from './screens/RecentExpensesScreen';
import { Colors } from './constants/Colors';
import { Ionicons } from '@expo/vector-icons'
import AllExpensesScreen from './screens/AllExpenses';
import AddNewExpenseScreen from './screens/AddNewExpenseScreen';
import { useEffect, useState } from 'react';
import { deleteTable, init } from './util/database';
import LoadingOverlay from './screens/LoadingOverlay';




const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const theme = {
  colors:
  {
    primary: Colors.primaryColor,
    text: Colors.textColor,
    inactive: Colors.inactiveColor
  }
}



function MyTabs() {
  return (
    <PaperProvider theme={theme}>
      <Tab.Navigator
        initialRouteName='Recent'
        activeColor={Colors.primaryColor}
        inactiveColor={Colors.inactiveColor}
        shifting={true}

        barStyle={{
          backgroundColor: Colors.tabBarColor,
        }}
        screenOptions={{
          tabBarColor: Colors.tabBarColor

        }}
      >
        <Tab.Screen
          name="Recent Expenses"
          component={RecentExpensesScreen}
          options={{
            tabBarIcon: ({ color }) => (<Ionicons name="ios-time-outline" size={24} color={color} />),
            // @ts-ignore
            tabBarLabel: <Text style={{ color: Colors.text }}>Recent Expenses</Text>
          }}
        />



        <Tab.Screen
          name="All Expenses"
          component={AllExpensesScreen}
          options={{
            tabBarIcon: ({ color }) => (<Ionicons name="md-wallet-outline" size={24} color={color} />),
            // @ts-ignore
            tabBarLabel: <Text style={{ color: Colors.text }}>All Expenses</Text>
          }}
        />

      </Tab.Navigator>
    </PaperProvider>
  );
}
export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);


  useEffect(() => {
    // deleteTable();
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  if (!dbInitialized) {
    return <LoadingOverlay message='Loading...' />
  }

  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MyTabs"
            component={MyTabs}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="AddNewExpenseScreen"
            component={AddNewExpenseScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
